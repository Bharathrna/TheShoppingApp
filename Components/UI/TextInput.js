import React, { useReducer, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Alert
} from 'react-native';

const INPUT_UPDATE = 'INPUT_UPDATE';

const inputReducer = (state, action) => {
    switch (action.type) {
        case INPUT_UPDATE: 
            return {
                ...state,
                value: action.value,
                isValid: action.isValid
            }
        default:
            return state;
    }
};

const CustomTextInput = props => {

    const[inputState, dispatchInputState] = useReducer(inputReducer, {
        value: props.initialValue ? props.initialValue : '',
        isValid: props.initiallyValid
    })

    const textChangeHandler = text => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        let isValid = true;
        
        if (props.required && text.trim().length === 0) {
          isValid = false;
        }
        
        if (props.email && !emailRegex.test(text.toLowerCase())) {
          isValid = false;
        }
        
        if (props.min != null && +text < props.min) {
          Alert.alert('Alert', 'Please enter a value greater than 0', [{text: 'okay'}]);
          isValid = false;
        }
        
        if (props.max != null && +text > props.max) {
          isValid = false;
        }
        
        if (props.minLength != null && text.length < props.minLength) {
          isValid = false;
        }
        
        dispatchInputState({ type: INPUT_UPDATE, value: text, isValid: isValid });
      };

    console.log("Text, Validity and value:",props.titleText, " ", typeof(inputState.isValid), " ", typeof(inputState.value));

    const { inputChange, identifier } = props;

    useEffect(() => {
        inputChange(identifier, inputState.value, inputState.isValid);
    }, [identifier, inputState.value, inputState.isValid]);

    return (
                <View style = {styles.viewStyle}>
                    <Text style = {styles.textStyle}>{props.titleText}:</Text>
                    <TextInput 
                        {...props}
                        style = {styles.textInput} 
                        value = {inputState.value} 
                        onChangeText = {textChangeHandler}
                    />
                </View>
    );
};

const styles = StyleSheet.create({
    textStyle: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 15,
    },

    viewStyle: {
        width: '100%',
        marginVertical: 15
    },

    textInput: {
        borderBottomColor: 'grey',
        borderBottomWidth: 2,
        paddingVertical: 7,
        marginRight: 20
    }
});

export default CustomTextInput;