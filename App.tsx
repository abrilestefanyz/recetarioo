// App.tsx
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabNavigation } from './src/navigations/BottomTabNavigation';

export default function App() {
  return (
    <NavigationContainer>
      <BottomTabNavigation />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}