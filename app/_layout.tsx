import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import {Redirect, Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import * as SecureStore from 'expo-secure-store';
import '../global.css';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = await SecureStore.getItemAsync('token');
      setIsAuthenticated(!!token);
      if (loaded) {
        SplashScreen.hideAsync();
      }
    };
    checkToken();
  }, [loaded]);
  return (
      <ThemeProvider value={colorScheme === 'dark' ? DefaultTheme : DarkTheme}>
        <Stack>
          {isAuthenticated ? (
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          ) : (
              <Stack.Screen name="(login)" options={{ headerShown: false }} />
          )}
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
  );
}
