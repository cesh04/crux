import { Redirect, Stack } from 'expo-router';
import { useAuth } from '../../context/AuthContext'; // Adjust path

export default function AuthLayout() {
  const { user } = useAuth();

  if (user) {
    // User is logged in, send to the main app
    return <Redirect href="/(app)/home" />; // <-- Your main app screen
  }

  // This is where your old Stack definition goes
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" /> 
      <Stack.Screen name="login" />
      <Stack.Screen name="login2" />
    </Stack>
  );
}