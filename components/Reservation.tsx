'use client';

import { motion } from 'motion/react';
import { Send, Coffee, MessageCircle } from 'lucide-react';
import { FormResevation } from './FormReservation';


export default function Reservation() {

  return (
    <section id="reservas" className="py-24 px-6 bg-boheme-green text-white">

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">
        
        {/* Lado Esquerdo - Textos */}
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
              Garanta sua mesa para reuniões, eventos ou um café especial. Nossa equipe está pronta para recebê-lo com a excelência que você merece.
            </p>
            <div className="flex gap-6">
              <a href="#" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-boheme-bronze transition-colors"><Send className="w-5 h-5" /></a>
              <a href="#" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-boheme-bronze transition-colors"><Coffee className="w-5 h-5" /></a>
              <a href="#" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-boheme-bronze transition-colors"><MessageCircle className="w-5 h-5" /></a>
            </div>
          </motion.div>
        </div>

        {/* Lado Direito - Formulário com Field Components */}
        <FormResevation />
      </div>
    </section>
  );
}