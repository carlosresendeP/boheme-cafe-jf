'use client';
import { motion } from 'motion/react';

export default function Essence() {
  return (
    <section id="essencia" className="py-24 px-6 bg-boheme-cream overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          <div className="aspect-4/5 rounded-2xl overflow-hidden shadow-2xl">
            <motion.img
              whileHover={{ scale: 1.05 }}  
              transition={{ duration: 0.6 }}
              src="/intern-photo.png"
              alt="Bohème Interior"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute -bottom-8 -right-8 w-64 h-64 rounded-2xl overflow-hidden shadow-2xl hidden md:block border-8 border-boheme-cream"
          >
            <motion.img
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
              src="/photo-intern-coffe.png"
              alt="Coffee Details"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-8"
        >
          <span className="text-boheme-bronze font-medium uppercase tracking-[0.2em] text-sm">
            Nossa Essência
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight">
            Um refúgio para os sentidos no coração de São Mateus
          </h2>
          <p className="text-lg text-boheme-brown/80 leading-relaxed max-w-xl">
            O Bohème Café nasceu do desejo de criar um espaço onde o tempo desacelera. 
            Combinamos a sofisticação do café especial com um ambiente acolhedor, 
            perfeito para encontros memoráveis, momentos de foco ou simplesmente 
            para apreciar uma excelente pastelaria artesanal.
          </p>
          <div className="flex items-center gap-6 pt-4">
            <div className="text-center">
              <span className="block text-3xl font-serif text-boheme-bronze">4.9</span>
              <span className="text-xs uppercase tracking-widest opacity-60">Estrelas</span>
            </div>
            <div className="w-px h-12 bg-boheme-brown/10" />
            <div className="text-center">
              <span className="block text-3xl font-serif text-boheme-bronze">190+</span>
              <span className="text-xs uppercase tracking-widest opacity-60">Avaliações</span>
            </div>
            <div className="w-px h-12 bg-boheme-brown/10" />
            <div className="text-center">
              <span className="block text-3xl font-serif text-boheme-bronze">Premium</span>
              <span className="text-xs uppercase tracking-widest opacity-60">Qualidade</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
