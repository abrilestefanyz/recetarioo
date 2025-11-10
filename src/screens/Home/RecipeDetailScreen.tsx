// src/screens/Home/RecipeDetailScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Recipe } from '../../services/themealdb.service';
import { useFavorites } from '../../context/FavoritesContext';

export function RecipeDetailScreen({ route, navigation }: any) {
  const { recipe } = route.params as { recipe: Recipe };
  const { toggleFavorite, isFavorite: checkIsFavorite } = useFavorites();
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    setIsFav(checkIsFavorite(recipe.id));
  }, [recipe.id]);

  const handleToggleFavorite = async () => {
    await toggleFavorite(recipe);
    setIsFav(!isFav);
  };

  const openVideo = () => {
    if (recipe.video) {
      Linking.openURL(recipe.video);
    }
  };

  const steps = recipe.instructions
    .split('\n')
    .filter(step => step.trim() !== '')
    .map(step => step.replace(/^STEP \d+/i, '').trim());

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#212529" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={handleToggleFavorite}
        >
          <Ionicons
            name={isFav ? 'heart' : 'heart-outline'}
            size={24}
            color={isFav ? '#FF6B6B' : '#212529'}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Image source={{ uri: recipe.image }} style={styles.recipeImage} />

        <View style={styles.content}>
          <Text style={styles.title}>{recipe.title}</Text>

          <View style={styles.metadataContainer}>
            <View style={styles.metadataItem}>
              <Ionicons name="restaurant-outline" size={20} color="#6C757D" />
              <Text style={styles.metadataText}>{recipe.category}</Text>
            </View>
            <View style={styles.metadataItem}>
              <Ionicons name="globe-outline" size={20} color="#6C757D" />
              <Text style={styles.metadataText}>{recipe.area}</Text>
            </View>
            {recipe.tags && recipe.tags.length > 0 && (
              <View style={styles.metadataItem}>
                <Ionicons name="pricetag-outline" size={20} color="#6C757D" />
                <Text style={styles.metadataText}>{recipe.tags[0]}</Text>
              </View>
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            {recipe.ingredients.map((ingredient, index) => (
              <View key={index} style={styles.ingredientItem}>
                <View style={styles.bullet} />
                <Text style={styles.ingredientText}>
                  {ingredient.measure} {ingredient.name}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Instructions</Text>
            {steps.map((step, index) => (
              <View key={index} style={styles.stepItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </View>

          {recipe.video && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Video Tutorial</Text>
              <TouchableOpacity style={styles.videoButton} onPress={openVideo}>
                <Ionicons name="logo-youtube" size={24} color="#FF0000" />
                <Text style={styles.videoButtonText}>Watch on YouTube</Text>
              </TouchableOpacity>
            </View>
          )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  backButton: {
    padding: 8,
  },
  favoriteButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  recipeImage: {
    width: '100%',
    height: 300,
  },
  content: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 16,
  },
  metadataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
    marginBottom: 24,
  },
  metadataItem: {
    alignItems: 'center',
  },
  metadataText: {
    fontSize: 12,
    color: '#6C757D',
    marginTop: 4,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 16,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#0891b2',
    marginRight: 12,
  },
  ingredientText: {
    fontSize: 16,
    color: '#495057',
    flex: 1,
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#0891b2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  stepText: {
    fontSize: 16,
    color: '#495057',
    flex: 1,
    lineHeight: 24,
  },
  videoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DEE2E6',
  },
  videoButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginLeft: 8,
  },
});