import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import PostCard from '@/components/Card/PostCard';
import { Colors } from '@/constants/Colors';
import { UserPost } from '@/types/models';
import { Link } from 'expo-router';

const PostView = () => {
    const { id } = useLocalSearchParams();

    const [loading, setLoading] = useState(true);
    const [postData, setPostData] = useState<UserPost>({
        id: 0,
        username: 'Franco',
        title: 'Esto es un post',
        imageUrl: ''
    });
    const [morePosts, setMorePosts] = useState<UserPost[]>([]);

    const getPostData = async () => {
        try {
            const cacheData: any = await AsyncStorage.getItem('data');

            const cachePost = JSON.parse(cacheData).find((userPost: UserPost) => userPost.id === Number(id));

            const cacheMorePosts = JSON.parse(cacheData).filter((userPost: UserPost) => userPost.id !== Number(id));

            setPostData(cachePost);
            setMorePosts(cacheMorePosts);
            setLoading(false);
        } catch (error) {
            console.error('No se pudo obtener la información del post', error);
        }
    };

    useEffect(() => {
        getPostData();
    }, [id]);

    if (loading) {
        return <ActivityIndicator color={Colors.black} size="large" style={{ flex: 1 }} />;
    }

    const ImageItem = ({ item }: { item: UserPost }) => (
        <Link href={`/post?id=${item.id}`} asChild>
            <TouchableOpacity style={styles.imageContainer}>
                <Image source={{ uri: "https://picsum.photos/100/100" }} style={styles.image} />
            </TouchableOpacity>
        </Link>
    );

    return (
        <View style={{ flex: 1 }}>
            <PostCard
                id={postData.id}
                username={postData.username}
                title={postData.title}
                imageUrl={postData.imageUrl}
            />
            <FlatList
                data={morePosts}
                renderItem={ImageItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                contentContainerStyle={styles.imageGrid}
            />
        </View>
    );
};

export default PostView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    imageGrid: {
        padding: 10,
    },
    imageContainer: {
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
