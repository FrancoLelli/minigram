import { Colors } from '@/constants/Colors';
import { useAuth } from '@/context/auth';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Redirect, Tabs } from 'expo-router';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default function TabLayout() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <ActivityIndicator color={Colors.black} size="large" style={{ flex: 1 }} />;
  }

  if (!user) {
    return <Redirect href="/(stack)/login" />;
  }

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: Colors.black, animation: 'shift' }}>
      <Tabs.Screen
        name="feed"
        options={{
          title: 'Feed',
          headerTitleAlign: 'center',
          tabBarShowLabel: false,
          headerRight: ({ tintColor }) => (
            <View style={styles.headerRightContainer}>
              <Ionicons name="chatbubble-outline" size={30} color={'black'} />
            </View>
          ),
          tabBarIcon: ({ color }) => <Ionicons name="home" size={32} color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <Ionicons name="search" size={32} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <Ionicons name="person" size={32} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerRightContainer: {
    marginRight: 10,
    paddingRight: 10,
  },
});