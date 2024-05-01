import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";

const SkeletonLoader = () => {
    const animation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(animation, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(animation, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [animation]);

    return (
        <View style={styles.loaderContainer}>
            {[...Array(5)].map((_, index) => (
                <Animated.View
                    key={index}
                    style={[styles.skeletonItem, { opacity: animation }]}
                >
                    <View style={styles.skeletonText} />
                </Animated.View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    loaderContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 5,
    },
    skeletonItem: {
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        paddingTop: 1,
        width: "100%",
    },
    skeletonText: {
        height: 60,
        width: "100%",
        backgroundColor: "#e1e1e1",
    },
});

export default SkeletonLoader;