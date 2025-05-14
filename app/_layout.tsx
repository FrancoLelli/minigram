import { AuthProvider } from '@/context/auth';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(stack)/login" options={{ headerShown: false }} />
        <Stack.Screen name="(stack)/post" options={{ headerTitle: '', headerBackTitle: 'Volver' }} />
        <Stack.Screen name="(stack)/users-profile" options={{ headerTitle: '', headerBackTitle: 'Volver' }} />
        <Stack.Screen name="+not-found" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </AuthProvider>
  );
}
