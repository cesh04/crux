import { Manrope_400Regular, Manrope_700Bold, useFonts } from "@expo-google-fonts/manrope";
import { Slot, SplashScreen } from "expo-router"; // <-- Import Slot, not Stack
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from '../context/AuthContext'; // <-- Import AuthProvider
import './global.css';

export { ErrorBoundary } from 'expo-router';

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Manrope_400Regular,
    Manrope_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Keep rendering null until fonts are loaded or an error occurs
  if (!fontsLoaded && !fontError) {
    return null;
  }

  // This is the correct structure.
  // 1. AuthProvider wraps everything.
  // 2. GestureHandler wraps the <Slot />.
  // 3. <Slot /> renders the current route (e.g., your (auth) or (app) layout).
  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Slot />
      </GestureHandlerRootView>
    </AuthProvider>
  );
}