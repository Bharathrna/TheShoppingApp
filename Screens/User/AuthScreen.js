import React, { useReducer, useEffect, useCallback, useState } from 'react';
import { 
    View,
    Button,
    StyleSheet,
    Alert,
    ActivityIndicator,
    KeyboardAvoidingView
 } from 'react-native';
 import { useDispatch } from 'react-redux';
import CustomTextInput from '../../Components/UI/TextInput';
import LinearGradient from 'react-native-linear-gradient';

import * as AuthActions from '../../Store/Actions/AuthAction';
import Colors from '../../Constants/Colors';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {

    if(action.type === FORM_INPUT_UPDATE){
        const updatedInputs = {
            ...state.inputs,
            [action.input]: action.value
        }
        
        const updatedInputValidations = {
            ...state.inputValidations,
            [action.input]: action.isValid
        }
        
        let updatedFormValidation = true;

        for(const key in updatedInputValidations) {
            if(!updatedInputValidations[key]) {
                updatedFormValidation = false;
            }
        }

        return {
            formValidation: updatedFormValidation,
            inputValidations: updatedInputValidations,
            inputs: updatedInputs
        }
    }

    return state;
};


 const AuthScreen = props => {
    const[isSignUp, setIsSignUp] = useState(false);
    const[isLoading, setIsLoading] = useState(false);
    const[error, setError] = useState();

    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputs: {
           email: '',
           password: ''
        },
        inputValidations: {
            email: false,
            password: false
        },
        formValidation: false
    });

    const authHandler = useCallback(async () => {

        try{
            if(formState.inputs.email.length === 0) {
                Alert.alert('Alert', 'Email cannot be empty', [{text: 'okay'}]);
                return;
            }
            if(formState.inputs.password.length === 0) {
                Alert.alert('Alert', 'Password cannot be empty', [{text: 'okay'}]);
                return;
            }
            if(formState.inputs.password.length < 8) {
                Alert.alert('Alert', 'Password should be greater than or equal to length 8', [{text: 'okay'}]);
                return;
            }
            // if(!formState.inputValidations.email) {
            // Alert.alert('Alert', 'Invalid Email ID', [{text: 'okay'}]);
            // return;
            // }
            // if(!formState.inputValidations.password) {
            //     Alert.alert('Alert', 'Invalid Password', [{text: 'okay'}]);
            //     return;
            //     }
            let action;
            setError(null);
            setIsLoading(true);
            console.log('Sign up status: ', isSignUp);
            if(isSignUp) {
                action = AuthActions.signUp(formState.inputs.email, formState.inputs.password);
            } else {
                action = AuthActions.logIn(formState.inputs.email, formState.inputs.password);
            }
            await dispatch(action);
            props.navigation.navigate({
                routeName: 'Product'
            });
        } catch(error) {
            setError(error.message);
            setIsLoading(false);
        }
    }, [formState, dispatch]);

    const inputHandler = useCallback((identifier,newValue, isValid) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE, 
            value: newValue, 
            isValid: isValid,
            input: identifier
        });
    }, [dispatchFormState]);

    useEffect(() => {
        if(error) {
            Alert.alert('An error occured:', error, [{text: 'Okay'}]);
        }
    }, [error])

     return (
        <LinearGradient colors = {['#EC6F66', '#F3A183']} style = {styles.gradient}>
            <View style = {styles.container}>
                <CustomTextInput
                        titleText = 'Email'
                        keyboardType = 'default'
                        autoCapitalize = 'none'
                        returnKeyType = 'next'
                        initialValue = {formState.inputs.email}
                        initiallyValid = {formState.inputValidations.email}
                        inputChange = {inputHandler}
                        identifier = 'email'
                        required
                        email
                    /> 
                <CustomTextInput
                        titleText = 'Password'
                        keyboardType = 'default'
                        secureTextEntry
                        autoCapitalize = 'none'
                        returnKeyType = 'done'
                        initialValue = {formState.inputs.password}
                        initiallyValid = {formState.inputValidations.password}
                        inputChange = {inputHandler}
                        identifier = 'password'
                        required
                        minLength = {8}
                    /> 
                <View style = {styles.loginButton}>{isLoading ?  
                    <View style = {styles.centerLoader}>
                        <ActivityIndicator size = 'large' color = {Colors.primaryColor}/>
                </View> :<Button title = {!isSignUp ?'Log In' : 'Sign-up ' } color = {Colors.primaryColor} onPress = {authHandler}/>}</View>
                <View style = {styles.signupButton}><Button title = {isSignUp ? 'Switch to Log In' : 'Switch to Sign-up'} color = 'orange' onPress = {() => {isSignUp ? setIsSignUp(false) : setIsSignUp(true)}}/></View>
            </View>
        </LinearGradient>
    );
 }

 AuthScreen.navigationOptions = {
    headerTitle: 'Authentication'
 };

 const styles = StyleSheet.create({
     container: {
         flex: 1,
         margin: 20
     },

     gradient: {
         flex: 1,
         width: '100%',
         height: '100%'
     },

     loginButton: {
        width: '70%',
        paddingTop: 20,
        paddingBottom: 10,
        marginLeft: 50,
        paddingBottom: 15
     },
      
     signupButton: {
         width: '70%',
         marginLeft: 50
     }
 });

 export default AuthScreen;