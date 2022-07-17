import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Feather } from '@expo/vector-icons';

import { colors, fonts, size } from "../utils";

export default function MenuButton({collapsed, setCollapsed}) {
  return (
    <Pressable style={({ pressed }) => [
        {
            backgroundColor: pressed
            ? colors.DARK_BLUE
            : colors.BLUE
        },
        styles.buttonBox
    ]}
    onPress={() => 
    {(collapsed == true)
    ? setCollapsed(false)
    : setCollapsed(true)}}
        >
        {collapsed ?
        <Feather name="chevron-down" size={size.BUTTON} color={colors.FONT_COLOR} />:
        <Feather name="chevron-up" size={size.BUTTON} color={colors.FONT_COLOR} />}
      </Pressable>
  );
}

const styles = StyleSheet.create({
    buttonBox: {
        paddingVertical: 10,
        marginTop: 10,
        borderRadius: 25,
        alignItems: 'center'
    }
})
