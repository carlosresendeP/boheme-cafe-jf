'use client';
import { motion } from 'motion/react';
import { Users, Calendar, Briefcase } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function Events() {
  return (
    <section className="py-24 px-6 bg-boheme-cream">
      <div className="max-w-7xl mx-auto">
        <Card className="bg-boheme-green rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row border-none">
          <article className="w-full lg:w-1/2 p-12 md:p-20 text-white flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-boheme-bronze font-medium uppercase tracking-[0.2em] text-sm mb-6 block">
                B2B & Eventos
              </span>
              <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
                Reuniões e Eventos Privados
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-10">
                Oferecemos um ambiente exclusivo para suas reuniões de negócios, workshops ou celebrações íntimas. 
                Infraestrutura completa e catering premium para garantir o sucesso do seu evento.
              </p>

              <ul className="space-y-6 mb-12">
                <li className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-boheme-bronze">
                    <Users className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium uppercase tracking-widest">Capacidade para até 20 pessoas</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-boheme-bronze">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium uppercase tracking-widest">Reservas flexíveis por hora ou período</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-boheme-bronze">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium uppercase tracking-widest">Equipamentos audiovisuais sob demanda</span>
                </li>
              </ul>

              <Button asChild className="inline-flex px-10 py-6 bg-boheme-bronze text-white rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-boheme-brown transition-all duration-300">
                <a href="#reservas">Solicitar Orçamento</a>
              </Button>
            </motion.div>
          </article>

          <figure className="w-full lg:w-1/2 relative h-[400px] lg:h-auto">
            <Image
              src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=1200"
              alt="Events at Bohème"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-boheme-green/20" />
          </figure>
        </Card>
      </div>
    </section>
  );
}
