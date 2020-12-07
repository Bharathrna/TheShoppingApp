import React, { useState, useEffect, useCallback } from 'react';
import {
    FlatList,
    View, 
    Button,
    StyleSheet,
    Alert,
    Text,
    ActivityIndicator
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../Components/Shop/ProductItem';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import customHeaderButton from '../../Components/UI/HeaderButton';
import * as productAction from '../../Store/Actions/ProductAction';
import Colors from '../../Constants/Colors';


const UserProductsScreen = props => {

    const[isLoading, setIsLoading] = useState(false);
    const[error, setError] = useState();
    const[isRefreshing, setIsRefreshing] = useState(false);

    const userProducts = useSelector(state => state.product.userProducts);

    console.log("User Products from server: ", userProducts);

    const dispatch = useDispatch();

    const editProductNavigator = productID => {
        return (
            props.navigation.navigate({
                routeName: 'EditProduct',
                params: {
                    prodID: productID
                }
            })
        );
    };

    const loadUserProducts = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            await dispatch(productAction.fetchProducts());
        } catch(error) {
            setError(error.message);
        }
        setIsRefreshing(false);
    }, [dispatch, setError, setIsLoading]);

    useEffect(() => {
        const willFocusSubscription = props.navigation.addListener('willFocus', loadUserProducts);

        return () => {
            willFocusSubscription.remove();
        }
    }, [loadUserProducts]);

    const deleteHandler = (id) => {
        Alert.alert(
            'Alert', 
            'Are you sure you want to delete this product?', 
            [{ text: 'No', style: 'default' }, 
            { text: 'Yes', style: 'destructive', onPress: async () => {
                try{
                setError(null);
                setIsLoading(true);
                await dispatch(productAction.deleteProduct(id));
                } catch(error) {
                    setError(error.message);
                }
                setIsLoading(false);
            } }]);
    };


    useEffect(() => {
        if(error) {
            Alert.alert('An error occured:', error, [{text: 'Okay'}]);
        }
    },[error]);


    if(error) {
        return (
            <View style = {styles.centerLoader}>
                <Text style = {{color: 'grey'}}>An error occured!!</Text>
                <Button title = 'Try Again' color = {Colors.primaryColor} onPress = {loadUserProducts}/>
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

    if(!isLoading && userProducts.length === 0){
        return (
            <View style = {styles.centerLoader}>
                <Text style = {{color: 'grey'}}>No products found! May be try adding some.</Text>
            </View>
        )
    }

    return (
        <FlatList 
            keyExtractor = {item => item.id}
            data = {userProducts}
            renderItem = {itemData => <ProductItem 
                image = {itemData.item.imageUrl}
                title = {itemData.item.title}
                price = {itemData.item.price}
                onSelect = {() => {
                    editProductNavigator(itemData.item.id);
                }}
            >
                <View style = {styles.buttonStyle}><Button color = 'darkorange' title = 'Edit Item' onPress = {() => {
                    editProductNavigator(itemData.item.id);
                }}/></View>
                <View style = {styles.buttonStyle}><Button color = 'orange' title = 'Delete' onPress = {
                    deleteHandler.bind(this, itemData.item.id)
                }/></View>
            </ProductItem>
            }
            contentContainerStyle={{ paddingBottom: 7 }}
        />
    );
};

UserProductsScreen.navigationOptions = navigationData => {
    return {
        headerTitle: 'Your Products',
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
                    title = "Add_Product"
                    iconName = "add-circle"
                    onPress = {() => {
                        navigationData.navigation.navigate({
                            routeName: 'EditProduct'
                        });
                    }}
                />
            </HeaderButtons>
        )
    }
}

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

export default UserProductsScreen;