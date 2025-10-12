// src/screens/Home/RecipeDetailScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function RecipeDetailScreen({ route, navigation }: any) {
  const { recipe } = route.params;
  const [isFavorite, setIsFavorite] = useState(recipe.isFavorite || false);

  const ingredients = [
    '2 tomates grandes',
    '1 pepino',
    '2 pimientos verdes',
    '1 cebolla roja',
    '2 dientes de ajo',
    'Jugo de 2 limones',
    '3 cucharadas de aceite de oliva',
    'Sal y pimienta al gusto',
    '2 panes pita tostados',
    'Perejil fresco',
  ];

  const steps = [
    'Corta todos los vegetales en cubos pequeños',
    'Mezcla los vegetales en un tazón grande',
    'Prepara el aderezo con limón, aceite de oliva, ajo picado, sal y pimienta',
    'Vierte el aderezo sobre los vegetales y mezcla bien',
    'Deja reposar en el refrigerador por 15 minutos',
    'Antes de servir, agrega el pan pita tostado y cortado en trozos',
    'Decora con perejil fresco picado',
    'Sirve inmediatamente y disfruta',
  ];

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
          onPress={() => setIsFavorite(!isFavorite)}
        >
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavorite ? '#FF6B6B' : '#212529'}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Image source={{ uri: recipe.image }} style={styles.recipeImage} />

        <View style={styles.content}>
          <Text style={styles.title}>{recipe.title}</Text>

          <View style={styles.metadataContainer}>
            <View style={styles.metadataItem}>
              <Ionicons name="time-outline" size={20} color="#6C757D" />
              <Text style={styles.metadataText}>30 min</Text>
            </View>
            <View style={styles.metadataItem}>
              <Ionicons name="people-outline" size={20} color="#6C757D" />
              <Text style={styles.metadataText}>4 porciones</Text>
            </View>
            <View style={styles.metadataItem}>
              <Ionicons name="flame-outline" size={20} color="#6C757D" />
              <Text style={styles.metadataText}>250 kcal</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ingredientes</Text>
            {ingredients.map((ingredient, index) => (
              <View key={index} style={styles.ingredientItem}>
                <View style={styles.bullet} />
                <Text style={styles.ingredientText}>{ingredient}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preparación</Text>
            {steps.map((step, index) => (
              <View key={index} style={styles.stepItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </View>
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
});