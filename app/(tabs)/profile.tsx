// app/profile.tsx
import { getUsers } from '@/services/api';
import { User } from '@/types/models';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ProfileScreen = () => {
    const { userId } = useLocalSearchParams();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const loadUser = async () => {
            const users = await getUsers();
            const found = users.find((u) => u.id === Number(userId));
            setUser(found || null);
        };

        if (userId) {
            loadUser();
        }
    }, [userId]);

    if (!user) return <Text style={styles.loading}>Cargando perfil...</Text>;

    return (
        <View style={styles.container}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.username}>@{user.username}</Text>
            <Text style={styles.email}>{user.email}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20 },
    name: { fontSize: 24, fontWeight: 'bold', marginBottom: 5 },
    username: { fontSize: 18, color: '#555' },
    email: { fontSize: 16, color: '#888', marginTop: 10 },
    loading: { padding: 20, textAlign: 'center' },
});

export default ProfileScreen;
