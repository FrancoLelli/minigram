import React, { useEffect, useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import CommonInput from '@/components/Common/CommonInput'
import { UserPost } from '@/types/models'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'

const Search = () => {
  const [cachedPhotos, setCachedPhotos] = useState<UserPost[]>([]);
  const [searchValue, setSearchValue] = useState<string>('')
  const [filteredResults, setFilteredResults] = useState<UserPost[]>([]);

  const router = useRouter();

  const getCachedPhotos = async () => {
    try {
      const cachedData = await AsyncStorage.getItem('data');
      if (cachedData) {
        setCachedPhotos(JSON.parse(cachedData));
      }
    } catch (error) {
      console.error('Error al cargar las fotos desde caché', error);
    }
  };

  const filterResults = () => {
    if (searchValue.trim() === '') {
      setFilteredResults([]);
      return;
    }

    const filtered = cachedPhotos.filter(item =>
      item.username?.toLowerCase().includes(searchValue.toLowerCase())
    );

    setFilteredResults(filtered);
  }

  useEffect(() => {
    getCachedPhotos()
  }, [])

  useEffect(() => {
    filterResults()
  }, [searchValue])

  const ImageItem = ({ item }: { item: UserPost }) => (
    <TouchableOpacity onPress={() => router.push(`/post?id=${item.id}`)} style={styles.imageContainer}>
      <Image source={{ uri: `https://picsum.photos/seed/${item.id}/900/500` }} style={styles.image} />
    </TouchableOpacity>
  );

  const ResultItem = ({ item }: { item: UserPost }) => (
    <TouchableOpacity onPress={() => router.push(`/users-profile?id=${item.id}`)} style={styles.resultItem}>
      <Text style={styles.resultText}>{item?.username}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 20 }}>
      <View style={styles.inputContainer}>
        <CommonInput placeholder='Buscar...' value={searchValue} onChangeText={setSearchValue} />
      </View>

      {searchValue.trim().length > 0 && filteredResults.length > 0 && (
        <FlatList
          data={filteredResults}
          renderItem={ResultItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.resultsList}
        />
      )}

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
  inputContainer: {
    marginHorizontal: 10
  },
  resultsList: {
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    maxHeight: 200,
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  resultText: {
    fontSize: 16,
  },
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