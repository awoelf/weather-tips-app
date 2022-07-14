import { View, Text, StyleSheet, ScrollView, Pressable, Linking } from "react-native";
import React from "react";
import { Feather } from '@expo/vector-icons';

// import weatherCodes from '../utils/weatherCodes2.js';
import weatherCodes from '../utils/weatherCodes.json'
import { colors, fonts, size } from "../utils";


export default function WeatherTips({weather}) {
    const { data: [{  weather: { code, description } }]} = weather;
        
    return (
        <View style={styles.itemContainer}>
            <Text style={styles.header}>Weather Tips for {description}</Text>
            <ScrollView style={{marginTop: 10}}>
                {weatherCodes[200].map(x => 
                    <View 
                    style={{
                        flexDirection: 'row', 
                        alignItems: 'center', 
                        borderBottomColor: colors.BOX_BACKGROUND,
                        borderBottomWidth: 2}}>
                        <Feather name="check-circle" size={size.BODY} color={colors.FONT_COLOR} />
                        <View style={{marginLeft: 5, marginVertical: 2}}>
                            <Text style={styles.itemText}>{x}</Text>
                        </View>
                    </View>
                )}                   
            </ScrollView>
            <Pressable  style={({ pressed }) => [
                {
                    backgroundColor: pressed
                    ? colors.BLUE
                    : colors.DARK_BLUE
                },
                styles.buttonBox
            ]}
            onPress={() => Linking.openURL('https://www.cdc.gov/disasters/index.html')}>
                    <View>
                        <Text style={{...styles.itemText, fontFamily: fonts.BOLD}}>Learn More at cdc.gov <Feather name="external-link" size={size.BODY} color={colors.FONT_COLOR} /></Text>
                    </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        marginHorizontal: 20
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
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    header: {
        fontSize: size.BODY,
        fontFamily: fonts.BOLD,
        color: colors.YELLOW,
        alignSelf: 'center',
        textAlign: 'center'
    },
    buttonBox: {
        paddingVertical: 10,
        marginTop: 10,
        borderRadius: 15,
        alignItems: 'center'
    }
})