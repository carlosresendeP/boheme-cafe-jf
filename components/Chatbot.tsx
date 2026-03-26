'use client';

import { useState, useEffect, useRef, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Coffee, Loader2 } from 'lucide-react';
import Markdown from 'react-markdown';

// Tipagem clara para as nossas mensagens
interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showPrompt, setShowPrompt] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  
  // Estado manual das mensagens e do loading
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowPrompt(true), 15000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Função centralizada para enviar mensagem para nossa API
  const sendMessageToAPI = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { id: crypto.randomUUID(), role: 'user', content: text };
    
    // Atualiza a tela imediatamente com a mensagem do usuário
    setMessages((prev) => [...prev, userMessage]);
    setValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Envia o histórico atual + a nova mensagem
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro na comunicação.');
      }

      // Adiciona a resposta do bot na tela
      const botMessage: Message = { id: crypto.randomUUID(), role: 'model', content: data.reply };
      setMessages((prev) => [...prev, botMessage]);

    } catch (error) {
      const errorMsg: Message = { 
        id: crypto.randomUUID(), 
        role: 'model', 
        content: 'Estou com instabilidade no sistema. Poderia tentar novamente em instantes?' 
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickReply = (text: string): void => {
    sendMessageToAPI(text);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    sendMessageToAPI(value);
  };

  return (
    <div className="fixed bottom-6 right-6 z-100 flex flex-col items-end">
      {/* Proactive Prompt */}
      <AnimatePresence>
        {showPrompt && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-white p-4 rounded-2xl shadow-2xl mb-4 max-w-[200px] border border-boheme-bronze/20 relative"
          >
            <button 
              onClick={() => setShowPrompt(false)}
              className="absolute -top-2 -right-2 bg-boheme-brown text-white rounded-full p-1 shadow-md"
            >
              <X className="w-3 h-3" />
            </button>
            <p className="text-xs font-medium text-boheme-brown">
              Olá! Posso te ajudar com o cardápio ou uma reserva hoje? ☕
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="bg-white w-[350px] md:w-[400px] h-[500px] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-boheme-bronze/10 mb-4"
          >
            {/* Header */}
            <div className="bg-boheme-brown p-6 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-boheme-bronze flex items-center justify-center">
                  <Coffee className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg">Concierge Bohème</h3>
                  <span className="text-[10px] uppercase tracking-widest opacity-60">Sempre Online</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:text-boheme-bronze transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="grow overflow-y-auto p-6 space-y-4 no-scrollbar">
              {messages.length === 0 && (
                <div className="text-center py-10 space-y-4">
                  <Coffee className="w-12 h-12 text-boheme-bronze/20 mx-auto" />
                  <p className="text-sm text-boheme-brown/40 italic">
                    Como posso tornar seu dia mais especial hoje?
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {['Ver Cardápio', 'Reservar Mesa', 'Localização'].map((btn: string) => (
                      <button
                        key={btn}
                        onClick={() => handleQuickReply(btn)}
                        className="text-[10px] uppercase tracking-widest px-3 py-2 border border-boheme-brown/10 rounded-full hover:bg-boheme-cream transition-colors"
                      >
                        {btn}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((m: Message) => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                    m.role === 'user' 
                      ? 'bg-boheme-bronze text-white rounded-tr-none' 
                      : 'bg-boheme-cream text-boheme-brown rounded-tl-none'
                  }`}>
                    <Markdown>{m.content}</Markdown>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-boheme-cream p-4 rounded-2xl rounded-tl-none">
                    <Loader2 className="w-4 h-4 animate-spin text-boheme-bronze" />
                  </div>
                </div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-boheme-brown/5">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Digite sua mensagem..."
                  className="w-full bg-boheme-cream/50 py-4 pl-6 pr-14 rounded-2xl text-sm focus:outline-none focus:ring-1 focus:ring-boheme-bronze transition-all"
                  value={value}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !value.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-boheme-brown text-white rounded-xl flex items-center justify-center hover:bg-boheme-bronze transition-colors disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setIsOpen(!isOpen);
          setShowPrompt(false);
        }}
        className="w-16 h-16 bg-boheme-bronze text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-boheme-brown transition-all duration-300"
      >
        {isOpen ? <X className="w-8 h-8" /> : <MessageSquare className="w-8 h-8" />}
      </motion.button>
    </div>
  );
}