import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import PostCard from '@/components/Card/PostCard';
import { Colors } from '@/constants/Colors';
import { UserPost } from '@/types/models';

const PostView = () => {
    const { id } = useLocalSearchParams();
    const [loading, setLoading] = useState(true);
    const [postData, setPostData] = useState<UserPost>({
        id: 0,
        username: 'Franco',
        title: 'Esto es un post',
        imageUrl: '',
        userId: 0
    });

    const getPostData = async () => {
        try {
            const cacheData: any = await AsyncStorage.getItem('data');
            const cachePost = JSON.parse(cacheData).find((userPost: UserPost) => userPost.id === Number(id));
            setPostData(cachePost);
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

    return (
        <View style={{ flex: 1 }}>
            <PostCard
                id={postData.id}
                username={postData.username}
                title={postData.title}
                imageUrl={postData.imageUrl}
                userId={postData.userId}
                fullPost
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
