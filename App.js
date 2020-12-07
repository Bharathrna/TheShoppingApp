/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import NavigationContainer from './Navigation/NavigationContainer';
import ProductsReducers from './Store/Reducers/ProductsReducer';
import CartReducer from './Store/Reducers/CartReducer';
import orderReducer from './Store/Reducers/OrderReducer';
import AuthReducer from './Store/Reducers/AuthReducer';

const rootReducer = combineReducers({
  product: ProductsReducers,
  cart: CartReducer,
  order: orderReducer,
  auth: AuthReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));


const App: () => React$Node = () => {
  return (
   
          <Provider store = {store}>
            <NavigationContainer/>
          </Provider>
            
  );
};

const styles = StyleSheet.create({

});

export default App;