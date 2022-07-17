import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import React from "react";
import moment from "moment";

import { colors, fonts, size } from "../utils";
import { ICON_URL } from '@env';

export default function Forecast({forecast}) {
    let forecastDay = '';
    let forecastWeek = [];

    Object.entries(forecast.data).forEach((value, index) => {
        if (index > 1) {
            let weatherIcon = `${ICON_URL}${forecast.data[index].weather.icon}.png`;
            let dayName = moment(forecast.data[index].valid_date).format('ddd');
            let tempDay = `\t${forecast.data[index].temp}°`
            if (index == 2) {
                forecastDay = 
                <View key={forecast.data[index].valid_date} style={styles.containerCol}>
                    <Image  style={styles.weatherIcon} source={{uri: weatherIcon}} />
                    <Text  style={styles.itemText}>{dayName}</Text>
                    <Text  style={styles.itemText}>{tempDay}</Text>
                </View>
            } else {
                forecastDay = 
                <View key={forecast.data[index].valid_date} style={{...styles.containerCol, borderLeftWidth: 2, borderLeftColor: colors.BOX_BACKGROUND}}>
                    <Image  style={styles.weatherIcon} source={{uri: weatherIcon}} />
                    <Text  style={styles.itemText}>{dayName}</Text>
                    <Text  style={styles.itemText}>{tempDay}</Text>
                </View>
            }
            
            forecastWeek.push(forecastDay);
        }
        
    })

    return (
        <View>
            <Text style={{...styles.itemText, marginBottom: 10, fontFamily: fonts.BOLD}}>7-Day Forecast</Text>
            <ScrollView horizontal={true} >
                <View style={styles.rowContainer}><Text>{forecastWeek}</Text></View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 2,
        flexWrap: 'nowrap',
    },
    itemContainer: {
        alignItems: 'center',
    },
    itemText: {
        fontSize: size.BODY,
        fontFamily: fonts.BODY,
        color: colors.FONT_COLOR,
        textAlign: 'center'
    },
    containerCol: {
        flexDirection: 'column',
        paddingHorizontal: 8,
        alignItems: 'center',
        alignContent: 'center'
    },
    weatherIcon: {
        width: 30,
        height: 30,
        resizeMode: 'center',
      },
})