import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, CreditCard, Truck, RefreshCw, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard.jsx';
import ProductModal from '@/components/ProductModal.jsx';
import { products } from '@/data/products.js';
import { useFilters } from '@/contexts/FilterContext.jsx';

const HomePage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { clearFilters, setFilter } = useFilters();
  const navigate = useNavigate();

  const featuredProducts = products.filter(p => p.badge === 'NUEVO').slice(0, 4);
  // FIX: si hay menos de 4 con badge NUEVO, completar con otros productos
  const displayedProducts = featuredProducts.length >= 4
    ? featuredProducts
    : [...featuredProducts, ...products.filter(p => p.badge !== 'NUEVO')].slice(0, 4);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  // FIX: al clickear una categoría, limpiar filtros previos y aplicar los correctos
  const handleCategoryClick = (catName, genero) => {
    clearFilters();
    setFilter('categorias', [catName]);
    setFilter('genero', genero);
    navigate('/tienda');
  };

  const valueProps = [
    {
      icon: CreditCard,
      title: 'Métodos de Pago',
      description: 'Efectivo, transferencia, tarjetas de crédito y débito. Cuotas sin interés disponibles.'
    },
    {
      icon: Truck,
      title: 'Envíos',
      description: 'Envíos a todo el país con Andreani y OCA. Retiro gratis en local sin costo adicional.'
    },
    {
      icon: RefreshCw,
      title: 'Cambios y Devoluciones',
      description: 'Cambios sin cargo dentro de los 30 días. Devolución del 100% del dinero garantizada.'
    }
  ];

  const categoriesHombre = [
    { name: 'Zapatillas', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800' },
    { name: 'Camperas', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800' },
    { name: 'Remeras', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800' },
    { name: 'Buzos', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800' }
  ];

  const categoriesMujer = [
    { name: 'Zapatillas', image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800' },
    { name: 'Camperas', image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800' },
    { name: 'Calzas', image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800' },
    { name: 'Conjuntos', image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800' }
  ];

  return (
    <>
      <Helmet>
        <title>Alta Pilcha - Indumentaria Deportiva y Urbana</title>
        <meta name="description" content="Descubrí la mejor indumentaria deportiva y urbana en Alta Pilcha. Zapatillas, camperas, remeras y más. Tu estilo, tu identidad." />
      </Helmet>

      <div className="grain-texture" aria-hidden="true" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Fondo */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1552346154-21d32810aba3?w=1920"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/50 to-background" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">

          {/* Logo real */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.77, 0, 0.175, 1] }}
            className="mb-6"
          >
            <img
              src="/logo.svg"
              alt="Alta Pilcha"
              className="w-72 sm:w-96 md:w-[480px] lg:w-[560px] mx-auto drop-shadow-2xl"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-lg"
          >
            Indumentaria deportiva &amp; urbana. Tu estilo, tu identidad.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/tienda">
              <Button className="bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wider px-8 py-6 text-base shadow-hard-red-sm">
                Ver Tienda
              </Button>
            </Link>
            <Link to="/tienda">
              <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-black font-bold uppercase tracking-wider px-8 py-6 text-base">
                Nuevos Ingresos
              </Button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          aria-hidden="true"
        >
          <ChevronDown className="w-8 h-8 text-white" />
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="py-20" aria-labelledby="featured-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 id="featured-heading" className="text-4xl md:text-5xl font-bold uppercase tracking-wider mb-4">
              Destacados
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {displayedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <ProductCard product={product} onClick={() => handleProductClick(product)} />
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/tienda">
              <Button className="bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wider px-8 py-4">
                Ver Todos los Productos
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-secondary py-20" aria-labelledby="categories-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 id="categories-heading" className="text-4xl md:text-5xl font-bold uppercase tracking-wider mb-4">
              Explorá por Categoría
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto" />
          </motion.div>

          <div className="space-y-12">
            {[
              { label: 'Hombre', genero: 'HOMBRE', cats: categoriesHombre },
              { label: 'Mujer', genero: 'MUJER', cats: categoriesMujer }
            ].map(({ label, genero, cats }) => (
              <div key={genero}>
                <h3 className="text-2xl font-bold uppercase tracking-wider mb-6 text-primary">{label}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {cats.map((cat, index) => (
                    <motion.div
                      key={`${genero}-${cat.name}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      {/* FIX: usar button + onClick en lugar de Link para manejar el filtro correctamente */}
                      <button
                        onClick={() => handleCategoryClick(cat.name, genero)}
                        className="group block relative aspect-square rounded-lg overflow-hidden w-full"
                        aria-label={`Ver ${cat.name} de ${label}`}
                      >
                        <img
                          src={cat.image}
                          alt=""
                          aria-hidden="true"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-2xl font-bold uppercase tracking-wider text-white drop-shadow-lg">{cat.name}</span>
                        </div>
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="bg-secondary py-20 border-t-2 border-primary" aria-label="Métodos de pago, envíos y devoluciones">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {valueProps.map((prop, index) => (
              <motion.div
                key={prop.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-card rounded-lg p-6 text-center space-y-4 hover:shadow-hard-red-sm transition-all duration-300"
              >
                <div className="flex justify-center">
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <prop.icon className="w-8 h-8 text-primary" aria-hidden="true" />
                  </div>
                </div>
                <h3 className="text-xl font-bold uppercase tracking-wider">{prop.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{prop.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ProductModal product={selectedProduct} open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
};

export default HomePage;
