// src/screens/Home/HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getRandomRecipes, Recipe } from '../../services/themealdb.service';
import { useFavorites } from '../../context/FavoritesContext';

export function HomeScreen({ navigation }: any) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    setLoading(true);
    const data = await getRandomRecipes(10);
    setRecipes(data);
    setLoading(false);
  };

  const handleToggleFavorite = async (recipe: Recipe) => {
    await toggleFavorite(recipe);
  };

  const renderRecipeCard = (recipe: Recipe) => (
    <TouchableOpacity
      key={recipe.id}
      style={styles.recipeCard}
      onPress={() =>
        navigation.navigate('RecipeDetailScreen', { recipe })
      }
    >
      <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => handleToggleFavorite(recipe)}
      >
        <Ionicons
          name={isFavorite(recipe.id) ? 'heart' : 'heart-outline'}
          size={24}
          color={isFavorite(recipe.id) ? '#FF6B6B' : '#fff'}
        />
      </TouchableOpacity>
      <View style={styles.recipeInfo}>
        <Text style={styles.recipeTitle} numberOfLines={2}>
          {recipe.title}
        </Text>
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryText}>{recipe.category}</Text>
          <Text style={styles.areaText}>{recipe.area}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Recipes</Text>
        <TouchableOpacity onPress={loadRecipes}>
          <Ionicons name="refresh" size={24} color="#0891b2" />
        </TouchableOpacity>
      </View>
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0891b2" />
          <Text style={styles.loadingText}>Loading recipes...</Text>
        </View>
      ) : (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.recipesGrid}>
            {recipes.map((recipe) => renderRecipeCard(recipe))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212529',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#6C757D',
  },
  scrollView: {
    flex: 1,
  },
  recipesGrid: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  recipeCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recipeImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    padding: 6,
  },
  recipeInfo: {
    padding: 12,
  },
  recipeTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 8,
    minHeight: 40,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryText: {
    fontSize: 12,
    color: '#0891b2',
    fontWeight: '500',
  },
  areaText: {
    fontSize: 12,
    color: '#6C757D',
  },
});