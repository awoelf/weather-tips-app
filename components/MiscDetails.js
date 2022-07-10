import { View, Text } from "react-native";
import React from "react";

import { ICON_URL } from '@env';

export default function MiscDetails({weather}) {
    const { data: [{ uv, vis,  }]} = weather;
    return (
        <View>
        <Text>MiscDetails</Text>
        </View>
    );
}
