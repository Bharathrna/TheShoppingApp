import React from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    Button
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import * as CartActions from '../../Store/Actions/CartAction';
import CustomButton from '../../Components/UI/CustomButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import customHeaderButton from '../../Components/UI/HeaderButton';

const ProductDetailScreen = props => {

    const productID = props.navigation.getParam('productID');

    const selectedProduct = useSelector(state => state.product.availableProducts.find(product => product.id === productID));

    const dispatch = useDispatch();

    //console.log("selectedProduct:", selectedProduct.imageUrl);

    return (
        <ScrollView>
        <View style = {styles.container}>
                <View style = {styles.titleView}>
                    <Text style = {styles.titleStyle}>{selectedProduct.title}</Text>
                </View>
                <View style = {styles.productItem}>
                    <Image
                        source = {{uri: selectedProduct.imageUrl}}
                        style = {styles.bgImage} 
                    />
                </View>
                <View style = {styles.priceView}>
                    <Text style = {styles.textStyle}>Price: $ </Text>
                    <Text style = {styles.priceStyle}>{parseFloat(selectedProduct.price).toFixed(2)}</Text>
                </View>
                <View style = {styles.descriptionView}>
                    <Text style = {styles.textStyle}>Description:</Text>
                    <Text style = {styles.descriptionStyle}>{selectedProduct.description}</Text>
                </View>
                <View style = {styles.bottom}>
                    <CustomButton style = {styles.buttonView} onAddToCart = {() => {
                        dispatch(CartActions.addToCart(selectedProduct));
                    }} >Add To Cart</CustomButton>
                </View>
        </View>
        </ScrollView>
    );
};


ProductDetailScreen.navigationOptions = navigationData => {
    return {
        headerTitle: 'Product Detail',
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

    container: {
        flex: 1,
        backgroundColor: 'white'
    },

    titleView: {
        marginTop: 30,
    },  

    bottom: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 20
    },  

    titleStyle: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 20,
        color: 'black',
        textAlign: 'center'
    },

    priceStyle: {
        fontSize: 20,
        fontFamily: 'OpenSans',
        paddingRight: 10,
    },

    priceView: {
        flexDirection: 'row',
        marginTop: 50,
        marginLeft: 30,
    },  

    descriptionStyle: {
        fontSize: 20,
        paddingTop: 10,
        paddingBottom: 20,
        paddingRight: 15
    },

    bgImage: {
        flex: 1,
        // width: null,
        // height: null,
        //aspectRatio: 1.0, 
        resizeMode: 'cover'  
    },


    textStyle: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 20,
        color: 'black',
    },

    productItem: {
        height: 300,
        width:  350,
        marginTop: 40,
        marginLeft: 30,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5,
        overflow: 'hidden'
    },

    descriptionView: {
        marginTop: 30,
        marginLeft: 30,
    }
});

export default ProductDetailScreen;