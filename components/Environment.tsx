'use client';
import { motion } from 'motion/react';
import { Wifi, Battery, Thermometer, Armchair } from 'lucide-react';

const features = [
  { icon: Wifi, title: 'Wi-Fi de Alta Velocidade', desc: 'Conexão estável para suas reuniões e calls.' },
  { icon: Battery, title: 'Tomadas Próximas', desc: 'Energia disponível em quase todas as mesas.' },
  { icon: Thermometer, title: 'Ambiente Climatizado', desc: 'Temperatura ideal para foco e relaxamento.' },
  { icon: Armchair, title: 'Poltronas Confortáveis', desc: 'Ergonomia para longas sessões de trabalho.' },
];

export default function Environment() {
  return (
    <section id="ambiente" className="bg-boheme-brown text-white overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        {/* Left: Content */}
        <div className="w-full lg:w-1/2 py-24 px-8 md:px-16 lg:px-24 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-boheme-bronze font-medium uppercase tracking-[0.2em] text-sm mb-6 block">
              Work & Relax
            </span>
            <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
              O seu escritório fora de casa, com o melhor café da cidade.
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-12 max-w-xl">
              Entendemos a necessidade de um espaço que equilibre produtividade e bem-estar. 
              No Bohème, cada detalhe foi pensado para quem busca um local inspirador para trabalhar ou se reunir.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {features.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="flex flex-col gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-boheme-bronze group-hover:bg-boheme-bronze group-hover:text-white transition-colors duration-300">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm uppercase tracking-widest mb-1">{item.title}</h4>
                    <p className="text-white/50 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: Image */}
        <div className="w-full lg:w-1/2 h-[500px] lg:h-auto relative overflow-hidden">
          <motion.img
            initial={{ scale: 1.2 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src="/intern-photo.png"
            alt="Work Environment"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-boheme-brown/20" />
        </div>
      </div>
    </section>
  );
}
