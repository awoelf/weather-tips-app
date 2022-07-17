import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";

import { colors, size, fonts } from '../utils';
import { Feather } from '@expo/vector-icons';

export default function Reload({load}) {
    return (
        <Pressable style={({ pressed }) => [
            {
                backgroundColor: pressed
                ? colors.DARK_BLUE
                : colors.BLUE
            },
            styles.buttonBox]}
        >
            <Feather onPress={load} name="refresh-cw" size={size.BUTTON} color={colors.FONT_COLOR} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    itemText: {
        fontSize: size.BODY,
        fontFamily: fonts.BOLD,
        color: colors.FONT_COLOR,
        
    },
    buttonBox: {
        paddingVertical: 10,
        borderRadius: 25,
        alignItems: 'center'
    }
})