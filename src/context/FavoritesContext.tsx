// src/context/FavoritesContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Recipe } from '../services/edamam.service';
import * as FavoritesService from '../services/favorites.service';

interface FavoritesContextType {
  favorites: Recipe[];
  addFavorite: (recipe: Recipe) => Promise<void>;
  removeFavorite: (recipeId: string) => Promise<void>;
  toggleFavorite: (recipe: Recipe) => Promise<void>;
  isFavorite: (recipeId: string) => boolean;
  loadFavorites: () => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Recipe[]>([]);

  // Cargar favoritos al iniciar
  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const loadedFavorites = await FavoritesService.getFavorites();
    setFavorites(loadedFavorites);
  };

  const addFavorite = async (recipe: Recipe) => {
    const success = await FavoritesService.addFavorite(recipe);
    if (success) {
      setFavorites([...favorites, recipe]);
    }
  };

  const removeFavorite = async (recipeId: string) => {
    await FavoritesService.removeFavorite(recipeId);
    setFavorites(favorites.filter(fav => fav.id !== recipeId));
  };

  const toggleFavorite = async (recipe: Recipe) => {
    const isNowFavorite = await FavoritesService.toggleFavorite(recipe);
    
    if (isNowFavorite) {
      // Se agregó a favoritos
      setFavorites([...favorites, recipe]);
    } else {
      // Se quitó de favoritos
      setFavorites(favorites.filter(fav => fav.id !== recipe.id));
    }
  };

  const isFavorite = (recipeId: string): boolean => {
    return favorites.some(fav => fav.id === recipeId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        isFavorite,
        loadFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};