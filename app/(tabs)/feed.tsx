// app/feed.tsx
import { getPhotos, getPosts, getUsers } from '@/services/api';
import { UserPost } from '@/types/models';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';

import PostCard from '@/components/Card/PostCard';
import { Colors } from '@/constants/Colors';
import { postUserHelper } from '@/helpers/postUserHelper';

const FeedScreen = () => {
    const [data, setData] = useState<UserPost[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const getData = async () => {
        setLoading(true);
        try {
            const cacheData = await AsyncStorage.getItem('data');

            if (!cacheData) {
                const photos = await getPhotos();
                const posts = await getPosts();
                const users = await getUsers();

                const data = postUserHelper(posts, photos, users);
                await AsyncStorage.setItem('data', JSON.stringify(data));
                setData(data);
            } else {
                setData(JSON.parse(cacheData));
            }
        } catch (error) {
            console.error('Error al cargar los datos:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    if (loading) {
        return <ActivityIndicator color={Colors.black} size="large" style={{ flex: 1 }} />;
    }

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <PostCard
                    id={item.id}
                    username={item.username}
                    title={item.title}
                    imageUrl={item.imageUrl}
                />
            )}
        />
    );
};

export default FeedScreen;
