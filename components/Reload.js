import { View, Text, StyleSheet } from "react-native";
import React from "react";

import { colors, size, fonts } from '../utils';
import { Feather } from '@expo/vector-icons';

export default function Reload({load}) {
    return (
        <View style={styles.buttonBox}>
            <Feather onPress={load} name="refresh-cw" size={size.BUTTON} color={colors.FONT_COLOR} />
        </View>
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
        alignItems: 'center',
    }
})