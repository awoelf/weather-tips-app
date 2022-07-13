import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";

import { size, colors, fonts } from "../utils";

export default function Alerts({alert}) {
    const { alerts: [{ severity, title }] } = alert;
    return (
        <View style={styles.textContainer}>
            <Text style={styles.text}><Text style={styles.severityText}>{severity}:</Text> {title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    textContainer: {
        alignItems: 'center',
   },
    text: {
        fontSize: size.BODY,
        fontFamily: fonts.BODY,
        color: colors.FONT_COLOR,
        textAlign: 'center',
        paddingHorizontal: 20
    },
    severityText: {
        color: colors.YELLOW,
        fontFamily: fonts.BOLD
    }
})

