import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, Clock, MapPin } from 'lucide-react';

// FIX: importar categories desde data/products para mantener única fuente de verdad
// (antes el Footer tenía su propia lista hardcodeada que era diferente a la real)
import { categories } from '@/data/products.js';

const WHATSAPP_NUMBER = '5491123456789';
const WHATSAPP_BASE = `https://wa.me/${WHATSAPP_NUMBER}`;

const Footer = () => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Hola! Quiero hacer una consulta sobre Alta Pilcha');
    window.open(`${WHATSAPP_BASE}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="bg-[#050505] border-t-[3px] border-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Logo & Description */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <img src="/logo.svg" alt="Alta Pilcha" className="h-14 w-auto" />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Indumentaria deportiva y urbana. Tu estilo, tu identidad. Calidad y diseño en cada prenda.
            </p>
            <div className="flex items-center space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-all duration-200" aria-label="Instagram de Alta Pilcha">
                <Instagram className="w-5 h-5" />
              </a>
              {/* FIX: ícono de TikTok con SVG inline (sin react-icons que generaba advertencias de importación) */}
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-all duration-200" aria-label="TikTok de Alta Pilcha">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-all duration-200" aria-label="Facebook de Alta Pilcha">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Main Menu */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wider">Menú</h3>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Inicio' },
                { to: '/tienda', label: 'Tienda' },
                { to: '/contacto', label: 'Contacto' },
                { to: '/nosotros', label: 'Sobre Nosotros' }
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-muted-foreground hover:text-primary transition-all duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories - FIX: ahora usa la lista real de categories de products.js */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wider">Categorías</h3>
            <ul className="space-y-2">
              {categories.map(cat => (
                <li key={cat}>
                  <Link to="/tienda" className="text-sm text-muted-foreground hover:text-primary transition-all duration-200">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wider">Contacto</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={handleWhatsAppClick}
                  className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-all duration-200"
                  aria-label="Contactar por WhatsApp"
                >
                  <svg className="w-4 h-4 fill-current flex-shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span>+54 9 11 2345-6789</span>
                </button>
              </li>
              <li>
                <a href="mailto:info@altapilcha.com" className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-all duration-200">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span>info@altapilcha.com</span>
                </a>
              </li>
              <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p>Lun-Vie: 10:00-20:00hs</p>
                  <p>Sáb: 10:00-17:00hs</p>
                  <p>Dom: Cerrado</p>
                </div>
              </li>
              <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span>Buenos Aires, Argentina</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Alta Pilcha. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
