import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useStock } from '@/contexts/StockContext.jsx';

const ProductCard = ({ product, onClick }) => {
  const { isAgotado, getStock } = useStock();
  const agotado = product.sku ? isAgotado(product.sku) : false;
  const stockReal = product.sku ? getStock(product.sku) : null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <motion.div
      whileHover={{ y: agotado ? 0 : -4 }}
      className={`group bg-card rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${agotado ? 'opacity-75' : 'hover:shadow-hard-red-sm'}`}
      onClick={!agotado ? onClick : undefined}
    >
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-500 ${agotado ? 'grayscale' : 'group-hover:scale-110'}`}
        />

        {/* Badge AGOTADO — se muestra automáticamente cuando stock = 0 en Firebase */}
        {agotado && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <div className="bg-black border-2 border-primary px-4 py-2 rotate-[-12deg]">
              <span className="text-primary font-black text-xl uppercase tracking-widest">Agotado</span>
            </div>
          </div>
        )}

        {/* Badge normal (NUEVO, OFERTA, etc) — solo si no está agotado */}
        {!agotado && product.badge && (
          <div className={`absolute top-3 right-3 px-3 py-1 text-xs font-bold uppercase tracking-wider ${
            product.badge === 'NUEVO' ? 'bg-primary text-white' :
            product.badge === 'OFERTA' ? 'bg-green-600 text-white' :
            'bg-yellow-600 text-white'
          }`}>
            {product.badge}
          </div>
        )}

        {/* Stock bajo — solo si queda 1 */}
        {!agotado && stockReal === 1 && (
          <div className="absolute top-3 left-3 bg-yellow-600 text-white px-2 py-1 text-xs font-bold uppercase tracking-wider">
            ¡Último!
          </div>
        )}

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
      </div>

      <div className="p-4 space-y-3">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">{product.category}</p>
          <h3 className="text-base font-semibold text-white mt-1 line-clamp-2">{product.name}</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Talle {product.talles?.[0]}{product.colores?.[0] ? ` · ${product.colores[0]}` : ''}
          </p>
        </div>

        <div className="flex items-center justify-between">
          {product.price > 0
            ? <p className={`text-xl font-bold ${agotado ? 'text-muted-foreground line-through' : 'text-primary'}`}>{formatPrice(product.price)}</p>
            : <p className="text-sm font-semibold text-muted-foreground">Consultar precio</p>
          }
          {!agotado && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => { e.stopPropagation(); onClick(); }}
              className="bg-primary hover:bg-primary/90 text-white p-2 rounded-lg transition-all duration-200"
              aria-label="Ver producto"
            >
              <ShoppingCart className="w-4 h-4" />
            </motion.button>
          )}
        </div>

        {agotado && (
          <p className="text-xs text-muted-foreground text-center">Próximamente disponible</p>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
