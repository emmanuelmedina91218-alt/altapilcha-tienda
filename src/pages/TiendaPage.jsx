import React, { useState, useMemo, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ProductCard from '@/components/ProductCard.jsx';
import ProductModal from '@/components/ProductModal.jsx';
import { useFilters } from '@/contexts/FilterContext.jsx';
import { products, categories, talles, colores } from '@/data/products.js';

// FIX: extraer FilterSection como componente independiente (no inline) para evitar re-montaje en cada render
const FilterSection = ({ filters, setFilter, toggleArrayFilter, clearFilters }) => {
  // FIX: combinar talles sin duplicados usando Set (el original podría tener duplicados entre grupos)
  const allTalles = useMemo(() => [...new Set([...talles.ropa, ...talles.unico])], []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold uppercase tracking-wider">Filtrar</h3>
        <Button variant="ghost" size="sm" onClick={clearFilters} className="text-primary hover:text-primary/80 text-xs">
          Limpiar filtros
        </Button>
      </div>

      {/* Género */}
      <div>
        <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">Género</h4>
        <div className="flex gap-2">
          {['HOMBRE', 'MUJER'].map(g => (
            <Button
              key={g}
              onClick={() => setFilter('genero', filters.genero === g ? null : g)}
              className={`flex-1 text-xs font-bold uppercase ${filters.genero === g ? 'bg-primary text-white' : 'bg-transparent border border-border text-white hover:border-primary'}`}
              variant="outline"
            >
              {g === 'HOMBRE' ? 'Hombre' : 'Mujer'}
            </Button>
          ))}
        </div>
      </div>

      {/* Categoría */}
      <div>
        <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">Categoría</h4>
        <div className="space-y-2">
          {categories.map(cat => (
            <label key={cat} className="flex items-center space-x-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.categorias.includes(cat)}
                onChange={() => toggleArrayFilter('categorias', cat)}
                className="w-4 h-4 rounded border-border accent-primary"
              />
              <span className="text-sm text-white group-hover:text-primary transition-colors">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Talle */}
      <div>
        <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">Talle</h4>
        <div className="flex flex-wrap gap-2">
          {allTalles.map(t => (
            <button
              key={t}
              onClick={() => toggleArrayFilter('talles', t)}
              className={`px-3 py-1 text-xs border rounded-lg transition-all duration-200 font-medium ${
                filters.talles.includes(t)
                  ? 'border-primary bg-primary text-white'
                  : 'border-border text-white hover:border-primary'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Color */}
      <div>
        <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">Color</h4>
        <div className="flex flex-wrap gap-3">
          {colores.map(color => (
            <button
              key={color.name}
              onClick={() => toggleArrayFilter('colores', color.name)}
              className={`w-8 h-8 rounded-full border-2 transition-all duration-200 relative ${
                filters.colores.includes(color.name) ? 'border-primary scale-110' : 'border-border hover:border-primary/60'
              }`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
              aria-label={`Color ${color.name}${filters.colores.includes(color.name) ? ' (seleccionado)' : ''}`}
            >
              {/* FIX: indicador visual de selección dentro del círculo */}
              {filters.colores.includes(color.name) && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-white/80 shadow" />
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Precio */}
      <div>
        <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">Precio</h4>
        <Slider
          min={0}
          max={150000}
          step={1000}
          value={[filters.precioMin, filters.precioMax]}
          onValueChange={([min, max]) => {
            setFilter('precioMin', min);
            setFilter('precioMax', max);
          }}
          className="mb-4"
        />
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>${filters.precioMin.toLocaleString('es-AR')}</span>
          <span>${filters.precioMax.toLocaleString('es-AR')}</span>
        </div>
      </div>
    </div>
  );
};

const TiendaPage = () => {
  const { filters, setFilter, toggleArrayFilter, clearFilters } = useFilters();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // FIX: quitar 'products' del array de dependencias (es una constante importada, no un estado)
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (filters.genero) {
      result = result.filter(p => p.genero === filters.genero);
    }
    if (filters.categorias.length > 0) {
      result = result.filter(p => filters.categorias.includes(p.category));
    }
    if (filters.talles.length > 0) {
      result = result.filter(p => p.talles.some(t => filters.talles.includes(t)));
    }
    if (filters.colores.length > 0) {
      result = result.filter(p => p.colores.some(c => filters.colores.includes(c)));
    }

    result = result.filter(p => p.price >= filters.precioMin && p.price <= filters.precioMax);

    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
      );
    }

    // FIX: usar spread para no mutar el array durante el sort
    switch (filters.sortBy) {
      case 'precio-asc':
        return [...result].sort((a, b) => a.price - b.price);
      case 'precio-desc':
        return [...result].sort((a, b) => b.price - a.price);
      case 'novedades':
        return [...result].sort((a, b) => (b.badge === 'NUEVO' ? 1 : 0) - (a.badge === 'NUEVO' ? 1 : 0));
      default:
        return result;
    }
  }, [filters]);

  // FIX: useCallback para que la referencia de la función no cambie en cada render
  const handleProductClick = useCallback((product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  }, []);

  const hasActiveFilters = filters.genero || filters.categorias.length > 0 || filters.talles.length > 0 || filters.colores.length > 0 || filters.searchTerm || filters.precioMin > 0 || filters.precioMax < 150000;

  return (
    <>
      <Helmet>
        <title>Tienda - Alta Pilcha</title>
        <meta name="description" content="Explorá nuestra colección completa de indumentaria deportiva y urbana." />
      </Helmet>

      <div className="min-h-screen pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24 bg-card rounded-lg p-6">
                <FilterSection
                  filters={filters}
                  setFilter={setFilter}
                  toggleArrayFilter={toggleArrayFilter}
                  clearFilters={clearFilters}
                />
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Top Bar */}
              <div className="bg-card rounded-lg p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {/* Mobile filter button */}
                  <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                    <SheetTrigger asChild>
                      <Button variant="outline" className={`lg:hidden border-border text-white hover:border-primary relative ${hasActiveFilters ? 'border-primary' : ''}`}>
                        <Filter className="w-4 h-4 mr-2" />
                        Filtrar
                        {/* FIX: indicador de filtros activos en mobile */}
                        {hasActiveFilters && (
                          <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full" />
                        )}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="bg-background border-r border-border w-80 overflow-y-auto">
                      <SheetHeader>
                        <SheetTitle className="text-xl font-bold uppercase tracking-wider">Filtros</SheetTitle>
                      </SheetHeader>
                      <div className="mt-6">
                        <FilterSection
                          filters={filters}
                          setFilter={setFilter}
                          toggleArrayFilter={toggleArrayFilter}
                          clearFilters={clearFilters}
                        />
                      </div>
                    </SheetContent>
                  </Sheet>

                  <input
                    type="text"
                    placeholder="Buscar productos..."
                    value={filters.searchTerm}
                    onChange={(e) => setFilter('searchTerm', e.target.value)}
                    className="flex-1 bg-secondary border border-border rounded-lg px-4 py-2 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all duration-200"
                    aria-label="Buscar productos en la tienda"
                  />
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <span className="text-sm text-muted-foreground whitespace-nowrap">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'producto' : 'productos'}
                  </span>

                  <Select value={filters.sortBy} onValueChange={(value) => setFilter('sortBy', value)}>
                    <SelectTrigger className="w-[180px] bg-secondary border-border text-white">
                      <SelectValue placeholder="Ordenar por" />
                    </SelectTrigger>
                    <SelectContent className="bg-secondary border-border">
                      <SelectItem value="relevancia">Relevancia</SelectItem>
                      <SelectItem value="precio-asc">Menor precio</SelectItem>
                      <SelectItem value="precio-desc">Mayor precio</SelectItem>
                      <SelectItem value="novedades">Novedades</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Chips de filtros activos */}
              {hasActiveFilters && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {filters.searchTerm && (
                    <span className="flex items-center gap-1 bg-primary/20 border border-primary/40 text-primary text-xs px-3 py-1 rounded-full">
                      Búsqueda: "{filters.searchTerm}"
                      <button onClick={() => setFilter('searchTerm', '')} className="ml-1 hover:text-white" aria-label="Quitar filtro de búsqueda">×</button>
                    </span>
                  )}
                  {filters.genero && (
                    <span className="flex items-center gap-1 bg-primary/20 border border-primary/40 text-primary text-xs px-3 py-1 rounded-full">
                      {filters.genero}
                      <button onClick={() => setFilter('genero', null)} className="ml-1 hover:text-white" aria-label="Quitar filtro de género">×</button>
                    </span>
                  )}
                  {filters.categorias.map(c => (
                    <span key={c} className="flex items-center gap-1 bg-primary/20 border border-primary/40 text-primary text-xs px-3 py-1 rounded-full">
                      {c}
                      <button onClick={() => toggleArrayFilter('categorias', c)} className="ml-1 hover:text-white" aria-label={`Quitar filtro ${c}`}>×</button>
                    </span>
                  ))}
                </div>
              )}

              {/* Products Grid */}
              {filteredProducts.length === 0 ? (
                <div className="bg-card rounded-lg p-12 text-center">
                  <p className="text-lg text-muted-foreground mb-4">No se encontraron productos con los filtros seleccionados</p>
                  <Button onClick={clearFilters} className="bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wider">
                    Limpiar filtros
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence mode="popLayout">
                    {filteredProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ProductCard product={product} onClick={() => handleProductClick(product)} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <ProductModal product={selectedProduct} open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
};

export default TiendaPage;
