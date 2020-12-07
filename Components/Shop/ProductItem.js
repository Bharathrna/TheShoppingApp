import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableNativeFeedback
} from 'react-native';
import Colors from '../../Constants/Colors';


const ProductItem = props => {

    console.log("Price of products: ", typeof(props.price));

    return (
            <View style = {styles.product}>
                <TouchableNativeFeedback onPress = {props.onSelect} useForeground>
                    <View>
                        <Image style = {styles.image} source = {{uri: props.image}}/>
                        <View style = {styles.innerView}>
                            <Text style = {styles.title}>{props.title}</Text>
                            <Text style = {styles.price}>$ {parseFloat(props.price).toFixed(2)}</Text>
                        </View>
                        <View style = {styles.buttonView}>
                            {props.children}
                        </View>
                    </View>
                </TouchableNativeFeedback>
            </View>
    );
};

const styles = StyleSheet.create({
    product: {
        elevation: 5,
        borderRadius: 10,
        backgroundColor: Colors.accentColor,
        height: 400,
        width: '97%',
        overflow: 'hidden',
        marginLeft: 6,
        marginTop: 7,
    },

    buttonStyle: {
        paddingBottom: 10,
        width: '50%',
    },

    innerView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 7,
        height: '10%',
        //backgroundColor: 'orange'
    },

    image: {
        height: '60%',
        width: '100%',
    },

    buttonView: {
        alignItems: 'center',
        height: '30%',
    },

    title: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 19,
        paddingLeft: 10,
        color: 'black'
    },

    price: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 17,
        paddingRight: 20,
        color: 'black'
    }
});

export default ProductItem;