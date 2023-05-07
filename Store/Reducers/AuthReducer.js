import { LOGIN, SIGNUP, AUTHENTICATE, LOGOUT } from "../Actions/AuthAction";

const initialState = {
    user: null
};

const AuthReducer = (state = initialState, action) => {
    switch(action.type) {
        case AUTHENTICATE:
            console.log("Authenticate reducer: ", action.user);
            return {
               user: action.user
            }
        // case LOGOUT: 
        //     return initialState;
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