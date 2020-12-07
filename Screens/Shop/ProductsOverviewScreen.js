import React, { useState, useCallback, useEffect } from 'react';
import {
    FlatList,
    View,
    Text,
    Button,
    StyleSheet,
    ActivityIndicator
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../Components/Shop/ProductItem';
import * as CartActions from '../../Store/Actions/CartAction';
import * as ProductActions from '../../Store/Actions/ProductAction'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import customHeaderButton from '../../Components/UI/HeaderButton';
import Colors from '../../Constants/Colors';

const ProductsOverviewScreen = props => {

    const[error, setError] = useState();
    const[isLoading, setIsLoading] = useState(false);
    const[isRefreshing, setIsRefreshing] = useState(false);

    const products = useSelector(state => state.product.availableProducts);
    const dispatch = useDispatch();

    const viewDetails = (id, title) => {
        props.navigation.navigate({
            routeName: 'ProductDetails',
            params: {
                productID: id,
                productTitle: title
            }
        })
    };

    const loadProducts = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            await dispatch(ProductActions.fetchProducts());
        } catch(error) {
            setError(error.message);
        }
        setIsRefreshing(false);
    }, [dispatch, setError, setIsLoading]);

    useEffect(() => {
        const willFocusSubscription = props.navigation.addListener('willFocus', loadProducts);

        return () => {
            willFocusSubscription.remove();
        }
    }, [loadProducts]);

    useEffect(() => {
        setIsLoading(true);
        loadProducts().then(() => {
            setIsLoading(false);
        });
    }, [loadProducts]);

    if(error) {
        return (
            <View style = {styles.centerLoader}>
                <Text style = {{color: 'grey'}}>An error occured!!</Text>
                <Button title = 'Try Again' color = {Colors.primaryColor} onPress = {loadProducts}/>
            </View>
        )
    }

    if(isLoading){
        return (
            <View style = {styles.centerLoader}>
                <ActivityIndicator size = 'large' color = {Colors.primaryColor}/>
            </View>
        )
    }

    if(!isLoading && products.length === 0){
        return (
            <View style = {styles.centerLoader}>
                <Text style = {{color: 'grey'}}>No products found! May be try adding some.</Text>
            </View>
        )
    }

    return <FlatList 
                keyExtractor = {item => item.id}
                onRefresh = {loadProducts}
                refreshing = {isLoading}
                data = {products}
                renderItem = {itemData => <ProductItem 
                    image = {itemData.item.imageUrl}
                    title = {itemData.item.title}
                    price = {itemData.item.price}
                    onSelect = {() => {
                       viewDetails(itemData.item.id, itemData.item.title)
                    }}
                >
                    <View style = {styles.buttonStyle}><Button color = 'darkorange' title = 'View Details' onPress = {() => {viewDetails(itemData.item.id, itemData.item.title)}}/></View>
                    <View style = {styles.buttonStyle}><Button color = 'orange' title = 'Add to Cart' onPress = {() => {
                        console.log("Item added is", typeof(itemData.item.price));
                        dispatch(CartActions.addToCart(itemData.item))}}/></View>
                </ProductItem>
                }
                contentContainerStyle={{ paddingBottom: 7 }}
          />
}

ProductsOverviewScreen.navigationOptions = navigationData => {
    return {
        headerTitle: 'All Products',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent = {customHeaderButton}>
                <Item 
                    title = "Menu"
                    iconName = "menu"
                    onPress = {() => {
                        navigationData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent = {customHeaderButton}>
                <Item 
                    title = "Cart"
                    iconName = "shopping-cart"
                    onPress = {() => {
                        navigationData.navigation.navigate({
                            routeName: 'Cart'
                        })
                    } }
                />
            </HeaderButtons>
        )
    }
};

const styles = StyleSheet.create({
    buttonStyle: {
        paddingBottom: 10,
        width: '50%',
    },

    centerLoader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ProductsOverviewScreen;