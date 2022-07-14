import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { colors, size, fonts } from '../utils';

export default function ChangeUnits({unitSystem, setUnitSystem}) {
    return (
        <View>
            <Pressable  style={({ pressed }) => [
                {
                    backgroundColor: pressed
                    ? colors.BLUE
                    : colors.DARK_BLUE
                },
                styles.buttonBox
            ]}
            onPress={() => 
                {(unitSystem == 'I')
                ? setUnitSystem('M')
                : setUnitSystem('I')}}
                >
                {unitSystem == 'M' &&
                    <View>
                        <Text><MaterialCommunityIcons name="temperature-celsius" size={size.BUTTON} color={colors.FONT_COLOR} /></Text>
                    </View>
                }
                {unitSystem == 'I' &&
                    <View>
                        <Text><MaterialCommunityIcons name="temperature-fahrenheit" size={size.BUTTON} color={colors.FONT_COLOR} /></Text>
                    </View>
                }
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    itemText: {
        fontSize: size.BODY,
        fontFamily: fonts.BOLD,
        color: colors.FONT_COLOR,
        
    },
    buttonBox: {
        paddingVertical: 10,
        borderRadius: 25,
        alignItems: 'center',
    }
})
