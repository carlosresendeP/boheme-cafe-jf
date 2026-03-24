'use client'; 
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import menuData from '../data/menu.json';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
const cardapioPdf = '/Cardapio_Boheme-2025.6.pdf';

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState(menuData.categories[0].id);

  const currentCategory = menuData.categories.find(cat => cat.id === activeCategory);

  return (
    <section id="cardapio" className="py-24 px-6 bg-boheme-cream">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-boheme-bronze font-medium uppercase tracking-[0.2em] text-sm mb-4 block">
            Experiência Nativa
          </span>
          <h2 className="text-4xl md:text-5xl font-serif mb-8">O Cardápio Completo</h2>
          
          {/* Tabs Navigation */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 border-b border-boheme-brown/10 pb-4">
            {menuData.categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                variant="ghost"
                className={`relative py-2 px-4 text-sm font-semibold uppercase tracking-widest transition-colors duration-300 ${
                  activeCategory === category.id ? 'text-boheme-bronze' : 'text-boheme-brown/40 hover:text-boheme-brown'
                }`}
              >
                {category.name}
                {activeCategory === category.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-boheme-bronze"
                  />
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* Menu Items List */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10"
            >
              {currentCategory?.items.map((item, index) => (
                <motion.div 
                  key={item.name} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group"
                >
                  <Card className="h-full border-boheme-brown/10 bg-white/60 backdrop-blur-sm">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-baseline gap-3">
                        <CardTitle className="group-hover:text-boheme-bronze transition-colors duration-300">
                          {item.name}
                        </CardTitle>
                        <span className="font-bold text-boheme-bronze whitespace-nowrap">{item.price}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-boheme-brown/60 leading-relaxed italic">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-20  text-center w-full">
          <p className="text-boheme-brown/40 text-sm italic mb-8">
              * Consulte nossa equipe sobre opções veganas e restrições alimentares.
          </p>
          <div className='flex flex-col lg:flex-row gap-4 justify-center items-center'>

            <Button asChild variant="outline" className="px-12 py-6 w-full max-w-md border-2 border-boheme-brown text-boheme-brown rounded-full font-bold 
            uppercase tracking-widest hover:bg-boheme-brown hover:text-white transition-all duration-300">
              <a href="#reservas">Reservar uma Mesa</a>
            </Button>
            <Button asChild variant="outline" className="px-12 py-6 w-full max-w-md border-2 border-boheme-brown text-boheme-brown rounded-full font-bold uppercase tracking-widest hover:bg-boheme-brown hover:text-white transition-all duration-300">
              <a href={cardapioPdf} download="Cardapio_Boheme_2025.pdf" target="_blank" rel="noopener noreferrer">
                Download do Cardápio
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
