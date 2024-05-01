import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { FinancialProduct } from "../../../../data/models/FinancialProductModel";
import { styles } from "../styles";
import { NavigationRoutes } from "../../../navigation/NavigationRoutes";
import { ScreenProps } from "../../../navigation/navigationTypes";

type RenderItemProps = {
    item: FinancialProduct;
    navigation: ScreenProps<NavigationRoutes.ProductListing>["navigation"];
};

export const renderItem = ({ item, navigation }: RenderItemProps) => (
    <Pressable
        style={({ pressed }) => [
            styles.itemContainer,
            { backgroundColor: pressed ? "#dddddd" : "transparent" },
        ]}
        onPress={() =>
            navigation.navigate(NavigationRoutes.ProductDetails, {
                productId: item.id,
            })
        }
    >
        <View style={styles.textContainer}>
            <Text style={styles.itemTextName}>{item.name}</Text>
            <Text style={styles.itemTextId}>{`ID: ${item.id}`}</Text>
        </View>
        <Image
            source={require("../../../assets/rightArrow.png")}
            style={styles.rigthIcon}
        />
    </Pressable>
);