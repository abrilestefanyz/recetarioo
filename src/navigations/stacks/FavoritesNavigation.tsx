// src/navigations/stacks/FavoritesNavigation.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FavoritesScreen } from '../../screens/Favorites/FavoritesScreen';
import { RecipeDetailScreen } from '../../screens/Home/RecipeDetailScreen';
import { screens } from '../../utils/screens';

const Stack = createNativeStackNavigator();

export function FavoritesNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#F8F9FA' },
      }}
    >
      <Stack.Screen
        name={screens.tab.favorites.favoritesScreen}
        component={FavoritesScreen}
      />
      <Stack.Screen
        name="RecipeDetailScreen"
        component={RecipeDetailScreen}
      />
    </Stack.Navigator>
  );
}