import { View, Text, StyleSheet } from "react-native";
import React from "react";

import { size, colors, fonts } from "../utils";
import { WEATHER_ALERT_URL2 } from '@env';

export default function Alerts({alert, longitude, latitude}) {
    const { severity, title } = alert;
    const alertUrl = `${WEATHER_ALERT_URL2}point=${longitude},${latitude}`

    return (
        <View style={styles.textContainer}>
            <Text style={styles.text}><Text style={styles.severityText}>{severity}:</Text> {title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    textContainer: {
        marginHorizontal: 30,
        alignItems: 'center',
        width: 300
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

