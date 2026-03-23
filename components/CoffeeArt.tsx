'use client';
import { motion } from 'motion/react';
import Image from 'next/image';

export default function CoffeeArt() {
  return (
    <section className="py-24 px-6 bg-boheme-cream overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2"
        >
          <span className="text-boheme-bronze font-medium uppercase tracking-[0.2em] text-sm mb-6 block">
            A Arte do Nosso Café
          </span>
          <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
            Da origem à xícara: uma jornada de precisão e paixão.
          </h2>
          <div className="space-y-8">
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-2 text-boheme-bronze">Grãos Selecionados</h4>
              <p className="text-boheme-brown/70 leading-relaxed">
                Trabalhamos exclusivamente com grãos de origem única, torrados artesanalmente para preservar as notas sensoriais mais complexas.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-2 text-boheme-bronze">Extração Perfeita</h4>
              <p className="text-boheme-brown/70 leading-relaxed">
                Seja no espresso, V60 ou Chemex, cada método é executado com rigor técnico para garantir a melhor experiência em cada gole.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-2 text-boheme-bronze">Inovação e Sabor</h4>
              <p className="text-boheme-brown/70 leading-relaxed">
                Nosso Matcha e o Café Caramel Cortado são favoritos absolutos, unindo tradição e criatividade contemporânea.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="w-full lg:w-1/2 relative"
        >
          <div className="aspect-square rounded-full overflow-hidden border-16 border-white shadow-2xl relative">
            <Image
              src="https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&q=80&w=1200"
              alt="Coffee Preparation"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-4 -left-4 w-32 h-32 bg-boheme-bronze/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-boheme-green/10 rounded-full blur-3xl" />
        </motion.div>
      </div>
    </section>
  );
}
