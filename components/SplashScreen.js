import { View, Text, StyleSheet } from "react-native";
import React from "react";

import { colors, fonts, size } from "../utils";
import { ICON_URL } from '@env';

export default function SplashScreen() {
    const logo = `${ICON_URL}logo.png`;
    return (
        <View>
        <Text>Weather Tips</Text>
        <Image style={styles.image} source={{uri: logo}} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    text: {
        fontSize: size.HEADER,
        fontFamily: fonts.HEADER,
        color: colors.FONT_COLOR
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'center'
    }
})
