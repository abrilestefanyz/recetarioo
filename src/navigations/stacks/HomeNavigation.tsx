// src/navigations/stacks/HomeNavigation.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../../screens/Home/HomeScreen';
import { RecipeDetailScreen } from '../../screens/Home/RecipeDetailScreen';
import { screens } from '../../utils/screens';

const Stack = createNativeStackNavigator();

export function HomeNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#F8F9FA' },
      }}
    >
      <Stack.Screen
        name={screens.tab.home.homeScreen}
        component={HomeScreen}
      />
      <Stack.Screen
        name={screens.tab.home.recipeDetailScreen}
        component={RecipeDetailScreen}
      />
    </Stack.Navigator>
  );
}