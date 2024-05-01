import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 20,
        backgroundColor: "white",
    },
    searchBar: {
        marginBottom: 10,
        paddingHorizontal: 10,
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
    },
    itemContainer: {
        padding: 10,
        borderWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderColor: COLORS.LIGTH_GREY_PICHINCHA,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    textContainer: {
        flexDirection: "column",
    },
    itemTextName: {
        fontSize: 18,
        fontWeight: "600",
    },
    itemTextId: {
        fontSize: 16,
    },
    addButton: {
        marginBottom: 40,
    },
    rigthIcon: {
        width: 20,
        height: 20,
        resizeMode: "contain",
    },
});