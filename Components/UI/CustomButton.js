import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Colors from '../../Constants/Colors';

const CustomButton = props => {
    return (
        <TouchableOpacity onPress = {props.onAddToCart} style = {{...props.style, ...styles.buttonView}}>
            <Text style = {styles.applyTextStyle}>{props.children}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonView: {
        backgroundColor: Colors.accentColor,
        borderRadius: 20,
        padding: 10,
        width: "50%",
        alignItems: 'center',
        elevation: 5
    },

    applyTextStyle: {
        fontSize: 20,
        color: Colors.primaryColor,
        fontFamily: 'OpenSans-Regular',
        textAlign: 'center'
    },
});

export default CustomButton;