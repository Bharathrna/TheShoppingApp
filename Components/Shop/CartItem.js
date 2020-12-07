import React from 'react';
import {
    View,
    Text,
    Button,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Colors from '../../Constants/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';


const CartItem = props => {
    console.log('Im in');
    return (
            <View style = {styles.product}>
                <View style = {styles.prodDetailsView}>
                    <Text style = {styles.quantity}>{props.quantity}  </Text><Text style = {styles.title}>{props.title}</Text>
                </View>
                <View style = {styles.paymentDetailsView}>
                    <Text style = {styles.sum}>$ {parseFloat(props.sum).toFixed(2)}  </Text>
                    {props.isDeletable && <TouchableOpacity onPress = {props.onRemoveCartItem}>
                        <Ionicons
                            name = 'md-trash'
                            size = {17}
                            color = 'red'
                        />
                    </TouchableOpacity>}
                </View>
            </View>
    );
};

const styles = StyleSheet.create({
    product: {
        marginLeft: 20,
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    prodDetailsView: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    paymentDetailsView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 10
    },

    title: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 15,
        color: 'black'
    },

    quantity: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 17,
        color: Colors.primaryColor
    },

    sum: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 17,
        color: Colors.primaryColor
    },

    price: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 17,
        color: 'black'
    }
});

export default CartItem;