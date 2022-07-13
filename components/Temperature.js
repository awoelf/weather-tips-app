import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";

import { colors, fonts, size } from "../utils";
import { ICON_URL } from '@env'


export default function Temperature({weather}) {
    const { data: [{temp, city_name, weather: {description, icon}}]} = weather;
    const weatherIcon = `${ICON_URL}${icon}.png`;
    return (
      <View style={styles.container}>
        <View style={{marginLeft: 40}}>
          <AutoSizeText fontSize={size.HEADER} numberOfLines={1} mode={ResizeTextMode.max_lines} style={styles.temperature}>{temp}°</AutoSizeText>
          <View style={styles.detailContainer}>
            <Text style={{...styles.temperature, fontSize: size.HEADER2}}>{city_name}</Text>
            <Text style={{...styles.temperature, fontSize: size.BODY}}>{description}</Text>
          </View>
        </View>
        <View style={styles.iconLocation}>
            <Image style={styles.weatherIcon} source={{uri: weatherIcon}} /> 
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    flexShrink: 1,
  },
  temperature: {
    fontFamily: fonts.HEADER,
    color: colors.FONT_COLOR,
    width: 180
  },
  detailContainer: {
    top: -20, 
    width: 150, 
    flexWrap: 'wrap', 
    flexDirection: 'row'
  },
  weatherIcon: {
    width: 100,
    height: 100,
    resizeMode: 'center'
  },
  iconLocation: {
    position: 'absolute', 
    left: 220, 
    bottom: 40,
  }
});
