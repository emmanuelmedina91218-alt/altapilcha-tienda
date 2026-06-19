
import React, { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within FilterProvider');
  }
  return context;
};

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    genero: null,
    categorias: [],
    talles: [],
    colores: [],
    precioMin: 0,
    precioMax: 150000,
    searchTerm: '',
    sortBy: 'relevancia'
  });

  const setFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleArrayFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter(item => item !== value)
        : [...prev[key], value]
    }));
  };

  const clearFilters = () => {
    setFilters({
      genero: null,
      categorias: [],
      talles: [],
      colores: [],
      precioMin: 0,
      precioMax: 150000,
      searchTerm: '',
      sortBy: 'relevancia'
    });
  };

  return (
    <FilterContext.Provider value={{
      filters,
      setFilter,
      toggleArrayFilter,
      clearFilters
    }}>
      {children}
    </FilterContext.Provider>
  );
};
