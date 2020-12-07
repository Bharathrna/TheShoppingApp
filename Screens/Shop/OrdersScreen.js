import React, { useState, useEffect, useCallback } from 'react';
import {
    StyleSheet,
    FlatList,
    Text,
    View,
    Button,
    ActivityIndicator
} from 'react-native';
import customHeaderButton from '../../Components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import OrderItem from '../../Components/Shop/OrderItem';
import * as OrderActions from '../../Store/Actions/OrderAction';
import Colors from '../../Constants/Colors';

const OrdersScreen = props => {

    const[error, setError] = useState();
    const[isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const orderItems = useSelector(state => state.order.orders); 

    const loadOrders = useCallback(async () => {
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(OrderActions.fetchOrders());
        } catch(error) {
            setError(error.message);
        }
        setIsLoading(false);
    }, [dispatch, setError, setIsLoading]);

    useEffect(() => {
        const willFocusSubscription = props.navigation.addListener('willFocus', loadOrders);

        return () => {
            willFocusSubscription.remove();
        }
    }, [loadOrders]);

    useEffect(() => {
        loadOrders();
    }, [loadOrders]);

   // console.log("In Orders Screen------------>", loadOrders);

    if(error) {
        return (
            <View style = {styles.centerLoader}>
                <Text style = {{color: 'grey'}}>An error occured!!</Text>
                <Button title = 'Try Again' color = {Colors.primaryColor} onPress = {loadOrders}/>
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

    if(orderItems.length === 0) {
        return (
        <View style = {styles.centerLoader}>
            <Text color = 'grey'>No Orders yet!! Order something you want.</Text>
        </View>
        )
    } 
        
    return(
            <FlatList 
                data = {orderItems}
                keyExtractor = {item => item.orderID}
                renderItem = {itemData => <OrderItem 
                    date = {itemData.item.readableDate} 
                    totalAmount = {itemData.item.totalAmount}
                    items = {itemData.item.cartItems}
                />}
                contentContainerStyle={{ backgroundColor: 'white' }}
            />  
        );
}


OrdersScreen.navigationOptions = navigationData => {
    return {
        headerTitle: 'Your Orders',
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
        )
    }
};

const styles = StyleSheet.create({

    centerLoader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default OrdersScreen;