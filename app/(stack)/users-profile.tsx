import UserProfile from '@/components/Profile/UserProfile';
import { UserPost } from '@/types/models';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, View } from 'react-native';

const ProfileScreen = () => {
  const { id } = useLocalSearchParams();
  const [userCachedData, setUserCachedData] = useState<UserPost | null>(null);
  const [userImages, setUserImages] = useState<UserPost[] | null>(null);

  const getCachedData = async () => {
    try {
      const cachedData = await AsyncStorage.getItem('data');
      if (cachedData) {
        const userData = JSON.parse(cachedData).find((user: UserPost) => user.id === Number(id));
        const userImages = JSON.parse(cachedData).filter((user: UserPost) => user.username === userData.username);
        setUserCachedData(userData);
        setUserImages(userImages);
      }
    } catch (error) {
      console.error('Error al cargar las fotos desde caché', error);
    }
  };

  useEffect(() => {
    getCachedData();
  }, []);

  if (!id || !userCachedData || !userImages) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <UserProfile
        username={userCachedData.username}
        avatarId={userCachedData.userId}
        userImages={userImages}
        userLoged={false}
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
