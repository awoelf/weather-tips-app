import { View, Text, StyleSheet, ScrollView, Pressable, Linking } from "react-native";
import React from "react";
import { Feather } from '@expo/vector-icons';

import weatherCodes from '../utils/weatherCodes.json'
import { colors, fonts, size } from "../utils";


export default function WeatherTips({weather, setTipsLoaded}) {
    const { data: [{  weather: { code, description } }]} = weather;
    
    if (weatherCodes[code] !== null){
        return (
            <View style={styles.infoBox}>
                <View style={styles.itemContainer}>
                    <Text style={styles.header}>Weather Tips for {description}</Text>
                    <ScrollView style={{marginTop: 10}}>
                        {weatherCodes[code].map(tip => 
                            <View 
                            key={code + tip}
                            style={{
                                flexDirection: 'row', 
                                alignItems: 'center', 
                                borderBottomColor: colors.BOX_BACKGROUND,
                                borderBottomWidth: 2}}>
                                <Feather name="check-circle" size={size.BODY} color={colors.FONT_COLOR} />
                                <View style={{marginLeft: 5, marginVertical: 2}}>
                                    <Text style={styles.itemText}>{tip}</Text>
                                </View>
                            </View>                   
                        )}                   
                    </ScrollView>
                    <Pressable  style={({ pressed }) => [
                        {
                            backgroundColor: pressed
                            ? colors.DARK_BLUE
                            : colors.BLUE
                        },
                        styles.buttonBox
                    ]}
                    onPress={() => Linking.openURL('https://www.cdc.gov/disasters/index.html')}>
                            <View>
                                <Text style={{...styles.itemText, fontFamily: fonts.BOLD}}>Learn More at cdc.gov <Feather name="external-link" size={size.BODY} color={colors.FONT_COLOR} /></Text>
                            </View>
                    </Pressable>
                </View>
            </View>
            
        );
    } else {
        return null;
    }
    
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