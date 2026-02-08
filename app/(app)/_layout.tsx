import { Redirect, Stack } from 'expo-router';
import { useAuth } from '../../context/AuthContext'; // Adjust path

export default function AppLayout() {
  const { user } = useAuth();

  if (!user) {
    // User is not logged in, send to login
    return <Redirect href="/(auth)/login" />;
  }

  // This is where your protected app screens live
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" />
      <Stack.Screen name="scrolling" />
      {/* Add your profile screen here later */}
    </Stack>
  );
}