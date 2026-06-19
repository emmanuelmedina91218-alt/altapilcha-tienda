import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Minus, Plus, MessageCircle } from 'lucide-react';
import { useCart } from '@/contexts/CartContext.jsx';
import { useStock } from '@/contexts/StockContext.jsx';
import { toast } from 'sonner';
import { colores as colorData } from '@/data/products.js';

const colorMap = Object.fromEntries(colorData.map(c => [c.name, c.hex]));

const ProductModal = ({ product, open, onOpenChange }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { getStock } = useStock();

  useEffect(() => {
    if (!open) setQuantity(1);
  }, [open, product?.id]);

  const formatPrice = (price) =>
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(price);

  if (!product) return null;

  // Cada producto ya es un talle/color específico — no hace falta selector
  const talle = product.talles?.[0] || 'Único';
  const color = product.colores?.[0] || '';
  const stockReal = product.sku ? getStock(product.sku) : null;
  const maxQty = stockReal ?? 1;

  const handleAddToCart = () => {
    addToCart(product, talle, color, quantity);
    toast.success(`${product.name} agregado al carrito ✓`);
    onOpenChange(false);
  };

  const handleWhatsAppConsult = () => {
    const talleInfo = ` - Talle: ${talle}`;
    const colorInfo = color ? ` - Color: ${color}` : '';
    const message = encodeURIComponent(
      `Hola! Quiero consultar sobre: ${product.name}${talleInfo}${colorInfo} - ${formatPrice(product.price)}`
    );
    window.open(`https://wa.me/5491123456789?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-card text-card-foreground border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold uppercase tracking-wider pr-8">{product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="aspect-square rounded-lg overflow-hidden bg-secondary">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="space-y-5">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">{product.category} · {product.genero}</p>
              {product.price > 0
                ? <p className="text-3xl font-bold text-primary mt-1">{formatPrice(product.price)}</p>
                : <p className="text-lg font-semibold text-muted-foreground mt-1">Consultar precio por WhatsApp</p>
              }
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Talle y color — fijos, cada producto es una unidad específica */}
            <div className="flex gap-6">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Talle</p>
                <span className="px-4 py-2 border-2 border-primary bg-primary text-white rounded-lg font-medium text-sm inline-block">
                  {talle}
                </span>
              </div>
              {color && (
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Color</p>
                  <div className="flex items-center gap-2">
                    <span
                      className="w-8 h-8 rounded-full border-2 border-primary inline-block"
                      style={{ backgroundColor: colorMap[color] || '#888' }}
                    />
                    <span className="text-sm">{color}</span>
                  </div>
                </div>
              )}
            </div>

            {stockReal !== null && stockReal > 0 && (
              <p className="text-xs text-muted-foreground">
                {stockReal === 1 ? 'Última unidad disponible' : `${stockReal} unidades disponibles`}
              </p>
            )}

            {/* Quantity */}
            <div>
              <label className="block text-sm font-semibold mb-2 uppercase tracking-wider">Cantidad</label>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="border-border text-white hover:border-primary hover:text-primary"
                  aria-label="Reducir cantidad"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="text-xl font-bold w-12 text-center" aria-live="polite">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(q => Math.min(maxQty, q + 1))}
                  className="border-border text-white hover:border-primary hover:text-primary"
                  aria-label="Aumentar cantidad"
                  disabled={quantity >= maxQty}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <Button
                onClick={handleAddToCart}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wider py-6 text-base"
              >
                Agregar al Carrito
              </Button>
              <Button
                onClick={handleWhatsAppConsult}
                variant="outline"
                className="w-full border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white font-bold uppercase tracking-wider py-6 text-base"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Consultar WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
