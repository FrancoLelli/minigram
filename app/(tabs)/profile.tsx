// app/profile.tsx
import UserProfile from '@/components/Profile/UserProfile';
import { useAuth } from '@/context/auth';
import { UserPost } from '@/types/models';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const ProfileScreen = () => {
    const { user, logout } = useAuth()
    const router = useRouter();

    const [images, setImages] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const getImagesUserLoged = async () => {
        try {
            const data= await AsyncStorage.getItem('data');
            const posts = data ? JSON.parse(data).filter((post: UserPost) => post.userId === user?.id) : [];
            setImages(posts);
        } catch (error) {
            console.error('Error al recuperar las imaganes del usuario logeado:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getImagesUserLoged()
    }, [])

    useEffect(() => {
        if (!user) {
            router.replace('/(stack)/login');
        }
    }, [user]);

    if (!user || loading) return <ActivityIndicator color={Colors.black} size="large" style={{ flex: 1 }} />;

    return (
        <SafeAreaView style={{ flex: 1, marginTop: 20 }}>
            <UserProfile username={user.username} avatarId={user.id} userImages={images} userLoged/>
        </SafeAreaView>
    );
};


export default ProfileScreen;
