import React, { useRef, useState, useEffect } from 'react';
import ShopNavigator from './ShopNavigator';
import { useSelector } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { useDispatch } from 'react-redux';
import auth from "@react-native-firebase/auth";
import { authenticate } from '../Store/Actions/AuthAction';

const NavigationContainer = props => {
    const [user, setUser] = useState(null);

    const navRef = useRef();
    const dispatch = useDispatch();
  //  const isAuthenticated = useSelector(state => !!state.auth.user);

  
    // Handle user state changes
    const onAuthStateChanged = (userInfo) => {
        if(userInfo) {
            setUser(userInfo._user);
            dispatch(authenticate(userInfo._user));
            console.log("Logged in user info: ", userInfo._user);
        } else {
            setUser(null);
            dispatch(authenticate(null));

        }
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
      }, []);
    
    useEffect(() => {
        if(!user) {
            navRef.current?.dispatch(NavigationActions.navigate({
                routeName: 'Auth'
            }))
        } 
    }, [user]);

    console.log("Im signing in");

    return <ShopNavigator ref = {navRef} />;
};

export default NavigationContainer;