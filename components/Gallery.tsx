'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Maximize2 } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface ImageProps {
  url: string;
  size: string;
}

const images: ImageProps[] = [
  { url: '/gallery/photo-1.png', size: 'masonry-item' },
  { url: '/gallery/photo-2.png', size: 'masonry-item-large' },
  { url: '/gallery/photo-3.png', size: 'masonry-item-small' },
  { url: '/gallery/photo-4.png', size: 'masonry-item' },
  { url: '/gallery/photo-5.png', size: 'masonry-item-large' },
  { url: '/gallery/photo-6.png', size: 'masonry-item-small' },
  { url: '/gallery/photo-7.png', size: 'masonry-item' },
  { url: '/gallery/photo-8.png', size: 'masonry-item-large' },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-boheme-bronze font-medium uppercase tracking-[0.2em] text-sm mb-4 block">
            Galeria Bohème
          </span>
          <h2 className="text-4xl md:text-5xl font-serif">Momentos e Texturas</h2>
        </div>

        <div className="masonry-grid gap-4">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${img.size} relative group overflow-hidden rounded-xl cursor-pointer`}
              onClick={() => setSelectedImage(img.url)}
            >
              <Image
                src={img.url}
                alt={`Gallery ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-boheme-brown/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Maximize2 className="text-white w-8 h-8" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-black/95 flex items-center justify-center p-6"
            onClick={() => setSelectedImage(null)}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-10 right-10 text-white hover:text-boheme-bronze transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-10 h-10" />
            </Button>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative w-full h-full max-w-6xl max-h-[80vh]"
            >
              <Image
                src={selectedImage}
                alt="Expanded view"
                fill
                sizes="100vw"
                className="object-contain rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
