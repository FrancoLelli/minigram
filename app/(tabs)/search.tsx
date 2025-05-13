import React, { useEffect, useState } from 'react'
import { FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import InputSearch from '@/components/Search/InputSearch'
import { UserPost } from '@/types/models'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Link } from 'expo-router'

const Search = () => {
  const [cachedPhotos, setCachedPhotos] = useState<UserPost[]>([]);

  const getCachedPhotos = async () => {
    try {
      //const cachedData = await AsyncStorage.getItem('photos');
      const cachedData = await AsyncStorage.getItem('data');
      if (cachedData) {
        setCachedPhotos(JSON.parse(cachedData));
      }
    } catch (error) {
      console.error('Error al cargar las fotos desde caché', error);
    }
  };

  useEffect(() => {
    getCachedPhotos()
  }, [])

  const ImageItem = ({ item }: { item: UserPost }) => (
    <Link href={`/post?id=${item.id}`} asChild>
      <TouchableOpacity style={styles.imageContainer}>
        <Image source={{ uri: "https://picsum.photos/100/200" }} style={styles.image} />
      </TouchableOpacity>
    </Link>
  );

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 20 }}>
      <InputSearch text={'hola'} onChangeText={() => { }} />
      <FlatList
        data={cachedPhotos}
        renderItem={ImageItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        contentContainerStyle={styles.imageGrid}
      />
    </SafeAreaView>
  )
}

export default Search

const styles = StyleSheet.create({
  imageGrid: {
    padding: 10,
  },
  imageContainer: {
    flex: 1,
    margin: 3,
    height: 120,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});