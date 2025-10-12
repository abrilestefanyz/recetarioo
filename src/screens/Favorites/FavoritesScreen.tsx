// src/screens/Favorites/FavoritesScreen.tsx
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
  rating: number;
  prepTime: string;
}

export function FavoritesScreen({ navigation }: any) {
  const [favorites, setFavorites] = useState<Recipe[]>([
    {
      id: '4',
      title: 'Tacos al Pastor',
      image: 'https://via.placeholder.com/300x200/F38181/ffffff?text=Tacos',
      rating: 5.0,
      prepTime: '30 min',
    },
    {
      id: '6',
      title: 'Pizza Margherita',
      image: 'https://via.placeholder.com/300x200/FECA57/ffffff?text=Pizza',
      rating: 4.9,
      prepTime: '45 min',
    },
  ]);

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter((fav) => fav.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favoritos</Text>
        <Text style={styles.headerSubtitle}>
          {favorites.length} receta{favorites.length !== 1 ? 's' : ''}
        </Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {favorites.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="heart-outline" size={64} color="#DEE2E6" />
            <Text style={styles.emptyStateText}>
              No tienes favoritos aún
            </Text>
            <Text style={styles.emptyStateSubtext}>
              Guarda tus recetas favoritas tocando el corazón
            </Text>
          </View>
        ) : (
          <View style={styles.favoritesContainer}>
            {favorites.map((recipe) => (
              <View key={recipe.id} style={styles.recipeCard}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('RecipeDetailScreen', { recipe })
                  }
                >
                  <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
                  <View style={styles.recipeInfo}>
                    <Text style={styles.recipeTitle} numberOfLines={2}>
                      {recipe.title}
                    </Text>
                    <View style={styles.recipeMetadata}>
                      <View style={styles.ratingContainer}>
                        <Ionicons name="star" size={14} color="#FFD700" />
                        <Text style={styles.ratingText}>{recipe.rating}</Text>
                      </View>
                      <View style={styles.timeContainer}>
                        <Ionicons name="time-outline" size={14} color="#6C757D" />
                        <Text style={styles.timeText}>{recipe.prepTime}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.favoriteButton}
                  onPress={() => removeFavorite(recipe.id)}
                >
                  <Ionicons name="heart" size={24} color="#FF6B6B" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
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
  headerSubtitle: {
    fontSize: 14,
    color: '#6C757D',
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
    paddingHorizontal: 40,
  },
  emptyStateText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#495057',
    marginTop: 16,
    textAlign: 'center',
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#6C757D',
    marginTop: 8,
    textAlign: 'center',
  },
  favoritesContainer: {
    padding: 16,
  },
  recipeCard: {
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
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  recipeInfo: {
    padding: 16,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 12,
  },
  recipeMetadata: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#6C757D',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#6C757D',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
});