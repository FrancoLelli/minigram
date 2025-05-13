import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const LikeButton = () => {
    const [liked, setLiked] = useState(false);

    return (
        <TouchableOpacity onPress={() => setLiked(!liked)} style={styles.button}>
            <Text style={[styles.text, liked && styles.liked]}>
                {liked ? <Ionicons name="heart" size={30} color="red" /> :
                    <Ionicons name="heart-outline" size={30} color="black" />}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        marginTop: 10,
    },
    text: {
        fontSize: 16,
        color: '#444',
        marginRight: 10,
    },
    liked: {
        color: '#e91e63',
        fontWeight: 'bold',
    },
});

export default LikeButton;
