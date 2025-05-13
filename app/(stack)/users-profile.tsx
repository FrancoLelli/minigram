import { UserPost } from '@/types/models'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Link } from 'expo-router'
import { useLocalSearchParams } from 'expo-router/build/hooks'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const screenWidth = Dimensions.get('window').width;

const ProfileScreen = () => {
  const { id } = useLocalSearchParams()

  const [userCachedData, setUserCachedData] = useState<UserPost | null>(null)
  const [userImages, setUserImages] = useState<UserPost[] | null>(null)

  const getCachedData = async () => {
    try {
      const cachedData = await AsyncStorage.getItem('data');
      if (cachedData) {
        const userData = JSON.parse(cachedData).find((user: UserPost) => user.id === Number(id))
        const userImages = JSON.parse(cachedData).filter((user: UserPost) => user.username === userData.username)
        setUserImages(userImages)
        setUserCachedData(userData);
      }
    } catch (error) {
      console.error('Error al cargar las fotos desde caché', error);
    }
  };

  useEffect(() => {
    getCachedData()
  }, [])

  if (!id || !userCachedData || !userImages) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: `https://i.pravatar.cc/150?u=${userCachedData.id}` }}
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.username}>{userCachedData.username}</Text>
          <Text style={styles.posts}>{userImages.length} publicaciones</Text>
        </View>
      </View>

      <FlatList
        data={userImages}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        contentContainerStyle={styles.imageGrid}
        renderItem={({ item }) => (
          <Link href={`/post?id=${item.id}`} asChild>
            <TouchableOpacity>
              <Image
                source={{ uri: `https://picsum.photos/seed/${item.id}/900/500` }}
                style={styles.image}
              />
            </TouchableOpacity>
          </Link>
        )}
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userInfo: {
    marginLeft: 20,
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  posts: {
    marginTop: 4,
    fontSize: 14,
    color: '#666',
  },
  imageGrid: {
    paddingBottom: 10,
  },
  image: {
    width: screenWidth / 3,
    height: screenWidth / 3,
  },
});