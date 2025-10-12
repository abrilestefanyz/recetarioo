// src/screens/Home/HomeScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Recipe {
  id: string;
  title: string;
  image: string;
  isFavorite: boolean;
  rating: number;
}

export function HomeScreen({ navigation }: any) {
  const [recipes, setRecipes] = useState<Recipe[]>([
    {
      id: '1',
      title: 'Ensalada Fatush Libanesa',
      image: 'https://via.placeholder.com/300x200/FF6B6B/ffffff?text=Fatush',
      isFavorite: false,
      rating: 4.5,
    },
    {
      id: '2',
      title: 'Ensalada Tailandesa de Maní',
      image: 'https://via.placeholder.com/300x200/4ECDC4/ffffff?text=Thai+Salad',
      isFavorite: false,
      rating: 4.8,
    },
    {
      id: '3',
      title: 'Pasta Carbonara',
      image: 'https://via.placeholder.com/300x200/95E1D3/ffffff?text=Carbonara',
      isFavorite: false,
      rating: 4.7,
    },
    {
      id: '4',
      title: 'Tacos al Pastor',
      image: 'https://via.placeholder.com/300x200/F38181/ffffff?text=Tacos',
      isFavorite: true,
      rating: 5.0,
    },
  ]);

  const toggleFavorite = (id: string) => {
    setRecipes(
      recipes.map((recipe) =>
        recipe.id === id
          ? { ...recipe, isFavorite: !recipe.isFavorite }
          : recipe
      )
    );
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
        onPress={() => toggleFavorite(recipe.id)}
      >
        <Ionicons
          name={recipe.isFavorite ? 'heart' : 'heart-outline'}
          size={24}
          color={recipe.isFavorite ? '#FF6B6B' : '#fff'}
        />
      </TouchableOpacity>
      <View style={styles.recipeInfo}>
        <Text style={styles.recipeTitle} numberOfLines={2}>
          {recipe.title}
        </Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>{recipe.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Recetas</Text>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.recipesGrid}>
          {recipes.map((recipe) => renderRecipeCard(recipe))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
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
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#6C757D',
  },
});