import { Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants/colors";

type StyledButtonType = {
    onPress: () => void;
    title: string;
    backgroundColor?: string;
    fontColor?: string;
};

export const StyledButton = ({ onPress, title, backgroundColor, fontColor }: StyledButtonType) => (
    <View
        style={[
            styles.container,
            {
                backgroundColor: backgroundColor ?? COLORS.YELLOW_PICHINCHA,
            },
        ]}
    >
        <Pressable style={styles.addButton} onPress={onPress}>
            <Text style={[styles.addButtonText, { color: fontColor ?? COLORS.BLUE_PICHINCHA }]}>{title}</Text>
        </Pressable>
    </View>
);

const styles = StyleSheet.create({
    container: {},
    addButton: {
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
        borderWidth: 0,
    },
    addButtonText: {
        fontSize: 16,
        fontWeight: "bold",
    },
});