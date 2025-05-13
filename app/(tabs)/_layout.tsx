import { Colors } from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: Colors.black }}>
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