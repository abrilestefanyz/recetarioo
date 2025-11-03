// src/services/favorites.service.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Recipe } from './edamam.service';

const FAVORITES_KEY = '@recetario_favorites';

// Obtener todos los favoritos
export const getFavorites = async (): Promise<Recipe[]> => {
  try {
    const favoritesJson = await AsyncStorage.getItem(FAVORITES_KEY);
    if (favoritesJson) {
      return JSON.parse(favoritesJson);
    }
    return [];
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
};

// Agregar una receta a favoritos
export const addFavorite = async (recipe: Recipe): Promise<boolean> => {
  try {
    const favorites = await getFavorites();
    
    // Verificar si ya existe
    const exists = favorites.some(fav => fav.id === recipe.id);
    if (exists) {
      return false; // Ya está en favoritos
    }
    
    // Agregar la nueva receta
    favorites.push(recipe);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    return true;
  } catch (error) {
    console.error('Error adding favorite:', error);
    return false;
  }
};

// Eliminar una receta de favoritos
export const removeFavorite = async (recipeId: string): Promise<boolean> => {
  try {
    const favorites = await getFavorites();
    const filtered = favorites.filter(fav => fav.id !== recipeId);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error removing favorite:', error);
    return false;
  }
};

// Verificar si una receta está en favoritos
export const isFavorite = async (recipeId: string): Promise<boolean> => {
  try {
    const favorites = await getFavorites();
    return favorites.some(fav => fav.id === recipeId);
  } catch (error) {
    console.error('Error checking favorite:', error);
    return false;
  }
};

// Alternar favorito (agregar o quitar)
export const toggleFavorite = async (recipe: Recipe): Promise<boolean> => {
  try {
    const isCurrentlyFavorite = await isFavorite(recipe.id);
    
    if (isCurrentlyFavorite) {
      await removeFavorite(recipe.id);
      return false; // Ahora NO es favorito
    } else {
      await addFavorite(recipe);
      return true; // Ahora SÍ es favorito
    }
  } catch (error) {
    console.error('Error toggling favorite:', error);
    return false;
  }
};