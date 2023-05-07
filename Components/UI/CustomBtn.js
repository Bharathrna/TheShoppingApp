import React from "react";

import {
    Image,
    TouchableOpacity,
    Text,
    View,
    ActivityIndicator
} from 'react-native';

import { moderateScale, ScaledSheet } from "react-native-size-matters";
import Icon from "react-native-vector-icons/Feather";
import Dimensions from "../../Constants/Dimensions";
import Colors from '../../Constants/Colors';

const CustomBtn = props => {

    return (
        <TouchableOpacity 
            activeOpacity={0.7}
            onPress={props.onPress} 
            style={{...props.viewStyle, ...styles.appButtonContainer, width: Dimensions.width * 0.85, height: Dimensions.height / 16}}
        >
            {props.isLoading?
                <View style = {styles.loaderStyle}>
                    <ActivityIndicator size = 'small' color = {Colors.primaryColor}/>
                </View> : null }
            {props.iconNeeded ? (
                <View style={styles.iconWrapper}>
                    <Icon
                        name = 'smartphone'
                        size = {26}
                        color = "white"
                    /> 
                </View> ) : null}
            {props.imageNeeded ? (
                <View style={styles.iconWrapper}>
                    <Image 
                    source={props.imageUrl} 
                    style={props.imageStyle} 
                    /> 
                </View> ) : null}
            {props.isLoading ? null : <View style = {{...styles.textWrapper, ...props.textWrapper}}>
                <Text style={{...styles.appButtonText, ...props.textStyle}}>{props.title}</Text>
            </View>}
        </TouchableOpacity>
    )
}

const styles = ScaledSheet.create({
    appButtonText: {
        fontSize: '14@ms',
        fontFamily: 'Poppins-SemiBold'
    },

    textWrapper: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
    },

    loaderStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    iconWrapper: {
        width: '30@ms',
        justifyContent: 'center',
        alignItems: 'center',
    },

    appButtonContainer: {
        flexDirection:'row',
        borderWidth: '1@ms',
        borderRadius: '22@ms',
        padding: '10@ms'
    }
});

export default CustomBtn;