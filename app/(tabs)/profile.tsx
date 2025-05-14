// app/profile.tsx
import { useAuth } from '@/context/auth';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const ProfileScreen = () => {
    const { user, logout } = useAuth()
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.replace('/(stack)/login');
        }
    }, [user]);

    if (!user) return <ActivityIndicator color={Colors.black} size="large" style={{ flex: 1 }} />;


    return (
        <SafeAreaView style={{ flex: 1, marginTop: 20 }}>
            <View style={styles.container}>
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.username}>@{user.username}</Text>
                <Text style={styles.email}>{user.email}</Text>
            </View>
            <TouchableOpacity onPress={logout}>
                <Text>Cerrar sesion</Text>
            </TouchableOpacity>
        </SafeAreaView>
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
