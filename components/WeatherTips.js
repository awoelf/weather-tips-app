import { View, Text, StyleSheet } from "react-native";
import React from "react";

import { colors, fonts, size } from "../utils";

export default function WeatherTips({weather}) {
    const { data: [{  weather: { code } }]} = weather;
    const weatherCodes = require('../utils/weatherCodes.json');
    return (
        <View>
        <Text style={styles.itemText}>{weatherCodes.code}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    containerCol: {
        flexDirection: 'column',
        paddingHorizontal: 20,
    },
    itemContainer: {
        marginVertical: 3,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
    },
    itemText: {
        fontSize: size.BODY,
        fontFamily: fonts.BODY,
        color: colors.FONT_COLOR,
        marginHorizontal: 15
    },
    icon: {
        width: 30,
        height: 30,
        resizeMode: 'center'
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})