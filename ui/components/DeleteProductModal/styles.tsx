import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    headerContainer: {
        alignSelf: "stretch",
        borderBottomWidth: 1,
        borderColor: COLORS.LIGTH_GREY_PICHINCHA,
        padding: 15,
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    modalContent: {
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: "100%",
        maxHeight: "40%",
    },
    generalContainer: {
        paddingVertical: 15,
    },
    bodyContainer: {
        paddingVertical: 15,
        margin: 10,
    },
    textContainer: {},
    buttonContainer: {
        margin: 10,
    },
    closeIcon: {
        width: 25,
        height: 25,
        resizeMode: "contain",
    },
    closeButton: {
        margin: 5,
    },
});