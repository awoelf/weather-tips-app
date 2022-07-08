import { View, Text, StyleSheet} from "react-native";
import React from "react";

import { size, fonts, colors } from "../utils";

export default function InfoBlock() {
  return (
    <View style={styles.containter}>
      <Text style={styles.text}>InfoBlock</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BLOCK_BACKGROUND,
        alignItems: 'center',
        borderWidth: 2
    },
    text: {
        fontSize: size.BODY,
        fontFamily: fonts.BODY,
        color: colors.FONT_COLOR,
        textAlign: 'center'
    }
})
