import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const SendButton = () => {
    const [sended, setSended] = useState(false);

    return (
        <TouchableOpacity onPress={() => setSended(!sended)} style={styles.button}>
            <Text style={[styles.text, sended && styles.sended]}>
                {sended ? <Ionicons name="send" size={30} color="red" /> :
                    <Ionicons name="send-outline" size={30} color="black" />}
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
    sended: {
        color: '#e91e63',
        fontWeight: 'bold',
    },
});

export default SendButton;
