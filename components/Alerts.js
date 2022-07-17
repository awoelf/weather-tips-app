import { View, Text, StyleSheet } from "react-native";
import React from "react";

import { size, colors, fonts } from "../utils";

export default function Alerts({alert}) {
    const { alerts } = alert;
    if (alerts.length == 0){
        return null;
    } else {
        const { alerts: [{severity, title}] } = alert;
        return (
            <View style={styles.infoBox}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}><Text style={styles.severityText}>{severity}:</Text> {title}</Text>
                </View>
            </View>
            
        );
    }
    
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
    },
    infoBox: {
        backgroundColor: colors.BOX_BACKGROUND,
        paddingVertical: 20,
        marginHorizontal: 30,
        marginVertical: 4,
        borderRadius: 15,
        alignItems: 'stretch'
    },
})

