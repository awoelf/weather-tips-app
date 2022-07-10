import { View, Text, StyleSheet } from "react-native";
import React from "react";

import { size, colors, fonts } from "../utils";

export default function Test() {
    return (
        <View style={styles.textContainer}>
            <Text style={styles.text}><Text style={styles.severityText}>Watch:</Text> "Freeze Warning issued October 16 at 2:17PM EDT until October 17 at 9:00AM EDT by NWS Wilmington OH"</Text>
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
