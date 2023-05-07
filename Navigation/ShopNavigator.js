import React, {useState} from 'react';
import { createStackNavigator} from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createSwitchNavigator } from 'react-navigation-switch-transitioner'
import { Platform, View, SafeAreaView, Button, ActivityIndicator } from 'react-native';
import Colors from '../Constants/Colors';
import ProductsOverviewScreen from '../Screens/Shop/ProductsOverviewScreen';
import ProductDetailScreen from '../Screens/Shop/ProductDetailScreen';
import CartScreen from '../Screens/Shop/CartScreen';
import OrdersScreen from '../Screens/Shop/OrdersScreen';
import UserProductsScreen from '../Screens/User/UserProductsScreen';
import EditProductScreen from '../Screens/User/EditProductScreen';
import AuthScreen from '../Screens/User/AuthScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StartupScreen from '../Screens/StartupScreen';
import { useDispatch } from 'react-redux';
import * as AuthActions from '../Store/Actions/AuthAction';
import SignUpScreen from '../Screens/User/SignUpScreen';
import LoginScreen from '../Screens/User/LoginScreen.js';


const ProductsNavigator = createStackNavigator({
    ProductsOverview: {
        screen: ProductsOverviewScreen,
        navigationOptions: {
            headerStyle: {
                backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
            },
            headerTintColor: Platform.OS === 'android' ? Colors.accentColor : Colors.primaryColor
        }
    },
    ProductDetails: {
        screen: ProductDetailScreen,
        navigationOptions: {
            headerStyle: {
                backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
            },
            headerTintColor: Platform.OS === 'android' ? Colors.accentColor : Colors.primaryColor
        }
    },
    Cart: {
        screen: CartScreen,
        navigationOptions: {
            headerStyle: {
                backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
            },
            headerTintColor: Platform.OS === 'android' ? Colors.accentColor : Colors.primaryColor
        }
    }
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => {
            return (
                <MaterialIcons 
                    name = 'shopping-cart'
                    size = {22}
                    color = {drawerConfig.tintColor}
                />
             )
        }
    }
});


const OrdersNavigator = createStackNavigator({
    Orders: {
        screen: OrdersScreen,
        navigationOptions: {
            headerStyle: {
                backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
            },
            headerTintColor: Platform.OS === 'android' ? Colors.accentColor : Colors.primaryColor
        }
    }
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => {
            return (
                <MaterialIcons 
                    name = 'list'
                    size = {22}
                    color = {drawerConfig.tintColor}
                />
             )
        }
    }
});

const UserProductsNavigator = createStackNavigator({
    UserProducts: {
        screen: UserProductsScreen,
        navigationOptions: {
            headerStyle: {
                backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
            },
            headerTintColor: Platform.OS === 'android' ? Colors.accentColor : Colors.primaryColor
        }
    },
    EditProduct: {
        screen: EditProductScreen,
        navigationOptions: {
            headerStyle: {
                backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
            },
            headerTintColor: Platform.OS === 'android' ? Colors.accentColor : Colors.primaryColor
        }
    }
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => {
            return (
                <Ionicons 
                    name = 'ios-create'
                    size = {22}
                    color = {drawerConfig.tintColor}
                />
             )
        }
    }
});

const ShopNavigator = createDrawerNavigator({
    Product: ProductsNavigator,
    Orders: OrdersNavigator,
    User_Products: UserProductsNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.primaryColor,
        labelStyle: {
            fontFamily: 'OpenSans-Bold'
        }
    },
    contentComponent: props => {
        const dispatch = useDispatch();

        return (
            <View style = {{flex: 1, paddingTop: 20}}>
                <SafeAreaView>
                    <DrawerItems {...props}/>
                    <Button title = 'Logout' color = {Colors.primaryColor} onPress = {() => {
                        dispatch(AuthActions.logout());
                       // props.navigation.navigate('Auth');
                    }}/>
                </SafeAreaView>
            </View>
        )
    }
});


const AuthNavigator = createStackNavigator({
    Auth: {
        screen: AuthScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    SignUp: {
        screen: SignUpScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    Login: {
        screen: LoginScreen,
        navigationOptions: {
            headerShown: false
        }
    }
});

const MainNavigator = createSwitchNavigator({
    Startup: StartupScreen,
    Auth: AuthNavigator,
    Shop: ShopNavigator
});


export default createAppContainer(MainNavigator);