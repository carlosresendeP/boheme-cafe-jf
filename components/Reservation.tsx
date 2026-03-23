'use client';
import { motion } from 'motion/react';
import { Send, Coffee, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Reservation() {
  const [formState, setFormState] = useState({
    name: '',
    date: '',
    time: '',
    guests: '2',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to a backend
    alert('Sua solicitação de reserva foi enviada! Entraremos em contato em breve.');
  };

  return (
    <section id="reservas" className="py-24 px-6 bg-boheme-green text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-boheme-bronze font-medium uppercase tracking-[0.2em] text-sm mb-6 block">
                Reservas e Contato
              </span>
              <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">
                Reserve seu momento Bohème
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-12">
                Garanta sua mesa para reuniões, eventos ou um café especial. 
                Nossa equipe está pronta para recebê-lo com a excelência que você merece.
              </p>

              <div className="flex gap-6">
                <a href="#" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-boheme-bronze transition-colors">
                  <Send className="w-5 h-5" />
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-boheme-bronze transition-colors">
                  <Coffee className="w-5 h-5" />
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-boheme-bronze transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </div>

          <div className="w-full lg:w-1/2">
            <motion.form
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              onSubmit={handleSubmit}
              className="bg-white p-10 md:p-16 rounded-[3rem] text-boheme-brown shadow-2xl"
            >
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-60">Nome Completo</label>
                  <input
                    type="text"
                    required
                    className="w-full border-b-2 border-boheme-brown/10 py-3 focus:outline-none focus:border-boheme-bronze transition-colors"
                    placeholder="Como podemos te chamar?"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-60">Data</label>
                    <input
                      type="date"
                      required
                      className="w-full border-b-2 border-boheme-brown/10 py-3 focus:outline-none focus:border-boheme-bronze transition-colors"
                      value={formState.date}
                      onChange={(e) => setFormState({ ...formState, date: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-60">Horário</label>
                    <input
                      type="time"
                      required
                      className="w-full border-b-2 border-boheme-brown/10 py-3 focus:outline-none focus:border-boheme-bronze transition-colors"
                      value={formState.time}
                      onChange={(e) => setFormState({ ...formState, time: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-60">Pessoas</label>
                  <select
                    className="w-full border-b-2 border-boheme-brown/10 py-3 focus:outline-none focus:border-boheme-bronze transition-colors bg-transparent"
                    value={formState.guests}
                    onChange={(e) => setFormState({ ...formState, guests: e.target.value })}
                  >
                    <option value="1">1 Pessoa</option>
                    <option value="2">2 Pessoas</option>
                    <option value="3">3 Pessoas</option>
                    <option value="4">4 Pessoas</option>
                    <option value="5+">5 ou mais</option>
                  </select>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-boheme-brown text-white py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-boheme-bronze transition-all duration-300 flex items-center justify-center gap-3 mt-8 shadow-lg"
                >
                  <Send className="w-5 h-5" />
                  Solicitar Reserva
                </Button>
              </div>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}
