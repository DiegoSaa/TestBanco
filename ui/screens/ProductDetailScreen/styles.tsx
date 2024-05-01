import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "white",
    },
    id: {
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    detailRow: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginBottom: 10,
    },
    detailLabel: {
        color: "grey",
        fontWeight: "bold",
        width: "40%",
        paddingRight: 10,
    },
    detailValueContainer: {
        width: "70%",
    },
    detailValue: {
        flexShrink: 1,

        fontWeight: "bold",
    },
    extraInfo: {
        marginBottom: 50,
    },
    cardContainer: {
        paddingHorizontal: 20,
        marginBottom: 40,
    },
    logoContainer: {
        width: 200,
        height: 150,
        resizeMode: "contain",
        alignSelf: "flex-end",
    },
    buttonContainer: {
        marginBottom: 15,
    },
});