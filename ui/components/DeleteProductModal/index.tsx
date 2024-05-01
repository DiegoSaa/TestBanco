import React, { useEffect, useRef } from "react";
import { View, Text, Modal, Image, Pressable, Animated } from "react-native";
import { ScreenProps } from "../../navigation/navigationTypes";
import { NavigationRoutes } from "../../navigation/NavigationRoutes";
import useDeleteFinancialProduct from "../../hooks/useDeleteFinantialProduct";
import { styles } from "./styles";
import { StyledButton } from "../StyledButton";
import { COLORS } from "../../constants/colors";

interface DeleteProductModalProps {
    productId: string;
    productName: string;
    visible: boolean;
    setVisible: (visible: boolean) => void;
    navigation: ScreenProps<NavigationRoutes.ProductDetails>["navigation"];
}

const DeleteProductModal = ({
    productId,
    productName,
    visible,
    setVisible,
    navigation,
}: DeleteProductModalProps) => {
    const { mutate: deleteProduct } = useDeleteFinancialProduct();
    const animation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            Animated.timing(animation, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(animation, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [visible, animation]);

    const onConfirm = () => {
        setVisible(false);
        navigation.navigate(NavigationRoutes.ProductListing);
        deleteProduct(productId);
    };

    const onCancel = () => {
        setVisible(false);
    };

    const containerStyle = {
        ...styles.modalContent,
        transform: [
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [600, 0],
                }),
            },
        ],
    };

    return (
        <Modal visible={visible} transparent>
            <Pressable onPress={onCancel} style={styles.modalBackground}>
                <Animated.View
                    style={containerStyle}
                    onStartShouldSetResponder={() => true}
                >
                    <View style={styles.headerContainer}>
                        <Pressable onPress={onCancel} style={styles.closeButton}>
                            <Image
                                source={require("../../assets/close.png")}
                                style={styles.closeIcon}
                            />
                        </Pressable>
                    </View>
                    <View style={styles.generalContainer}>
                        <View style={styles.bodyContainer}>
                            <Text style={styles.textContainer}>
                                Estás seguro de eliminar el producto {productName?.trim()}?
                            </Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <StyledButton onPress={onConfirm} title='Confirmar' />
                        </View>
                        <View style={styles.buttonContainer}>
                            <StyledButton
                                onPress={onCancel}
                                title='Cancelar'
                                backgroundColor={COLORS.LIGTH_BLUE_PICHINCHA}
                            />
                        </View>
                    </View>
                </Animated.View>
            </Pressable>
        </Modal>
    );
};

export default DeleteProductModal;