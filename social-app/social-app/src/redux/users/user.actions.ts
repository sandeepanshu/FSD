import {UserView} from "../../modules/users/models/UserView";
import axios from 'axios';
import {UserUtil} from "../../authUtil/UserUtil";
import {AuthUtil} from "../../authUtil/AuthUtil";
import * as profileActions from '../profiles/profile.actions';
import * as alertActions from '../../redux/alerts/alert.actions';

export const REGISTER_USER_REQUEST:string = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS:string = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE:string = 'REGISTER_USER_FAILURE';

export const LOGIN_USER_REQUEST:string = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS:string = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE:string = 'LOGIN_USER_FAILURE';

export const GET_USER_INFO_REQUEST:string = 'GET_USER_INFO_REQUEST';
export const GET_USER_INFO_SUCCESS:string = 'GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_FAILURE:string = 'GET_USER_INFO_FAILURE';

export const LOGOUT_USER:string = 'LOGOUT_USER';

export const registerUser = (user:UserView, history : any) => {
    return async (dispatch:any) => {
        try {
            dispatch({type : REGISTER_USER_REQUEST});
            let dataURL:string = `${process.env.REACT_APP_EXPRESS_SERVER_URL}/api/users/register`;
            let response = await axios.post(dataURL, user);
            dispatch({
                type : REGISTER_USER_SUCCESS
            });
            // TODO create an alert to display success message
            dispatch(alertActions.setAlert(response.data.msg , 'success'));
            // redirect to login Page
            history.push('/users/login');
        }
        catch (error) {
            console.error(error);
            dispatch({
                type : REGISTER_USER_FAILURE,
                payload : {
                    error : error
                }
            });
            // display error alerts
            let errorList:any[] = error.response.data.errors;
            errorList.forEach(error => {
                dispatch(alertActions.setAlert(error.msg , 'danger'));
            });
        }
    };
};

export const loginUser = (user:UserView, history:any) => {
    return async (dispatch:any) => {
        try {
            dispatch({type : LOGIN_USER_REQUEST});
            let dataURL:string = `${process.env.REACT_APP_EXPRESS_SERVER_URL}/api/users/login`;
            let response = await axios.post(dataURL, user);
            dispatch({
                type : LOGIN_USER_SUCCESS,
                payload : {
                    token : response.data.token
                }
            });
            // TODO create an alert to display success message
            dispatch(alertActions.setAlert(response.data.msg , 'success'));
            dispatch(getUserInfo()); // get the user Info
            // redirect to Dashboard Page
            history.push('/profiles/dashboard');
        }
        catch (error) {
            console.error(error);
            dispatch({
                type : LOGIN_USER_FAILURE,
                payload : {
                    error : error
                }
            });
            // display error alerts
            let errorList:any[] = error.response.data.errors;
            errorList.forEach(error => {
                dispatch(alertActions.setAlert(error.msg , 'danger'));
            });
        }
    };
};

// getUserInfo - PRIVATE
export const getUserInfo = () => {
    return async (dispatch:any) => {
        try {
            dispatch({type : GET_USER_INFO_REQUEST});
            let storageKey:string | null = UserUtil.getStorageKey();
            if(storageKey){
                AuthUtil.setTokenHeader(storageKey);
                let dataURL:string = `${process.env.REACT_APP_EXPRESS_SERVER_URL}/api/users/me`;
                let response = await axios.get(dataURL);
                dispatch({
                    type : GET_USER_INFO_SUCCESS,
                    payload : {
                        user : response.data.user
                    }
                });
            }
        }
        catch (error) {
            console.error(error);
            dispatch({
                type : GET_USER_INFO_FAILURE,
                payload : {
                    error : error
                }
            });
        }
    };
};

export const logOutUser = () => {
    return async (dispatch:any) => {
        try {
            dispatch({type : LOGOUT_USER});
            dispatch(profileActions.clearProfile());
        }
        catch (error) {
            console.error(error);
        }
    };
};