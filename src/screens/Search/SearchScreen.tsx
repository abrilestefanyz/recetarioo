// src/screens/Search/SearchScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { searchRecipesByName, Recipe } from '../../services/edamam.service';

export function SearchScreen({ navigation }: any) {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    
    if (query.length < 2) {
      setRecipes([]);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setHasSearched(true);
    const results = await searchRecipesByName(query);
    setRecipes(results);
    setLoading(false);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setRecipes([]);
    setHasSearched(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Buscar</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#6C757D" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar recetas..."
          value={searchQuery}
          onChangeText={handleSearch}
          placeholderTextColor="#ADB5BD"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={clearSearch}>
            <Ionicons name="close-circle" size={20} color="#6C757D" />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0891b2" />
            <Text style={styles.loadingText}>Buscando recetas...</Text>
          </View>
        ) : !hasSearched ? (
          <View style={styles.emptyState}>
            <Ionicons name="search" size={64} color="#DEE2E6" />
            <Text style={styles.emptyStateText}>
              Busca tu receta favorita
            </Text>
            <Text style={styles.emptyStateSubtext}>
              Prueba: pollo, pasta, tacos, arroz...
            </Text>
          </View>
        ) : recipes.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="sad-outline" size={64} color="#DEE2E6" />
            <Text style={styles.emptyStateText}>
              No se encontraron resultados
            </Text>
            <Text style={styles.emptyStateSubtext}>
              Intenta con otro término de búsqueda
            </Text>
          </View>
        ) : (
          <View style={styles.resultsContainer}>
            <Text style={styles.resultsTitle}>
              {recipes.length} resultado{recipes.length !== 1 ? 's' : ''}
            </Text>
            {recipes.map((recipe) => (
              <TouchableOpacity
                key={recipe.id}
                style={styles.recipeItem}
                onPress={() =>
                  navigation.navigate('RecipeDetailScreen', { recipe })
                }
              >
                <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
                <View style={styles.recipeInfo}>
                  <Text style={styles.recipeTitle}>{recipe.title}</Text>
                  <View style={styles.metaInfo}>
                    <Text style={styles.recipeCategory}>{recipe.category}</Text>
                    <Text style={styles.recipeArea}> • {recipe.area}</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#ADB5BD" />
              </TouchableOpacity>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DEE2E6',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#212529',
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#6C757D',
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
  resultsContainer: {
    padding: 16,
  },
  resultsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 16,
  },
  recipeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  recipeImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  recipeInfo: {
    flex: 1,
    marginLeft: 12,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recipeCategory: {
    fontSize: 14,
    color: '#0891b2',
    fontWeight: '500',
  },
  recipeArea: {
    fontSize: 14,
    color: '#6C757D',
  },
});