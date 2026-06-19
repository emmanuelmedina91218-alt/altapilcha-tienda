import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, ref, onValue, update, push, set } from '@/lib/firebase';

const StockContext = createContext();

export const useStock = () => {
  const ctx = useContext(StockContext);
  if (!ctx) throw new Error('useStock must be used within StockProvider');
  return ctx;
};

export const StockProvider = ({ children }) => {
  const [stockBySku, setStockBySku] = useState({});      // sku -> cantidad
  const [stockById, setStockById] = useState({});         // id de Firebase -> {sku, stock, ...}
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const stockRef = ref(db, 'stock');
    const unsub = onValue(stockRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const bySku = {};
        const byId = {};
        Object.entries(data).forEach(([fbId, p]) => {
          if (p.sku) bySku[p.sku] = p.stock;
          byId[p.sku] = { fbId, ...p };
        });
        setStockBySku(bySku);
        setStockById(byId);
      }
      setLoading(false);
      setConnected(true);
    }, () => {
      setConnected(false);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const getStock = (sku) => {
    if (loading) return null;
    return stockBySku[sku] ?? null;
  };

  const isAgotado = (sku) => {
    const s = getStock(sku);
    return s !== null && s === 0;
  };

  // Descuenta stock por una venta hecha desde la WEB (checkout por WhatsApp)
  // y deja registro del movimiento con origen "web"
  const registrarVentaWeb = async (items) => {
    // items: [{ sku, quantity, name, talle, color }]
    for (const item of items) {
      const entry = stockById[item.sku];
      if (!entry) continue;
      const nuevoStock = Math.max(0, (entry.stock || 0) - item.quantity);
      await update(ref(db, 'stock/' + entry.fbId), { stock: nuevoStock });
      await push(ref(db, 'movimientos'), {
        sku: item.sku,
        nombre: item.name,
        talle: item.talle,
        color: item.color,
        cantidad: -item.quantity,
        origen: 'web',
        fecha: new Date().toISOString(),
      });
    }
  };

  return (
    <StockContext.Provider value={{ stockBySku, loading, connected, getStock, isAgotado, registrarVentaWeb }}>
      {children}
    </StockContext.Provider>
  );
};
