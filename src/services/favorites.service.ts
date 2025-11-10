// src/services/favorites.service.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Recipe } from './themealdb.service';

const FAVORITES_KEY = '@recetario_favorites';

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

export const addFavorite = async (recipe: Recipe): Promise<boolean> => {
  try {
    const favorites = await getFavorites();
    const exists = favorites.some(fav => fav.id === recipe.id);
    if (exists) {
      return false;
    }
    
    favorites.push(recipe);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    return true;
  } catch (error) {
    console.error('Error adding favorite:', error);
    return false;
  }
};

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

export const isFavorite = async (recipeId: string): Promise<boolean> => {
  try {
    const favorites = await getFavorites();
    return favorites.some(fav => fav.id === recipeId);
  } catch (error) {
    console.error('Error checking favorite:', error);
    return false;
  }
};

export const toggleFavorite = async (recipe: Recipe): Promise<boolean> => {
  try {
    const isCurrentlyFavorite = await isFavorite(recipe.id);
    
    if (isCurrentlyFavorite) {
      await removeFavorite(recipe.id);
      return false;
    } else {
      await addFavorite(recipe);
      return true;
    }
  } catch (error) {
    console.error('Error toggling favorite:', error);
    return false;
  }
};