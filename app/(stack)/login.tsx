import CommonInput from '@/components/Common/CommonInput';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/context/auth';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useAuth()

    const router = useRouter()

    const handleLogin = async () => {
        const data = {
            id: 0,
            name: 'Franco',
            username,
            email: 'fran@gmail.com',
            password

        }

        await login(data)
        router.replace('/(tabs)/feed');
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.inner}>
                <Ionicons name="logo-instagram" size={150} color={Colors.black} style={styles.logo} />
                <CommonInput
                    placeholder="Usuario"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />
                <CommonInput
                    placeholder="Contraseña"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Iniciar sesión</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inner: {
        width: '80%',
        padding: 20,
        alignItems: 'center',
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 40,
    },
    button: {
        width: '100%',
        backgroundColor: Colors.black,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default LoginScreen;
