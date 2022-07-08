import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { colors, fonts, size } from "../utils";


export default function Header({weather}) {
    const { data: [{temp, city_name, weather: {description, icon}}]} = weather;
    const weatherIcon = `https://res.cloudinary.com/awoelf/image/upload/v1657217332/${icon}.png`;
    return (
      <View style={styles.container}>
          <View style={{left: 40}}>
            <Text style={styles.temperature}>{temp}°</Text>
            <View style={styles.weatherDetails}>
              <Text style={styles.city}>{city_name}</Text>
              <Text style={styles.description}>{description}</Text>
            </View>
          </View>
          <View>
            <Image style={styles.weatherIcon} source={{uri: weatherIcon}} />
          </View>
      </View>
  );
};

const styles = StyleSheet.create({
  
  container: {
    paddingTop: 30,
    alignItems: 'center',
    flexDirection: 'row',
  },
  temperature: {
    fontSize: size.HEADER,
    fontFamily: fonts.HEADER,
    color: colors.FONT_COLOR
  },
  city: {
    fontSize: size.HEADER2,
    fontFamily: fonts.HEADER,
    color: colors.FONT_COLOR
  },
  description: {
    fontSize: size.BODY,
    fontFamily: fonts.HEADER,
    color: colors.FONT_COLOR
  },
  weatherIcon: {
    width: 100,
    height: 100,
    left: 80
  },
  weatherDetails: {
    top: -20
  }
})
