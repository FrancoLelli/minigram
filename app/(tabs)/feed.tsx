// app/feed.tsx
import { getPhotos, getPosts, getUsers } from '@/services/api';
import { UserPost } from '@/types/models';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';

import PostCard from '@/components/PostCard';

const FeedScreen = () => {
    const [data, setData] = useState<UserPost[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const getData = async () => {
        try {
            const photos = await getPhotos();
            const posts = await getPosts();
            const users = await getUsers();

            const userPost: UserPost[] = posts.slice(0, 30).map((post, i) => ({
                id: post.id,
                title: post.title,
                imageUrl: photos[i]?.url,
                username: users.find((u) => u.id === post.userId)?.username || 'Anonimo',
            }));
            
            setData(userPost);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" />;
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
