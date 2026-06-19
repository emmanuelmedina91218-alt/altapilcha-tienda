import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/CartContext.jsx';
import { useFilters } from '@/contexts/FilterContext.jsx';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import CartDrawer from '@/components/CartDrawer.jsx';
import { categories } from '@/data/products.js';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  // FIX: ref para manejar el timeout del mega-menu y evitar que se cierre prematuramente al mover el mouse
  const megaMenuTimeout = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { setFilter, clearFilters } = useFilters();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // FIX: cerrar búsqueda y mega menu al cambiar de ruta
  useEffect(() => {
    setShowSearch(false);
    setShowMegaMenu(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // FIX: cerrar búsqueda con ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowSearch(false);
        setShowMegaMenu(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // FIX: limpiar otros filtros antes de buscar para evitar resultados vacíos
      clearFilters();
      setFilter('searchTerm', searchTerm.trim());
      navigate('/tienda');
      setShowSearch(false);
      setSearchTerm('');
    }
  };

  const handleCategoryClick = (category, genero) => {
    clearFilters();
    setFilter('categorias', [category]);
    setFilter('genero', genero);
    navigate('/tienda');
    setShowMegaMenu(false);
    setMobileMenuOpen(false);
  };

  // FIX: delay para cerrar mega-menu para que el mouse pueda moverse entre el botón y el panel
  const handleMegaMenuEnter = () => {
    if (megaMenuTimeout.current) clearTimeout(megaMenuTimeout.current);
    setShowMegaMenu(true);
  };

  const handleMegaMenuLeave = () => {
    megaMenuTimeout.current = setTimeout(() => setShowMegaMenu(false), 150);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-background/95 backdrop-blur-md shadow-lg' : 'bg-background'} border-b-2 border-primary`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link to="/" className="flex items-center shrink-0">
              <img src="/logo.svg" alt="Alta Pilcha" className="h-12 w-auto" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link
                to="/"
                className={`text-sm font-medium uppercase tracking-wide transition-all duration-200 relative ${isActive('/') ? 'text-primary' : 'text-white hover:text-primary'}`}
              >
                Inicio
                {isActive('/') && (
                  <motion.div layoutId="activeLink" className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                )}
              </Link>

              {/* FIX: mega-menu ahora usa un wrapper div unificado para que el mouse no "caiga" entre botón y panel */}
              <div
                className="relative"
                onMouseEnter={handleMegaMenuEnter}
                onMouseLeave={handleMegaMenuLeave}
              >
                <button
                  className={`flex items-center space-x-1 text-sm font-medium uppercase tracking-wide transition-all duration-200 ${isActive('/tienda') ? 'text-primary' : 'text-white hover:text-primary'}`}
                  aria-expanded={showMegaMenu}
                  aria-haspopup="true"
                >
                  <span>Tienda</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showMegaMenu ? 'rotate-180' : ''}`} />
                </button>
              </div>

              <Link
                to="/contacto"
                className={`text-sm font-medium uppercase tracking-wide transition-all duration-200 relative ${isActive('/contacto') ? 'text-primary' : 'text-white hover:text-primary'}`}
              >
                Contacto
                {isActive('/contacto') && (
                  <motion.div layoutId="activeLink" className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                )}
              </Link>

              <Link
                to="/nosotros"
                className={`text-sm font-medium uppercase tracking-wide transition-all duration-200 relative ${isActive('/nosotros') ? 'text-primary' : 'text-white hover:text-primary'}`}
              >
                Sobre Nosotros
                {isActive('/nosotros') && (
                  <motion.div layoutId="activeLink" className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                )}
              </Link>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <AnimatePresence mode="wait">
                {showSearch ? (
                  <motion.form
                    key="search-form"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 'auto', opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    onSubmit={handleSearch}
                    className="hidden md:flex items-center"
                  >
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Buscar productos..."
                      className="bg-secondary border border-border rounded-lg px-4 py-2 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all duration-200 w-64"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => { setShowSearch(false); setSearchTerm(''); }}
                      className="ml-2 text-white hover:text-primary transition-all duration-200"
                      aria-label="Cerrar búsqueda"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </motion.form>
                ) : (
                  <motion.button
                    key="search-btn"
                    onClick={() => setShowSearch(true)}
                    className="hidden md:block text-white hover:text-primary transition-all duration-200"
                    aria-label="Buscar"
                  >
                    <Search className="w-5 h-5" />
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Cart */}
              <button
                onClick={() => setCartDrawerOpen(true)}
                className="relative text-white hover:text-primary transition-all duration-200"
                aria-label={`Carrito de compras${cartCount > 0 ? `, ${cartCount} items` : ''}`}
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {cartCount > 99 ? '99+' : cartCount}
                  </motion.span>
                )}
              </button>

              {/* Mobile Menu */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <button className="lg:hidden text-white" aria-label="Menú principal">
                    <Menu className="w-6 h-6" />
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="bg-background border-r border-border w-80 overflow-y-auto">
                  <div className="flex flex-col space-y-6 mt-8">
                    <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                      <img src="/logo.svg" alt="Alta Pilcha" className="h-12 w-auto" />
                    </Link>

                    {/* FIX: buscador también en mobile menu */}
                    <form onSubmit={(e) => { e.preventDefault(); if (searchTerm.trim()) { clearFilters(); setFilter('searchTerm', searchTerm.trim()); navigate('/tienda'); setMobileMenuOpen(false); setSearchTerm(''); }}} className="flex">
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Buscar..."
                        className="flex-1 bg-secondary border border-border rounded-l-lg px-3 py-2 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                      />
                      <button type="submit" className="bg-primary px-3 rounded-r-lg" aria-label="Buscar">
                        <Search className="w-4 h-4 text-white" />
                      </button>
                    </form>

                    <nav className="flex flex-col space-y-4">
                      <Link to="/" onClick={() => setMobileMenuOpen(false)} className={`text-lg font-medium uppercase ${isActive('/') ? 'text-primary' : 'text-white'}`}>
                        Inicio
                      </Link>

                      <Accordion type="single" collapsible>
                        <AccordionItem value="tienda" className="border-border">
                          <AccordionTrigger className="text-lg font-medium uppercase text-white hover:text-primary py-2">
                            Tienda
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4 pl-4 pt-2">
                              <div>
                                <h4 className="text-sm font-bold text-primary mb-2">HOMBRE</h4>
                                <div className="space-y-2">
                                  {categories.map(cat => (
                                    <button key={`hombre-${cat}`} onClick={() => handleCategoryClick(cat, 'HOMBRE')} className="block text-sm text-white hover:text-primary transition-all duration-200 text-left w-full">
                                      {cat}
                                    </button>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <h4 className="text-sm font-bold text-primary mb-2">MUJER</h4>
                                <div className="space-y-2">
                                  {categories.map(cat => (
                                    <button key={`mujer-${cat}`} onClick={() => handleCategoryClick(cat, 'MUJER')} className="block text-sm text-white hover:text-primary transition-all duration-200 text-left w-full">
                                      {cat}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>

                      <Link to="/contacto" onClick={() => setMobileMenuOpen(false)} className={`text-lg font-medium uppercase ${isActive('/contacto') ? 'text-primary' : 'text-white'}`}>
                        Contacto
                      </Link>
                      <Link to="/nosotros" onClick={() => setMobileMenuOpen(false)} className={`text-lg font-medium uppercase ${isActive('/nosotros') ? 'text-primary' : 'text-white'}`}>
                        Sobre Nosotros
                      </Link>
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        {/* Mega Menu - FIX: ahora está dentro del wrapper con hover para evitar el "gap" */}
        <AnimatePresence>
          {showMegaMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onMouseEnter={handleMegaMenuEnter}
              onMouseLeave={handleMegaMenuLeave}
              className="absolute top-full left-0 right-0 bg-secondary border-t border-border shadow-lg z-50"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-4 uppercase tracking-wider">Hombre</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {categories.map(cat => (
                        <button key={`mega-hombre-${cat}`} onClick={() => handleCategoryClick(cat, 'HOMBRE')} className="text-left text-sm text-white hover:text-primary transition-all duration-200 font-medium py-1">
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-4 uppercase tracking-wider">Mujer</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {categories.map(cat => (
                        <button key={`mega-mujer-${cat}`} onClick={() => handleCategoryClick(cat, 'MUJER')} className="text-left text-sm text-white hover:text-primary transition-all duration-200 font-medium py-1">
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <CartDrawer open={cartDrawerOpen} onOpenChange={setCartDrawerOpen} />
    </>
  );
};

export default Header;
