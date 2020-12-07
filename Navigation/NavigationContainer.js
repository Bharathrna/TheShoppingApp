import React, { useRef, useEffect } from 'react';
import ShopNavigator from './ShopNavigator';
import { useSelector } from 'react-redux';
import { NavigationActions } from 'react-navigation';


const NavigationContainer = props => {
    const navRef = useRef();
    const isAuthenticated = useSelector(state => !!state.auth.token);
    
    useEffect(() => {
        if(!isAuthenticated) {
            navRef.current.dispatch(NavigationActions.navigate({
                routeName: 'Auth'
            }))
        }
    }, [isAuthenticated]);


    return <ShopNavigator ref = {navRef} />;
};

export default NavigationContainer;