import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'sonner';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import FloatingWhatsAppButton from './components/FloatingWhatsAppButton.jsx';
import HomePage from './pages/HomePage.jsx';
import TiendaPage from './pages/TiendaPage.jsx';
import ContactoPage from './pages/ContactoPage.jsx';
import NosotrosPage from './pages/NosotrosPage.jsx';
import { CartProvider } from './contexts/CartContext.jsx';
import { FilterProvider } from './contexts/FilterContext.jsx';
import { StockProvider } from './contexts/StockContext.jsx';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <p className="text-xl text-muted-foreground">Página no encontrada</p>
        <Link
          to="/"
          className="inline-block bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wider px-6 py-3 rounded-lg transition-all duration-200"
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <StockProvider>
      <CartProvider>
        <FilterProvider>
          <Router>
            <ScrollToTop />
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/tienda" element={<TiendaPage />} />
                  <Route path="/contacto" element={<ContactoPage />} />
                  <Route path="/nosotros" element={<NosotrosPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
              <FloatingWhatsAppButton />
            </div>
            <Toaster position="top-right" richColors />
          </Router>
        </FilterProvider>
      </CartProvider>
    </StockProvider>
  );
}

export default App;
