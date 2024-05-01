// Navigation
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "./navigationTypes";
import { NavigationRoutes } from "./NavigationRoutes";

// Screen components
import ProductListingScreen from "../../ui/screens/ProductListingScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import AddProductScreen from "../screens/AddProductScreen";
import EditProductScreen from "../screens/EditProductScreen";
import { Image, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../constants/colors";

const Stack = createStackNavigator<RootStackParamList>();

const HeaderTitleWithIcon = () => {
    return (
        <View style={styles.headerTitleContainer}>
            <Image source={require("../assets/icon.png")} style={styles.headerIcon} />
            <Text style={styles.headerTitleText}>BANCO PICHINCHA</Text>
        </View>
    );
};
const AppNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName={NavigationRoutes.ProductListing}
            screenOptions={{
                headerTitle: () => <HeaderTitleWithIcon />,
                headerBackTitle: "Volver",
            }}
        >
            <Stack.Screen
                name={NavigationRoutes.ProductListing}
                component={ProductListingScreen}
            />
            <Stack.Screen
                name={NavigationRoutes.ProductDetails}
                component={ProductDetailScreen}
            />
            <Stack.Screen
                name={NavigationRoutes.AddProduct}
                component={AddProductScreen}
            />
            <Stack.Screen
                name={NavigationRoutes.EditProduct}
                component={EditProductScreen}
            />
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    headerTitleContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    headerIcon: {
        width: 25,
        height: 25,
        resizeMode: "contain",
        marginRight: 10,
    },
    headerTitleText: {
        fontSize: 15,
        color: COLORS.BLUE_PICHINCHA,
        fontWeight: "800",
    },
});

export default AppNavigator;