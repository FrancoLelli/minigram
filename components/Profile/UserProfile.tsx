// components/User/UserProfileView.tsx

import { UserPost } from '@/types/models';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const screenWidth = Dimensions.get('window').width;

type Props = {
    username: string;
    avatarId: number;
    userImages: UserPost[];
};

const UserProfile: React.FC<Props> = ({ username, avatarId, userImages }) => {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={{ uri: `https://i.pravatar.cc/150?u=${avatarId}` }}
                    style={styles.avatar}
                />
                <View style={styles.userInfo}>
                    <Text style={styles.username}>{username}</Text>
                    <Text style={styles.posts}>{userImages.length} publicaciones</Text>
                </View>
            </View>

            <FlatList
                data={userImages}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                contentContainerStyle={styles.imageGrid}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => router.push(`/post?id=${item.id}`)}>
                        <Image
                            source={{ uri: `https://picsum.photos/seed/${item.id}/900/500` }}
                            style={styles.image}
                        />
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default UserProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        padding: 20,
        borderBottomWidth: 1,
        borderColor: '#eee',
        alignItems: 'center',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    userInfo: {
        marginLeft: 20,
    },
    username: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    posts: {
        marginTop: 4,
        fontSize: 14,
        color: '#666',
    },
    imageGrid: {
        paddingBottom: 10,
    },
    image: {
        width: screenWidth / 3,
        height: screenWidth / 3,
    },
});
