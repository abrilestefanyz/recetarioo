// src/navigations/BottomTabNavigation.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { HomeNavigation } from './stacks/HomeNavigation';
import { SearchNavigation } from './stacks/SearchNavigation';
import { FavoritesNavigation } from './stacks/FavoritesNavigation';
import { screens } from '../utils/screens';

const Tab = createBottomTabNavigator();

export function BottomTabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#E9ECEF',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#0891b2',
        tabBarInactiveTintColor: '#6C757D',
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          if (route.name === screens.tab.home.root) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === screens.tab.search.root) {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === screens.tab.favorites.root) {
            iconName = focused ? 'heart' : 'heart-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name={screens.tab.home.root}
        component={HomeNavigation}
        options={{ title: 'Inicio' }}
      />
      <Tab.Screen
        name={screens.tab.search.root}
        component={SearchNavigation}
        options={{ title: 'Buscar' }}
      />
      <Tab.Screen
        name={screens.tab.favorites.root}
        component={FavoritesNavigation}
        options={{ title: 'Favoritos' }}
      />
    </Tab.Navigator>
  );
}