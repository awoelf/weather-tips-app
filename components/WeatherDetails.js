import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

import { colors, fonts, size } from "../utils";
import { ICON_URL } from '@env';

//TODO: format wind speed for metric and imperial

export default function WeatherDetails({weather}) {
    const { data: [{ wind_spd, app_temp, rh }]} = weather;
    const feelsLikeIcon = `${ICON_URL}feels-like.png`;
    const humidityIcon = `${ICON_URL}humidity.png`;
    const windIcon = `${ICON_URL}windspeed.png`;

    return (
        <View style={styles.rowContainer}>
            <View style={styles.itemContainer}>
                <Image style={styles.icon} source={{uri: feelsLikeIcon}} /> 
                <Text style={styles.itemText}>Feels Like</Text>
                <Text style={styles.itemText}>{app_temp}°</Text>
            </View>
            <View style={styles.itemContainer}>
                <Image style={styles.icon} source={{uri: humidityIcon}} /> 
                <Text style={styles.itemText}>Humidity</Text>
                <Text style={styles.itemText}>{rh}%</Text>
            </View>  
            <View style={styles.itemContainer}>
                <Image style={styles.icon} source={{uri: windIcon}} /> 
                <Text style={styles.itemText}>Wind Speed</Text>
                <Text style={styles.itemText}>{wind_spd} mph</Text>
            </View>       
        </View>
    );
}

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemContainer: {
        marginHorizontal: 10,
        alignItems: 'center'
    },
    itemText: {
        fontSize: size.BODY,
        fontFamily: fonts.BODY,
        color: colors.FONT_COLOR
    },
    icon: {
        width: 30,
        height: 30,
        resizeMode: 'center'
    }
})