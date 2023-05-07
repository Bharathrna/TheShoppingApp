import React, { useEffect } from 'react';
import {
    StyleSheet,
    View,
    ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Colors from '../Constants/Colors';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import * as AuthActions from '../Store/Actions/AuthAction';

const StartupScreen = props => {

    const dispatch = useDispatch();
    const userData = useSelector(state => !!state.auth.user);

    useEffect(() => {
        //const tryLogin = () => {
          //  const userData = await AsyncStorage.getItem('userData');
            if(!userData) {
                props.navigation.navigate('Auth');
                return;
            } else {
                props.navigation.navigate('Shop');
                return;
            }

            // const transformedData = JSON.parse(userData);

            // const { token, userID, expiryDate } = transformedData;

            // const expirationDate = new Date(expiryDate);

            // if(expirationDate <= new Date() || !token || !userID) {
            //     props.navigation.navigate('Shop');
            //     return;
            // }

            //const expirationTime = expirationDate.getTime() - new Date().getTime();

            // props.navigation.navigate('Product');
            // dispatch(AuthActions.authenticate(token, userID, expirationTime));
       // }

       // tryLogin();
    }, [userData]);

    return(
         <View style = {styles.centerLoader}>
             <ActivityIndicator size = 'large' color = {Colors.primaryColor} />
         </View>
    );
};

const styles = StyleSheet.create({
    centerLoader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default StartupScreen;