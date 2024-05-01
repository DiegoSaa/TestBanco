import React from "react";
import { Text } from "react-native";
import { styles } from "../styles";
import { View } from "react-native";

export const ProductEmptyResult = ({ text }: { text: string }) => (
    <View style={styles.itemContainer}>
        <Text style={styles.itemTextName}>{text}</Text>
    </View>
);