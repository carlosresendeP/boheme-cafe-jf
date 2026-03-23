'use client';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import BackgroundVideo from './BackgroundVideo';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="relative h-[300vh] w-full bg-black">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

        {/* Fundo animado com scroll */}
        <BackgroundVideo />

        {/* Conteúdo principal */}
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="inline-block text-white/80 uppercase tracking-[0.3em] text-sm mb-6 font-medium"
          >
            Luxo Acessível em Juiz de Fora
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl text-white font-serif leading-tight mb-8"
          >
            Onde o conforto encontra a <span className="italic">arte do sabor</span>
          </motion.h1>

          <motion.nav
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            aria-label="Ações principais"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button asChild className="px-10 py-6 bg-boheme-bronze text-white rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-boheme-brown transition-all duration-300 shadow-lg">
                <a href="#reservas">Fazer Reserva</a>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button asChild variant="outline" className="px-10 py-6 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-boheme-brown transition-all duration-300">
                <a href="#cardapio">Ver Cardápio</a>
              </Button>
            </motion.div>
          </motion.nav>
        </div>

        {/* Indicador de scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60 animate-bounce"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </div>
    </section>
  );
}