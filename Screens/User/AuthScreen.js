import React, { useReducer, useRef, useEffect, useCallback, useState } from 'react';
import { 
    View,
    Alert,
    Text,
    TouchableOpacity,
 } from 'react-native';
import { useDispatch } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import Dimensions from '../../Constants/Dimensions';
import Icon from 'react-native-vector-icons/Fontisto';
import CustomButton from '../../Components/UI/CustomBtn';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Colors from '../../Constants/Colors';

import * as AuthActions from '../../Store/Actions/AuthAction';

const AuthScreen = props => {
    const[isLoading, setIsLoading] = useState(false);
    const[error, setError] = useState();
    
    const mounted = useRef(true);

    const dispatch = useDispatch();

    useEffect(() => {
        if(error) {
            Alert.alert('An error occured:', error, [{text: 'Okay'}]);
        }
    }, [error])

    useEffect(() => {
        console.log("Im auth screen")

        GoogleSignin.configure({
            webClientId: '789462179011-5muh07r0nne66p1smv49957nul6hkhb0.apps.googleusercontent.com',
          });

        return function cleanup() {
            mounted.current = false;
        };
    }, []);

    const signUpHandler = () => {
        props.navigation.navigate('SignUp');
    }

    const loginHandler = () => {
        props.navigation.navigate('Login');
    }

    const googleAuthHandler = () => {
        try {
            setError(null);
            setIsLoading(true);
            dispatch(AuthActions.googleSignIn());
            // props.navigation.navigate({
            //     routeName: 'Product'
            // });
        } catch(error) {
            setError(error.message);
            setIsLoading(false);
        }
    }

    return (
        <LinearGradient colors = {['#EC6F66', '#F3A183']} style = {styles.gradient}>
        <View style = {styles.container}>
        <View style = {styles.logoAndButtonView}>
            <View style = {{...styles.introView, marginTop: Dimensions.height / 6}}>
                <Icon
                    name="shopify"
                    size={52}
                    color="white"
                    style={{
                        paddingBottom: moderateScale(10),
                    }}
                />
                <View style = {styles.introTextView}>
                    <Text style = {styles.introTextStyle}>Millions of products.</Text>
                    <Text style = {styles.introTextStyle}>Get what you want.</Text>
                </View>
            </View>
            <View style = {styles.customButtonView}>
                <CustomButton 
                        viewStyle = {{...styles.customButtonStyle, backgroundColor: "#2DE26D"}} 
                        textStyle = {{color: 'black'}} 
                        title = 'Sign up'
                        onPress = {signUpHandler}
                />
                <CustomButton 
                    viewStyle = {{...styles.customButtonStyle, backgroundColor: "black", borderColor: 'grey'}} 
                    textStyle = {{color: 'white'}} textWrapper = {{paddingRight: moderateScale(25)}} 
                    title = 'Continue with phone number' 
                    iconNeeded = {true} 
                    imageUrl = {require('../../assets/images/phone.jpg')}/>
                {isLoading ? 
                    <CustomButton 
                        viewStyle = {{...styles.customButtonStyle, backgroundColor: "black", borderColor: 'grey'}} 
                        isLoading = {true}    
                    /> :
                    <CustomButton 
                        viewStyle = {{...styles.customButtonStyle, backgroundColor: "black", borderColor: 'grey'}} 
                        textStyle = {{color: 'white'}} 
                        textWrapper = {{paddingRight: moderateScale(25)}} 
                        imageStyle = {{height: moderateScale(20), width: moderateScale(20)}} 
                        title = 'Continue with Google' 
                        imageNeeded = {true} 
                        imageUrl = {require('../../assets/images/google.png')}
                        onPress = {googleAuthHandler}
                    /> 
                }
                <CustomButton 
                    viewStyle = {{backgroundColor: 'black', borderColor: 'grey'}} 
                    textStyle = {{color: 'white'}} 
                    title = 'Continue with Facebook' 
                    textWrapper = {{paddingRight: moderateScale(25)}} 
                    imageStyle = {{height: moderateScale(25), width: moderateScale(25)}} 
                    imageNeeded = {true} 
                    imageUrl = {require('../../assets/images/facebook.png')}/>
            </View>
            <TouchableOpacity onPress = {loginHandler} activeOpacity={0.7} style = {styles.logInViewStyle}>
                <Text style = {styles.logInTextStyle}>Log in</Text>
            </TouchableOpacity>
        </View>
        </View>
        </LinearGradient>

    );
 }

//  AuthScreen.navigationOptions = {
//     headerTitle: 'Authentication'
//  };

 const styles = ScaledSheet.create({

    customButtonStyle: {
        marginBottom: '15@ms'
    },

    customButtonView: {
        flex: 1,
        justifyContent: 'center',
    },

    logInTextStyle: {
        color: 'black',
        textAlign: 'center',
        fontFamily: 'Poppins-SemiBold',
        fontSize: '14@ms'
    },

    logInViewStyle: {
        justifyContent: 'center', 
        alignItems: 'center',
        marginBottom: '25@ms'
    },

    logoAndButtonView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    introView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    introTextStyle: {
        textAlign: 'center',
        fontSize: '30@ms',
        color: 'white',
        fontFamily: 'Poppins-SemiBold'
    },

    introTextView: {
        marginTop: '20@ms'
    },

    container: {
       flex: 1,
    },

    gradient: {
         flex: 1,
         width: '100%',
         height: '100%'
     },

    //  loginButton: {
    //     width: '70%',
    //     paddingTop: 20,
    //     paddingBottom: 10,
    //     marginLeft: 50,
    //     paddingBottom: 15
    //  },
      
    //  signupButton: {
    //      width: '70%',
    //      marginLeft: 50
    //  }
 });

 export default AuthScreen;