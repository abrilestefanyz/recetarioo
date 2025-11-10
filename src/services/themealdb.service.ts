// src/services/themealdb.service.ts
import axios from 'axios';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

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

interface MealDBRecipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube: string;
  strTags: string;
  strSource: string;
  [key: string]: string;
}

const transformRecipe = (meal: MealDBRecipe): Recipe => {
  const ingredients: { name: string; measure: string }[] = [];
  
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    
    if (ingredient && ingredient.trim() !== '') {
      ingredients.push({
        name: ingredient,
        measure: measure || '',
      });
    }
  }

  return {
    id: meal.idMeal,
    title: meal.strMeal,
    image: meal.strMealThumb,
    category: meal.strCategory,
    area: meal.strArea,
    instructions: meal.strInstructions,
    ingredients,
    video: meal.strYoutube || undefined,
    tags: meal.strTags ? meal.strTags.split(',') : [],
    source: meal.strSource,
    totalTime: 30,
    servings: 4,
    calories: 350,
  };
};

export const getRandomRecipes = async (count: number = 10): Promise<Recipe[]> => {
  try {
    const promises = Array(count).fill(null).map(() =>
      axios.get(`${BASE_URL}/random.php`)
    );
    
    const responses = await Promise.all(promises);
    const recipes = responses.map(response => 
      transformRecipe(response.data.meals[0])
    );
    
    return recipes;
  } catch (error) {
    console.error('Error fetching random recipes:', error);
    return [];
  }
};

export const searchRecipesByName = async (name: string): Promise<Recipe[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/search.php?s=${name}`);
    
    if (!response.data.meals) {
      return [];
    }
    
    return response.data.meals.map(transformRecipe);
  } catch (error) {
    console.error('Error searching recipes:', error);
    return [];
  }
};

export const getRecipeById = async (id: string): Promise<Recipe | null> => {
  try {
    const response = await axios.get(`${BASE_URL}/lookup.php?i=${id}`);
    
    if (!response.data.meals) {
      return null;
    }
    
    return transformRecipe(response.data.meals[0]);
  } catch (error) {
    console.error('Error fetching recipe by id:', error);
    return null;
  }
};

export const searchRecipes = searchRecipesByName;