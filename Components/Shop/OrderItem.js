import React, { useState } from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
} from 'react-native';
import Colors from '../../Constants/Colors';
import CartItem from './CartItem';


const OrderItem = props => {
    const[viewDetails, setViewDetails] = useState(false);

    return (
            <View style = {styles.ordersScreen}>
                <View style = {styles.summary}>
                    <View style = {styles.innerView}>
                        <Text style = {styles.date}>Order placed on: </Text>
                        <Text style = {styles.dateText}>{props.date}</Text>
                    </View>
                    <View style = {styles.innerView}>
                        <Text style = {styles.totalAmount}>Net Amount: $ </Text>
                        <Text style = {styles.amountText}>{(props.totalAmount).toFixed(2)}</Text>
                    </View>
                </View>
                    <Button 
                        title = {viewDetails ? 'Hide Details' : 'View Details'} 
                        color = {Colors.primaryColor}
                        onPress = {() => {
                            setViewDetails(currentState => !currentState);
                        }}
                    />
                    {viewDetails && <View style = {styles.details}>
                        {props.items.map(cartItem => <CartItem 
                            key = {cartItem.productID}
                            quantity = {cartItem.quantity}
                            title = {cartItem.productTitle}
                            sum = {cartItem.productSum.toFixed(2)}
                        />)}
                    </View>}
            </View>
    );
};

const styles = StyleSheet.create({

    ordersScreen: {
        elevation: 10,
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
        margin: 10,
        padding: 15,
        backgroundColor: Colors.accentColor
    },

    date: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 14,
        color: 'black',
    },

    totalAmount: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 13,
        color: 'black'
    },

   summary: {
        alignItems: 'center',
        marginTop: 10
   },

   innerView: {
       flexDirection: 'row',
       paddingBottom: 20,
       alignItems: 'center'
   },

   amountText: {
        fontFamily: 'OpenSans-Bold',
        color: 'maroon'
   },

   dateText: {
        color: 'grey',
        fontFamily: 'OpenSans-Regular'
   },

   buttonView: {
       paddingBottom: 10
   },   

   details: {
       width: '100%',
       marginBottom: 10
    }
});

export default OrderItem;