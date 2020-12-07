import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
//import {AsyncStorage} from 'react-native';
export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

let timer;

export const authenticate = (token, userID, expiryTime) => {
    return dispatch => {
        dispatch(setLogoutTimer(expiryTime));
        dispatch({type: AUTHENTICATE, token: token, userID: userID});
    }
}

export const signUp = (email, password) => {
    return async dispatch => {

        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCTpMrJL6V7FOMNlLHesHNoRpghd9R4YbA', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({        // body data provided to http request should be in the JSON format and JSON.stringify will convert the JS object or array to the JSON format.
               email: email,
               password: password,
               returnSecureToken: true
            })
        });

        if(!response.ok) {
            const errorData = await response.json();
            const errorMsg = errorData.error.message;
            console.log("Error response for Sign up: ", errorData);
            let signUpMessage = 'Something Went wrong.'
            if(errorMsg === 'EMAIL_EXISTS') {
                signUpMessage = 'Email address already exists. Try using different email address.'
            } else if(errorMsg === 'OPERATION_NOT_ALLOWED') {
                signUpMessage = 'Password sign-in is disabled for this account.'
            }
            throw new Error(signUpMessage);   
        }


        const responseDate = await response.json();

        console.log("Sign up response:", responseDate);

        dispatch(authenticate(responseDate.idToken, responseDate.localId, parseInt(responseDate.expiresIn) * 1000));

        const expirationDate = new Date(new Date().getTime() + parseInt(responseDate.expiresIn) * 1000);   // multiply by 1000 to convert the time to milliseconds

        saveDataToStorage(responseDate.idToken, responseDate.localId, expirationDate)
    }
};

export const logIn = (email, password) => {
    return async dispatch => {

        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCTpMrJL6V7FOMNlLHesHNoRpghd9R4YbA', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({        // body data provided to http request should be in the JSON format and JSON.stringify will convert the JS object or array to the JSON format.
               email: email,
               password: password,
               returnSecureToken: true
            })
        });

        if(!response.ok) {
            const errorData = await response.json();
            const errorMsg = errorData.error.message;
            let message = 'Something Went wrong.'
            if(errorMsg === 'INVALID_EMAIL') {
                message = 'Invalid Email address.'
            } else if(errorMsg === 'INVALID_PASSWORD') {
                message = 'Wrong Password.'
            }
            throw new Error(message);   
        }

        const responseDate = await response.json();

        console.log("Login response:", responseDate);

        dispatch(authenticate(responseDate.idToken, responseDate.localId, parseInt(responseDate.expiresIn) * 1000));

        const expirationDate = new Date(new Date().getTime() + responseDate.expiresIn * 1000);

        saveDataToStorage(responseDate.idToken, responseDate.localId, expirationDate)
    }
};

export const logout = () => {
    clearLogoutTimer();
    AsyncStorage.removeItem('userData');
    //navigation();
    return {type: LOGOUT};
};

// const navigation = () => {
//     const navigation = useNavigation();
//     return(() => {
//         navigation.navigate('Auth')
//     }
//     );
// }

const clearLogoutTimer = () => {
    if(timer) {
        clearTimeout(timer);
    }
}

const setLogoutTimer = (expirationTime) => {
    return dispatch => {
        timer = setTimeout(() => {
            dispatch(logout());
        }, expirationTime);
    }
};

const saveDataToStorage = (token, userID, expirationDate) => {
    AsyncStorage.setItem("userData", JSON.stringify({
        token: token,
        userID: userID,
        expiryDate: expirationDate.toISOString()
    }));
}