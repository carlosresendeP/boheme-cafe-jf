'use client';
import { motion } from 'motion/react';

const image = '/boheme-logos.png';


const highlights = [
  {
    name: 'Tarte Au Citron',
    price: 'R$ 24',
    image: '/photo-tarte-Citron.png',
    category: 'Pastelaria'
  },
  {
    name: 'Cappuccino Vanille',
    price: 'R$ 18',
    image: '/photo-capputino-vanille.png',
    category: 'Cafés'
  },
  {
    name: 'Croque-monsieur',
    price: 'R$ 38',
    image: '/photo-croque-monsieur.png',
    category: 'Salgados'
  }
];

export default function ChefHighlights() {
  return (
    <>
    <section id="destaques" className="py-24 px-6 relative bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-boheme-bronze font-medium uppercase tracking-[0.2em] text-sm mb-4 block">
              Desejo Gastronômico
            </span>
            <h2 className="text-4xl md:text-5xl font-serif">Destaques do Chef</h2>
          </div>
          <p className="text-boheme-brown/60 max-w-xs">
            Uma seleção curada dos nossos itens mais amados, preparados com ingredientes premium.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-2xl cursor-pointer"
            >
              <div className="aspect-linear-[3/4] overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.8 }}
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute inset-0 bg-linear-to-t from-boheme-brown/90 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
              
              <div className="absolute bottom-0 left-0 w-full p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <motion.span 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="text-white/60 text-xs uppercase tracking-widest mb-2 block"
                >
                  {item.category}
                </motion.span>
                <h3 className="text-2xl text-white font-serif mb-2">{item.name}</h3>
                <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                  <span className="text-boheme-bronze font-bold text-xl">{item.price}</span>
                  <motion.span 
                    whileHover={{ x: 5 }}
                    className="text-white text-xs uppercase tracking-widest border-b border-white/30 pb-1"
                  >
                    Ver Detalhes
                  </motion.span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>


    </section>
    <div 
      className="w-full h-30 bg-boheme-bronze bg-fixed bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${image})` }}
    />
    </>
  );
}
