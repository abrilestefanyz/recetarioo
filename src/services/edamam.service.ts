// src/services/edamam.service.ts
import axios from 'axios';

const APP_ID = 'abc123def456';
const APP_KEY = '1234567890abcdef1234567890abcdef';
const BASE_URL = 'https://api.edamam.com/api/recipes/v2';

export interface Recipe {
  id: string;
  title: string;
  image: string;
  category: string;
  area: string;
  instructions: string;
  ingredients: { name: string; measure: string }[];
  video?: string;
  tags?: string[];
  source?: string;
  url?: string;
  calories?: number;
  totalTime?: number;
  servings?: number;
}

interface EdamamRecipe {
  recipe: {
    uri: string;
    label: string;
    image: string;
    source: string;
    url: string;
    dietLabels: string[];
    healthLabels: string[];
    ingredientLines: string[];
    ingredients: Array<{
      text: string;
      quantity: number;
      measure: string;
      food: string;
    }>;
    calories: number;
    totalTime: number;
    cuisineType: string[];
    mealType: string[];
    dishType: string[];
    yield: number;
  };
}

// Función para transformar receta de Edamam a nuestro formato
const transformRecipe = (edamamRecipe: EdamamRecipe): Recipe => {
  const recipe = edamamRecipe.recipe;
  
  // Extraer ID del URI
  const id = recipe.uri.split('#recipe_')[1] || recipe.uri;
  
  // Transformar ingredientes
  const ingredients = recipe.ingredients.map(ing => ({
    name: ing.food,
    measure: `${ing.quantity} ${ing.measure || ''}`.trim(),
  }));

  // Categoría y área
  const category = recipe.dishType?.[0] || recipe.mealType?.[0] || 'General';
  const area = recipe.cuisineType?.[0] || 'Internacional';

  return {
    id,
    title: recipe.label,
    image: recipe.image,
    category: category.charAt(0).toUpperCase() + category.slice(1),
    area: area.charAt(0).toUpperCase() + area.slice(1),
    instructions: recipe.ingredientLines.join('\n'),
    ingredients,
    source: recipe.source,
    url: recipe.url,
    calories: Math.round(recipe.calories),
    totalTime: recipe.totalTime || 30,
    servings: recipe.yield || 4,
    tags: [...(recipe.dietLabels || []), ...(recipe.healthLabels?.slice(0, 2) || [])],
  };
};

// Obtener recetas con término de búsqueda
export const searchRecipes = async (
  query: string,
  count: number = 20
): Promise<Recipe[]> => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        type: 'public',
        q: query,
        app_id: APP_ID,
        app_key: APP_KEY,
        to: count,
        random: true,
      },
    });

    if (!response.data.hits || response.data.hits.length === 0) {
      return [];
    }

    return response.data.hits.map((hit: EdamamRecipe) => transformRecipe(hit));
  } catch (error) {
    console.error('Error searching recipes:', error);
    return [];
  }
};

// Obtener recetas aleatorias (usando búsquedas variadas)
export const getRandomRecipes = async (count: number = 10): Promise<Recipe[]> => {
  const searchTerms = [
    'pollo',
    'pasta',
    'arroz',
    'ensalada',
    'sopa',
    'carne',
    'pescado',
    'vegetales',
    'postre',
    'tacos',
  ];
  
  const randomTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)];
  return searchRecipes(randomTerm, count);
};

// Buscar recetas por nombre
export const searchRecipesByName = async (name: string): Promise<Recipe[]> => {
  if (!name || name.trim().length < 2) {
    return [];
  }
  return searchRecipes(name, 20);
};

// Obtener recetas por categoría/tipo de comida
export const getRecipesByCategory = async (category: string): Promise<Recipe[]> => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        type: 'public',
        q: category,
        app_id: APP_ID,
        app_key: APP_KEY,
        dishType: category.toLowerCase(),
        to: 20,
      },
    });

    if (!response.data.hits || response.data.hits.length === 0) {
      return [];
    }

    return response.data.hits.map((hit: EdamamRecipe) => transformRecipe(hit));
  } catch (error) {
    console.error('Error fetching recipes by category:', error);
    return [];
  }
};

// Obtener recetas por tipo de cocina
export const getRecipesByCuisine = async (cuisine: string): Promise<Recipe[]> => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        type: 'public',
        q: cuisine,
        app_id: APP_ID,
        app_key: APP_KEY,
        cuisineType: cuisine.toLowerCase(),
        to: 20,
      },
    });

    if (!response.data.hits || response.data.hits.length === 0) {
      return [];
    }

    return response.data.hits.map((hit: EdamamRecipe) => transformRecipe(hit));
  } catch (error) {
    console.error('Error fetching recipes by cuisine:', error);
    return [];
  }
};

// Categorías disponibles (en español)
export const getCategories = async (): Promise<string[]> => {
  return [
    'Desayuno',
    'Almuerzo',
    'Cena',
    'Postre',
    'Ensalada',
    'Sopa',
    'Aperitivo',
    'Bebida',
  ];
};