import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
//import {AsyncStorage} from 'react-native';
export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const GOOGLE_SIGN_IN = 'GOOGLE_SIGN_IN';

let timer;

// export const authenticate = (token, userID, expiryTime) => {
//     return dispatch => {
//         dispatch(setLogoutTimer(expiryTime));
//         dispatch({type: AUTHENTICATE, token: token, userID: userID});
//     }
// }

export const authenticate = (user) => {
    return dispatch => {
        dispatch({type: AUTHENTICATE, user});
    }
}

export const googleSignIn = () => {
    return async dispatch => {
        try {

            const hasPlayServices =  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            
            if(hasPlayServices) {
                const googleResponse = await GoogleSignin.signIn();

                const tokens = await GoogleSignin.getTokens();

                console.log("Google Response: ", googleResponse);
        
                //Create a Google credential with the token
                const googleCredential = auth.GoogleAuthProvider.credential(tokens.idToken, tokens.accessToken);
            
                //Sign-in the user with the credential
                const response = await auth().signInWithCredential(googleCredential); 

                const { user } = response;
                console.log("Data after google sign in: ", user);
            } else {
                console.log("Need google play services");
            }
        }  catch(error) {
            console.log("Error occured in google sign in: ", error);
        }
    }
};

export const signUp = (email, password) => {
    return async dispatch => {

        // const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCTpMrJL6V7FOMNlLHesHNoRpghd9R4YbA', {
        //     method: 'POST',
        //     headers: {
        //         'Content-type': 'application/json'
        //     },
        //     body: JSON.stringify({        // body data provided to http request should be in the JSON format and JSON.stringify will convert the JS object or array to the JSON format.
        //        email: email,
        //        password: password,
        //        returnSecureToken: true
        //     })
        // });

        const response = await auth().createUserWithEmailAndPassword(email, password);

        //dispatch(setLogoutTimer(10000));
        //dispatch(setTimeout(response.user._user.metadata.lastSignInTime));
        // if(!response.ok) {
        //     const errorData = await response.json();
        //     const errorMsg = errorData.error.message;
        //     console.log("Error response for Sign up: ", errorData);
        //     let signUpMessage = 'Something Went wrong.'
        //     if(errorMsg === 'EMAIL_EXISTS') {
        //         signUpMessage = 'Email address already exists. Try using different email address.'
        //     } else if(errorMsg === 'OPERATION_NOT_ALLOWED') {
        //         signUpMessage = 'Password sign-in is disabled for this account.'
        //     }
        //     throw new Error(signUpMessage);   
        // }


       // const responseDate = await response.json();

        // dispatch(authenticate(responseDate.idToken, responseDate.localId, parseInt(responseDate.expiresIn) * 1000));

        // const expirationDate = new Date(new Date().getTime() + parseInt(responseDate.expiresIn) * 1000);   // multiply by 1000 to convert the time to milliseconds

        // saveDataToStorage(responseDate.idToken, responseDate.localId, expirationDate)
    }
};

export const logIn = (email, password) => {
    return async dispatch => {
        await auth().signInWithEmailAndPassword(email, password);

        // const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCTpMrJL6V7FOMNlLHesHNoRpghd9R4YbA', {
        //     method: 'POST',
        //     headers: {
        //         'Content-type': 'application/json'
        //     },
        //     body: JSON.stringify({        // body data provided to http request should be in the JSON format and JSON.stringify will convert the JS object or array to the JSON format.
        //        email: email,
        //        password: password,
        //        returnSecureToken: true
        //     })
        // });

        // if(!response.ok) {
        //     const errorData = await response.json();
        //     const errorMsg = errorData.error.message;
        //     let message = 'Something Went wrong.'
        //     if(errorMsg === 'INVALID_EMAIL') {
        //         message = 'Invalid credentials.'
        //     } else if(errorMsg === 'INVALID_PASSWORD') {
        //         message = 'Invalid credentials.'
        //     }
        //     throw new Error(message);   
        // }

        // const responseDate = await response.json();

        // console.log("Login response:", responseDate);

        // dispatch(authenticate(responseDate.idToken, responseDate.localId, parseInt(responseDate.expiresIn) * 1000));

        // const expirationDate = new Date(new Date().getTime() + responseDate.expiresIn * 1000);

        // saveDataToStorage(responseDate.idToken, responseDate.localId, expirationDate)
    }
};

export const logout = () => {
   // clearLogoutTimer();
    console.log("logging user out")
    //AsyncStorage.removeItem('userData');
    //navigation();
    auth().signOut();
   // return {type: LOGOUT};
};

// const navigation = () => {
//     const navigation = useNavigation();
//     return(() => {
//         navigation.navigate('Auth')
//     }
//     );
// }

// const clearLogoutTimer = () => {
//     if(timer) {
//         clearTimeout(timer);
//     }
// }

// const setLogoutTimer = (expirationTime) => {
//     console.log("Am i setting time out", expirationTime);
//     return dispatch => {
//         timer = setTimeout(() => {
//             dispatch(logout());
//         }, expirationTime);
//     }
// };

// const saveDataToStorage = (token, userID, expirationDate) => {
//     AsyncStorage.setItem("userData", JSON.stringify({
//         token: token,
//         userID: userID,
//         expiryDate: expirationDate.toISOString()
//     }));
// }