// src/navigations/stacks/SearchNavigation.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SearchScreen } from '../../screens/Search/SearchScreen';
import { RecipeDetailScreen } from '../../screens/Home/RecipeDetailScreen';
import { screens } from '../../utils/screens';

const Stack = createNativeStackNavigator();

export function SearchNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#F8F9FA' },
      }}
    >
      <Stack.Screen
        name={screens.tab.search.searchScreen}
        component={SearchScreen}
      />
      <Stack.Screen
        name="RecipeDetailScreen"
        component={RecipeDetailScreen}
      />
    </Stack.Navigator>
  );
}