'use client';
import { Coffee } from 'lucide-react';
import { FaInstagram,FaFacebookSquare,FaWhatsapp   } from "react-icons/fa";

export default function Footer() {

  const date = new Date();
  const year = date.getFullYear();



  return (
    <footer className="bg-boheme-brown text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Coffee className="w-8 h-8 text-boheme-bronze" />
              <span className="text-2xl font-serif font-bold tracking-tight">Bohème</span>
            </div>
            <p className="text-white/50 max-w-sm leading-relaxed">
              Onde o conforto encontra a arte do sabor. 
              Um espaço dedicado aos apreciadores de cafés especiais e momentos de qualidade.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest mb-6 text-boheme-bronze">Navegação</h4>
            <ul className="space-y-4 text-sm text-white/70">
              <li><a href="#essencia" className="hover:text-white transition-colors">Nossa Essência</a></li>
              <li><a href="#cardapio" className="hover:text-white transition-colors">Cardápio</a></li>
              <li><a href="#ambiente" className="hover:text-white transition-colors">Ambiente</a></li>
              <li><a href="#reservas" className="hover:text-white transition-colors">Reservas</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest mb-6 text-boheme-bronze">Social</h4>
            <ul className="space-y-4 text-sm text-white/70">
              <li><a href="#" className="flex items-center gap-2 hover:text-white transition-colors"><FaInstagram className="w-4 h-4" /> Instagram</a></li>
              <li><a href="#" className="flex items-center gap-2 hover:text-white transition-colors"><FaFacebookSquare className="w-4 h-4" /> Facebook</a></li>
              <li><a href="#" className="flex items-center gap-2 hover:text-white transition-colors"><FaWhatsapp className="w-4 h-4" /> WhatsApp</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30 uppercase tracking-widest">
          <p>© {year} <strong className='text-boheme-bronze'>Bohème Café</strong>. Todos os direitos reservados.</p>
          <p>Desenvolvido por <strong className="text-boheme-bronze font-semibold transition-colors">Carlos Resende</strong></p>
        </div>
      </div>
    </footer>
  );
}
