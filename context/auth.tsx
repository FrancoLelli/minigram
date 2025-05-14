import { User } from '@/types/models';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface AuthContextType {
    user: User | null;
    login: (userData: User) => Promise<void>;
    logout: () => Promise<void>;
    isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    login: async () => { },
    logout: async () => { },
    isLoading: true
});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const loadUser = async () => {
        try {
            const userData = await AsyncStorage.getItem('user');
            if (userData) {
                setUser(JSON.parse(userData));
            }
        } catch (e) {
            console.error('Error al cargar datos de usuario', e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    const login = async (userData: User) => {
        try {
            await AsyncStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
        } catch (e) {
            console.error('Error al guardar datos de usuario', e);
        }
    };

    const logout = async () => {
        try {
            const userData = await AsyncStorage.getItem('user');
            console.log('Datos del user: ',userData);
            
            await AsyncStorage.removeItem('user');
            setUser(null);
        } catch (e) {
            console.error('Error al borrar datos de usuario', e);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
