import { View, Text, StyleSheet} from "react-native";
import React from "react";

import { size, fonts, colors } from "../utils";

export default function InfoBlock() {
  return (
    <Text style={styles.text}>InfoBlock</Text>
  );
}

const styles = StyleSheet.create({
    text: {
        fontSize: size.BODY,
        fontFamily: fonts.BODY,
        color: colors.FONT_COLOR,
        textAlign: 'center'
    }
})
