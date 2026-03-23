'use client';
import { motion } from 'motion/react';
import { MapPin, Clock, Navigation, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Location() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkOpenStatus = () => {
      const now = new Date();
      const hour = now.getHours();
      
      // Assume open 8am to 8pm daily for demo purposes
      setIsOpen(hour >= 8 && hour < 20);
    };

    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="localizacao" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/3 flex flex-col justify-center"
        >
          <span className="text-boheme-bronze font-medium uppercase tracking-[0.2em] text-sm mb-6 block">
            Onde Estamos
          </span>
          <h2 className="text-4xl md:text-5xl font-serif mb-8">Venha nos visitar</h2>
          
          <div className="space-y-8 mb-12">
            <div className="flex gap-4">
              <MapPin className="w-6 h-6 text-boheme-bronze shrink-0" />
              <div>
                <h4 className="font-bold text-sm uppercase tracking-widest mb-1">Endereço</h4>
                <p className="text-boheme-brown/70">R. Francisco Brandi, 177 - São Mateus, Juiz de Fora - MG</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Clock className="w-6 h-6 text-boheme-bronze shrink-0" />
              <div>
                <h4 className="font-bold text-sm uppercase tracking-widest mb-1">Horários</h4>
                <p className="text-boheme-brown/70">Segunda a Sábado: 08:00 - 20:00</p>
                <p className="text-boheme-brown/70">Domingo: 09:00 - 18:00</p>
                <div className="mt-2 flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                  <span className={`text-xs font-bold uppercase tracking-widest ${isOpen ? 'text-green-600' : 'text-red-600'}`}>
                    {isOpen ? 'Aberto Agora' : 'Fechado'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Phone className="w-6 h-6 text-boheme-bronze shrink-0" />
              <div>
                <h4 className="font-bold text-sm uppercase tracking-widest mb-1">Contato</h4>
                <p className="text-boheme-brown/70">(32) 99999-9999</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button asChild className="flex items-center gap-2 px-6 py-3 bg-boheme-brown text-white rounded-full text-sm font-bold uppercase tracking-widest hover:bg-boheme-bronze transition-colors">
              <a
                href="https://www.google.com/maps/place/Boh%C3%A8me+Caf%C3%A9/@-21.7671217,-43.3611968,15z/data=!4m2!3m1!1s0x989b642c91237d:0x6f2981464c994a08"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Navigation className="w-4 h-4" />
                Google Maps
              </a>
            </Button>
            <Button variant="outline" className="px-6 py-3 border border-boheme-brown text-boheme-brown rounded-full text-sm font-bold uppercase tracking-widest hover:bg-boheme-brown hover:text-white transition-colors">
              Chamar Uber
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-2/3 h-[500px] rounded-[3rem] overflow-hidden shadow-2xl relative"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8318.205644434594!2d-43.36119675554751!3d-21.76712165906342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x989b642c91237d%3A0x6f2981464c994a08!2zQm9ow6htZSBDYWbDqQ!5e0!3m2!1spt-BR!2sbr!4v1774035587617!5m2!1spt-BR!2sbr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Bohème Café Location"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
}
