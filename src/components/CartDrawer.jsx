import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext.jsx';
import { useStock } from '@/contexts/StockContext.jsx';
import { motion, AnimatePresence } from 'framer-motion';

const CartDrawer = ({ open, onOpenChange }) => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const { registrarVentaWeb } = useStock();

  const formatPrice = (price) =>
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(price);

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    const itemsList = cart.map(item =>
      `• ${item.name}\n  Talle: ${item.talle} | Color: ${item.color} | Cant: ${item.quantity}\n  ${formatPrice(item.price * item.quantity)}`
    ).join('\n\n');
    const message = encodeURIComponent(
      `Hola! Quiero realizar el siguiente pedido:\n\n${itemsList}\n\n*Total: ${formatPrice(cartTotal)}*`
    );

    // Descuenta stock y registra el movimiento como "venta web" antes de abrir WhatsApp
    const items = cart.map(item => ({
      sku: item.sku,
      quantity: item.quantity,
      name: item.name,
      talle: item.talle,
      color: item.color,
    }));
    try {
      await registrarVentaWeb(items);
    } catch (e) {
      console.error('No se pudo registrar la venta en el stock:', e);
    }

    window.open(`https://wa.me/5491123456789?text=${message}`, '_blank', 'noopener,noreferrer');
    clearCart();
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="bg-background border-l border-border w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold uppercase tracking-wider flex items-center">
            <ShoppingBag className="w-6 h-6 mr-2 text-primary" />
            Carrito
            {cart.length > 0 && <span className="ml-2 text-sm text-muted-foreground font-normal">({cart.length} {cart.length === 1 ? 'item' : 'items'})</span>}
          </SheetTitle>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 space-y-4">
            <ShoppingBag className="w-20 h-20 text-muted-foreground/30" />
            <p className="text-lg text-muted-foreground">Tu carrito está vacío</p>
            <Button onClick={() => onOpenChange(false)} className="bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wider">
              Ver Tienda
            </Button>
          </div>
        ) : (
          <div className="flex flex-col flex-1 overflow-hidden mt-4">
            {/* FIX: overflow-y-auto en el contenedor de items para que el footer siempre sea visible */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
              <AnimatePresence initial={false}>
                {cart.map((item) => (
                  <motion.div
                    key={item.cartItemId}
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="bg-card rounded-lg p-4 space-y-3 overflow-hidden"
                  >
                    <div className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-18 h-18 w-[72px] h-[72px] object-cover rounded-lg bg-secondary flex-shrink-0"
                        loading="lazy"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm line-clamp-2 leading-tight">{item.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          Talle: {item.talle} · Color: {item.color}
                        </p>
                        <p className="text-base font-bold text-primary mt-1">
                          {/* FIX: mostrar precio unitario y total del item */}
                          {formatPrice(item.price * item.quantity)}
                          {item.quantity > 1 && (
                            <span className="text-xs text-muted-foreground font-normal ml-1">({formatPrice(item.price)} c/u)</span>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="h-8 w-8 border-border text-white hover:border-primary hover:text-primary"
                          aria-label="Reducir cantidad"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="text-sm font-bold w-8 text-center" aria-live="polite">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="h-8 w-8 border-border text-white hover:border-primary hover:text-primary"
                          aria-label="Aumentar cantidad"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        aria-label={`Eliminar ${item.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Footer fijo */}
            <div className="border-t border-border pt-4 space-y-3 mt-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold uppercase tracking-wider text-sm">Total</span>
                <span className="text-2xl font-bold text-primary">{formatPrice(cartTotal)}</span>
              </div>
              <Button
                onClick={handleCheckout}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wider py-6 text-base"
              >
                Finalizar por WhatsApp
              </Button>
              <Button
                onClick={clearCart}
                variant="outline"
                className="w-full border-border text-muted-foreground hover:border-destructive hover:text-destructive text-sm"
              >
                Vaciar Carrito
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
