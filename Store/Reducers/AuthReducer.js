import { LOGIN, SIGNUP, AUTHENTICATE, LOGOUT } from "../Actions/AuthAction";

const initialState = {
    token: null,
    userID: null
};

const AuthReducer = (state = initialState, action) => {
    switch(action.type) {
        case AUTHENTICATE:
            return {
                token: action.token,
                userID: action.userID
            }
        case LOGOUT: 
            return initialState;
        // case SIGNUP:
        //     return {
        //         token: action.token,
        //         userID: action.userID
        //     }
        default: 
            return state;
    }
};

export default AuthReducer;