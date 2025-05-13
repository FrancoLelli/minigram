import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type ButtonCardProps = {
    icon: string,
    iconPressed: string,
    color: string,
    colorPressed: string
}

const ButtonCard: React.FC<ButtonCardProps> = ({icon, iconPressed, color, colorPressed}) => {
    const [pressed, setPressed] = useState(false);

    return (
        <TouchableOpacity onPress={() => setPressed(!pressed)} style={styles.button}>
            <Text style={[styles.text, pressed && styles.pressed]}>
                {pressed ? <Ionicons name={iconPressed} size={30} color={color} /> :
                    <Ionicons name={icon} size={30} color={colorPressed} />}
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
        marginRight: 10,
    },
    pressed: {
        fontWeight: 'bold',
    },
});

export default ButtonCard;
