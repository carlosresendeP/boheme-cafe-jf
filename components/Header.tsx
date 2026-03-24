'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Coffee } from 'lucide-react';

const navLinks = [
  { name: 'Essência', href: '#essencia' },
  { name: 'Destaques', href: '#destaques' },
  { name: 'Cardápio', href: '#cardapio' },
  { name: 'Ambiente', href: '#ambiente' },
  { name: 'Localização', href: '#localizacao' },
  { name: 'Reservas', href: '#reservas' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 1400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-in-out ${
        isScrolled ? 'bg-boheme-cream/95 backdrop-blur-xl py-4 shadow-md' : 'bg-transparent py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2 group">
          <Coffee className={`w-8 h-8 transition-colors duration-300 ${isScrolled ? 'text-boheme-bronze' : 'text-white'}`} />
          <span className={`text-2xl font-serif font-bold tracking-tight transition-colors duration-300 ${isScrolled ? 'text-boheme-brown' : 'text-white'}`}>
            Bohème
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center justify-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-medium uppercase tracking-widest hover:text-boheme-bronze transition-colors duration-300 ${
                isScrolled ? 'text-boheme-brown' : 'text-white'
              }`}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#reservas"
            className={`px-6 py-2 rounded-full text-sm font-semibold uppercase tracking-widest transition-all duration-300 ${
              isScrolled
                ? 'bg-boheme-brown text-white hover:bg-boheme-bronze'
                : 'bg-white text-boheme-brown hover:bg-boheme-bronze hover:text-white'
            }`}
          >
            Reservar
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className={`w-6 h-6 ${isScrolled ? 'text-boheme-brown' : 'text-white'}`} />
          ) : (
            <Menu className={`w-6 h-6 ${isScrolled ? 'text-boheme-brown' : 'text-white'}`} />
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-boheme-cream shadow-xl py-8 px-6 md:hidden flex flex-col gap-6 items-center"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-boheme-brown hover:text-boheme-bronze transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#reservas"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center bg-boheme-brown text-white py-4 rounded-xl font-bold uppercase tracking-widest"
            >
              Reservar Mesa
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
