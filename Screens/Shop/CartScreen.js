import React, { useState } from 'react';

import {
    StyleSheet,
    View,
    Text,
    Button,
    FlatList,
    ActivityIndicator
} from 'react-native';

import Colors from '../../Constants/Colors';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from '../../Components/Shop/CartItem';
import * as CartActions from '../../Store/Actions/CartAction';
import * as OrderActions from '../../Store/Actions/OrderAction';

const CartScreen = props => {

    const[isLoading, setIsLoading] = useState(false);
    const[error, setError] = useState();

    const cartTotalAmount = useSelector(state => state.cart.totalAmount);

    const dispatch = useDispatch();

    const cartItems = useSelector(state => {
        const transformedCartItems = [];

        for(const key in state.cart.cartItems){
            transformedCartItems.push({
                productID: key,
                productTitle: state.cart.cartItems[key].title,
                productPrice: state.cart.cartItems[key].price,
                productSum: state.cart.cartItems[key].sum,
                quantity: state.cart.cartItems[key].quantity
            })
        }
        return transformedCartItems;
    });

    if(error) {
        return (
            <View style = {styles.centerLoader}>
                <Text style = {{color: 'grey'}}>An error occured!!</Text>
            </View>
        )
    }


    return (
        <View style = {styles.container}>
            <View style = {styles.summaryView}>
                <Text style = {styles.summaryText}>Total Amount:
                    <Text style = {styles.dollarText}> $</Text>
                    <Text style = {styles.amountText}> {Math.abs(cartTotalAmount).toFixed(2)}</Text>
                </Text>
                {isLoading ? <View>
                                <ActivityIndicator size = 'small' color = {Colors.primaryColor}/>
                            </View> : <Button 
                    color = {Colors.primaryColor} 
                    title = 'Order Now' 
                    disabled = {cartItems.length === 0}
                    onPress = {async () => {
                        setError(null);
                        setIsLoading(true);
                        try {
                           await dispatch(OrderActions.addOrder(cartItems, cartTotalAmount));
                        } catch(error) {
                            setError(error.message);
                        }
                        setIsLoading(false);
                    }}
                    />}
            </View>
            <FlatList 
                data = {cartItems}
                keyExtractor = {item => item.productID}
                renderItem = {itemData => <CartItem 
                    quantity = {itemData.item.quantity}
                    sum = {itemData.item.productSum}
                    title = {itemData.item.productTitle}
                    isDeletable = 'true'
                    onRemoveCartItem = {() => {
                        dispatch(CartActions.removeFromCart(itemData.item.productID));
                    }}
                    />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 20
    },

    summaryView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        borderRadius: 10,
        elevation: 5,
        backgroundColor: Colors.accentColor,
        padding: 15
    },

    summaryText: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 12,
    },

    amountText: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 18,
        color: 'maroon'
    },

    dollarText: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 14,
        color: 'maroon'
    },
    
    centerLoader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CartScreen;