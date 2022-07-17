import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

import { colors, fonts, size } from "../utils";
import { ICON_URL } from '@env';

//TODO: format wind speed for metric and imperial

export default function WeatherDetails({weather, unitSystem}) {
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
            <View style={{...styles.itemContainer,
                borderColor: colors.BOX_BACKGROUND,
                borderRightWidth: 2,
                borderLeftWidth: 2}}>
                <View style={{...styles.itemContainer, marginHorizontal: 7}}>
                    <Image style={styles.icon} source={{uri: humidityIcon}} />
                    <Text style={styles.itemText}>Humidity</Text>
                    <Text style={styles.itemText}>{rh}%</Text>
                </View>
            </View> 
            <View style={styles.itemContainer}>
                <Image style={styles.icon} source={{uri: windIcon}} /> 
                <Text style={styles.itemText}>Wind Speed</Text>
                {unitSystem == 'I' ?
                <Text style={styles.itemText}>{wind_spd} mph</Text> :
                <Text style={styles.itemText}>{wind_spd} km/h</Text>
                }
                
            </View>       
        </View>
    );
}

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20
    },
    itemContainer: {
        alignItems: 'center',
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