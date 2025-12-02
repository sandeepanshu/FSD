import * as userActions from './user.actions';
import {UserView} from "../../modules/users/models/UserView";

export interface UserState {
    loading : boolean;
    user : UserView;
    isAuthenticated : boolean;
    token : string;
    error : string;
}
let initialState:UserState = {
    loading : false,
    user : {} as UserView,
    isAuthenticated : false,
    token : '',
    error : ''
};

export const reducer = (state = initialState, action:any):UserState => {
    switch (action.type) {
        // register User
        case userActions.REGISTER_USER_REQUEST:
            return {
                ...state,
                loading : true
            };
        case userActions.REGISTER_USER_SUCCESS:
            return {
                ...state,
                loading : false
            };
        case userActions.REGISTER_USER_FAILURE:
            return {
                ...state,
                loading : false,
                error : action.payload.error
            };
        // Login User
        case userActions.LOGIN_USER_REQUEST:
            return {
                ...state,
                loading : true
            };
        case userActions.LOGIN_USER_SUCCESS:
            // store the token in local storage at client
            let storageKey : string | undefined = process.env.REACT_APP_STORAGE_KEY;
            if(storageKey){
                sessionStorage.setItem(storageKey, action.payload.token);
            }
            return {
                ...state,
                loading : false,
                token :  action.payload.token,
                isAuthenticated : true
            };
        case userActions.LOGIN_USER_FAILURE:
            return {
                ...state,
                loading : false,
                error : action.payload.error
            };
        // GET USER Info
        case userActions.GET_USER_INFO_REQUEST:
            return {
                ...state,
                loading : true
            };
        case userActions.GET_USER_INFO_SUCCESS:
            return {
                ...state,
                loading : false,
                user : action.payload.user,
                isAuthenticated : true
            };
        case userActions.GET_USER_INFO_FAILURE:
            return {
                ...state,
                loading : false,
                user : {} as UserView,
                isAuthenticated : false
            };
         // Logout User
        case userActions.LOGOUT_USER:
            let storageTokenKey : string | undefined = process.env.REACT_APP_STORAGE_KEY;
            if(storageTokenKey){
                sessionStorage.removeItem(storageTokenKey);
            }
            return {
                ...state,
                isAuthenticated : false,
                token : '',
                user : {} as UserView
            }
        default: return state;
    }
};