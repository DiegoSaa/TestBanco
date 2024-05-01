import React, { useState } from "react";
import { View, Text, FlatList, TextInput } from "react-native";
import { ScreenProps } from "../../navigation/navigationTypes";
import { NavigationRoutes } from "../../navigation/NavigationRoutes";
import useFinancialProducts from "../../hooks/useFinancialProducts";
import { styles } from "./styles";
import { renderItem } from "./components/render";
import { StyledButton } from "../../components/StyledButton";
import { ProductEmptyResult } from "./components/ProductEmptyResult";
import SkeletonLoader from "./components/SkeletonLoader";
import { COLORS } from "../../constants/colors";

const ProductListingScreen: React.FC<
    ScreenProps<NavigationRoutes.ProductListing>
> = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const { data: products, isLoading, error } = useFinancialProducts();

    const filteredProducts = React.useMemo(() => {
        return products?.filter(item =>
            item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.id?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [products, searchQuery]);

    const memoizedRenderItem = React.useCallback(
        ({ item }) => renderItem({ item, navigation }),
        [navigation]
    );

    const ListHeaderComponent = React.useMemo(() => (
        <View style={{ borderBottomWidth: 1, borderColor: COLORS.LIGTH_GREY_PICHINCHA }} />
    ), []);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    if (error) {
        return <Text>Error: {error.message}</Text>;
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder='Search...'
                value={searchQuery}
                onChangeText={handleSearch}
            />

            {isLoading ? (
                <SkeletonLoader />
            ) : (
                <FlatList
                    data={filteredProducts}
                    renderItem={memoizedRenderItem}
                    keyExtractor={(item) => item.id}
                    ListHeaderComponent={ListHeaderComponent}
                    ListEmptyComponent={<ProductEmptyResult text="No hay productos agregagos" />}
                    initialNumToRender={10}
                    maxToRenderPerBatch={5}
                    windowSize={5}
                />
            )}
            <View style={styles.addButton}>
                <StyledButton
                    onPress={() => navigation.navigate(NavigationRoutes.AddProduct)}
                    title='Agregar'
                />
            </View>
        </View>
    );
};

export default ProductListingScreen;