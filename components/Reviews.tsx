'use client';
import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

// Importações do shadcn/ui
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface ReviewProps {
  name: string;
  text: string;
  date: string;
}

// Avaliações reais do Bohème Café (Juiz de Fora)
const reviews: ReviewProps[] = [
  {
    name: 'Luciana Justino',
    text: 'Lugar muito agradável para tomar um café, fazer um brunch, um lanchinho ou saborear uma sobremesa. A decoração é aconchegante e os funcionários super educados e simpáticos. A comida estava deliciosa!',
    date: 'Setembro de 2025'
  },
  {
    name: 'Tami',
    text: 'Pra quem ama café, aqui será seu novo cantinho em JF! Ambiente lindo, calmo e agradável. Atendimento foi gentil e o café estava perfeito. Sem dúvidas voltaremos mais vezes!',
    date: 'Agosto de 2025'
  },
  {
    name: 'Flávia Frazao',
    text: 'Conheci essa Cafeteira e já amei de cara! Ambiente lindo, cheio de plantinhas, cheirinho gostoso e atendimento excelente. Vou voltar sempre!!!!',
    date: 'Agosto de 2025'
  },
  {
    name: 'Victoria Jansen',
    text: 'Ambiente super aconchegante, ideal para um café da tarde com um amigo. O atendimento é nota 1000. Pedi um croissant e um brownie divinos. Os cafés e o matcha estavam excelentes.',
    date: 'Julho de 2025'
  },
  {
    name: 'Yasmin Calegari',
    text: 'São pura educação! Ambiente agradável e comidinhas ótimas. Passei a tarde estudando com tranquilidade e muito bem servida.',
    date: 'Novembro de 2025'
  }
];

export default function Reviews() {
  return (
    <section className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Cabeçalho */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="flex items-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-boheme-bronze text-boheme-bronze" />
            ))}
          </div>
          <h2 className="text-5xl md:text-7xl font-serif mb-4">4.9 no Google</h2>
          <p className="text-boheme-brown/60 uppercase tracking-widest text-sm font-medium">
            Baseado em avaliações reais de clientes
          </p>
        </div>

        {/* Carrossel e Cards */}
        <div className="px-4 md:px-12">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 md:-ml-8">
              {reviews.map((review, index) => (
                <CarouselItem key={index} className="pl-4 md:pl-8 md:basis-1/2 lg:basis-1/3">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="h-full"
                  >
                    <Card className="h-full bg-boheme-cream border-none rounded-3xl relative group hover:bg-boheme-brown hover:text-white transition-colors duration-500 overflow-hidden shadow-none">
                      <CardContent className="p-10 flex flex-col h-full">
                        <Quote className="absolute top-8 right-8 w-12 h-12 text-boheme-bronze/20 group-hover:text-white/10 transition-colors" />
                        
                        <p className="text-lg italic leading-relaxed mb-8 flex-grow relative z-10">
                          {review.text}
                        </p>
                        
                        <div className="relative z-10">
                          <h4 className="font-bold text-sm uppercase tracking-widest mb-1">
                            {review.name}
                          </h4>
                          <span className="text-xs opacity-40">{review.date}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <CarouselPrevious className="hidden md:flex -left-12 bg-boheme-cream border-boheme-bronze/20 text-boheme-brown hover:bg-boheme-bronze hover:text-white transition-colors" />
            <CarouselNext className="hidden md:flex -right-12 bg-boheme-cream border-boheme-bronze/20 text-boheme-brown hover:bg-boheme-bronze hover:text-white transition-colors" />
          </Carousel>
        </div>

      </div>
    </section>
  );
}