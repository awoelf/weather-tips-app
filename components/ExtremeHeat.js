import { View, Text, StyleSheet, Pressable, Linking } from "react-native";
import React from "react";
import { Feather } from '@expo/vector-icons';

import { colors, fonts, size } from "../utils";

export default function ExtremeHeat({weather, unitSystem}) {
    const extremeHeat = [
        "Wear lightweight, light-colored, loose-fitting clothing.",
        "Stay in an air-conditioned place as much as possible.",
        "Limit outdoor activities to when it's coolest, like morning and evening.",
        "Stop all activity if you become lightheaded, confused, weak, or faint.",
        "Wear sunscreen.",
        "Stay hydrated."
    ]

    const { data: [{temp}]} = weather;
    let showHeat = false;

    if (unitSystem == 'I') {
        if (temp > 70) {
            showHeat = true;
        }
    } else {
        if (temp > 20) {
            showHeat = true;
        }
    }
    if (showHeat) {
        return (
            <View style={styles.infoBox}>
                <View style={styles.itemContainer}>
                    <Text style={styles.header}>Weather Tips for Extreme Heat</Text>
                    <View style={{marginTop: 10}}>
                        {extremeHeat.map(tip => 
                        <View 
                        key={tip}
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
                    </View>
                    <Pressable  style={({ pressed }) => [
                        {
                            backgroundColor: pressed
                            ? colors.DARK_BLUE
                            : colors.BLUE
                        },
                        styles.buttonBox
                    ]}
                    onPress={() => Linking.openURL('https://www.cdc.gov/nceh/features/extremeheat/index.html')}>
                            <View>
                                <Text style={{...styles.itemText, fontFamily: fonts.BOLD, textAlign: 'center'}}>Learn How to Stay Cool at cdc.gov <Feather name="external-link" size={size.BODY} color={colors.FONT_COLOR} /></Text>
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