'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Coffee, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import Markdown from 'react-markdown';

const SYSTEM_INSTRUCTION = `
Você é o Concierge Digital do Bohème Café, localizado em São Mateus, Juiz de Fora.
Sua personalidade é elegante, acolhedora e prestativa (Boho Chic Moderno).
Seu objetivo é ajudar os clientes com informações sobre o cardápio, ambiente, reservas e localização.

Informações Importantes:
- Endereço: R. Francisco Brandi, 177 - São Mateus, Juiz de Fora.
- Horário: Seg-Sáb 08h-20h, Dom 09h-18h.
- Especialidades: Tarte Au Citron, Cappuccino Vanille, Croque-monsieur, Café Caramel Cortado e Matcha Latte.
- Diferenciais: Wi-Fi rápido, tomadas, ambiente climatizado, poltronas confortáveis (ideal para trabalho).
- Reservas: Podem ser feitas pelo site ou WhatsApp.
- Preços: Ticket médio entre R$ 40-60.

Responda de forma concisa e use um tom de "luxo acessível". Use emojis de café e sofisticação moderadamente.
Se não souber algo, sugira falar com um humano pelo WhatsApp.
`;

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPrompt(true);
    }, 15000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const model = ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: [
          ...messages.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        }
      });

      const response = await model;
      const text = response.text || 'Desculpe, tive um pequeno problema técnico. Poderia repetir?';
      
      setMessages(prev => [...prev, { role: 'model', text }]);
    } catch (error) {
      console.error('Chatbot error:', error);
      setMessages(prev => [...prev, { role: 'model', text: 'Estou com dificuldades de conexão no momento. Que tal nos chamar no WhatsApp?' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
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
            <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-4 no-scrollbar">
              {messages.length === 0 && (
                <div className="text-center py-10 space-y-4">
                  <Coffee className="w-12 h-12 text-boheme-bronze/20 mx-auto" />
                  <p className="text-sm text-boheme-brown/40 italic">
                    Como posso tornar seu dia mais especial hoje?
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {['Ver Cardápio', 'Reservar Mesa', 'Localização'].map(btn => (
                      <button
                        key={btn}
                        onClick={() => {
                          setInput(btn);
                          // We trigger the send logic manually or just set input
                        }}
                        className="text-[10px] uppercase tracking-widest px-3 py-2 border border-boheme-brown/10 rounded-full hover:bg-boheme-cream transition-colors"
                      >
                        {btn}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                    m.role === 'user' 
                      ? 'bg-boheme-bronze text-white rounded-tr-none' 
                      : 'bg-boheme-cream text-boheme-brown rounded-tl-none'
                  }`}>
                    <Markdown>{m.text}</Markdown>
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

            {/* Input */}
            <div className="p-4 border-t border-boheme-brown/5">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Digite sua mensagem..."
                  className="w-full bg-boheme-cream/50 py-4 pl-6 pr-14 rounded-2xl text-sm focus:outline-none focus:ring-1 focus:ring-boheme-bronze transition-all"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-boheme-brown text-white rounded-xl flex items-center justify-center hover:bg-boheme-bronze transition-colors disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
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
