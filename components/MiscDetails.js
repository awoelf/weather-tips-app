import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

import { colors, fonts, size } from "../utils";
import { ICON_URL } from '@env';

export default function MiscDetails({weather}) {
    const { data: [{ pres, aqi, uv, vis }]} = weather;
    const pressureIcon = `${ICON_URL}pressure.png`;
    const airQualityIcon = `${ICON_URL}air-quality.png`;
    const uvIcon = `${ICON_URL}UV.png`;
    const visibilityIcon = `${ICON_URL}visibility.png`;


    return (
        <View style={styles.containerCol}>
            <View style={{...styles.itemContainer, 
                borderBottomColor: colors.BOX_BACKGROUND,
                borderBottomWidth: 2}}>
                <View style={styles.labelContainer}>
                    <Image style={styles.icon} source={{uri: pressureIcon}} />
                    <Text style={styles.itemText}>Pressure</Text>
                </View>
                <Text style={{...styles.itemText}}>{pres} mb</Text>
            </View>
            <View style={{...styles.itemContainer, 
                borderBottomColor: colors.BOX_BACKGROUND,
                borderBottomWidth: 2}}>
                <View style={styles.labelContainer}>
                    <Image style={styles.icon} source={{uri: airQualityIcon}} />
                    <Text style={styles.itemText}>Air Quality</Text>
                </View>
                <Text style={{...styles.itemText}}>{aqi}</Text>
            </View>
            <View style={{...styles.itemContainer, 
                borderBottomColor: colors.BOX_BACKGROUND,
                borderBottomWidth: 2}}>
                <View style={styles.labelContainer}>
                    <Image style={styles.icon} source={{uri: uvIcon}} />
                    <Text style={styles.itemText}>UV Index</Text>
                </View>
                <Text style={{...styles.itemText}}>{uv}</Text>
            </View>
            <View style={styles.itemContainer}>
            <View style={styles.labelContainer}>
                    <Image style={styles.icon} source={{uri: visibilityIcon}} />
                    <Text style={styles.itemText}>Visibility</Text>
                </View>
                <Text style={{...styles.itemText}}>{vis} mi</Text>
            </View>
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