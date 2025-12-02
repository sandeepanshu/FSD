import axios from 'axios';
import {UserUtil} from "../../authUtil/UserUtil";
import {AuthUtil} from "../../authUtil/AuthUtil";
import * as alertActions from '../../redux/alerts/alert.actions';

export const GET_MY_PROFILE_REQUEST : string =  'GET_MY_PROFILE_REQUEST';
export const GET_MY_PROFILE_SUCCESS : string =  'GET_MY_PROFILE_SUCCESS';
export const GET_MY_PROFILE_FAILURE : string =  'GET_MY_PROFILE_FAILURE';

export const DELETE_EXPERIENCE_REQUEST:string = 'DELETE_EXPERIENCE_REQUEST';
export const DELETE_EXPERIENCE_SUCCESS:string = 'DELETE_EXPERIENCE_SUCCESS';
export const DELETE_EXPERIENCE_FAILURE:string = 'DELETE_EXPERIENCE_FAILURE';

export const DELETE_EDUCATION_REQUEST:string = 'DELETE_EDUCATION_REQUEST';
export const DELETE_EDUCATION_SUCCESS:string = 'DELETE_EDUCATION_SUCCESS';
export const DELETE_EDUCATION_FAILURE:string = 'DELETE_EDUCATION_FAILURE';

export const CREATE_PROFILE_REQUEST:string = 'CREATE_PROFILE_REQUEST';
export const CREATE_PROFILE_SUCCESS:string = 'CREATE_PROFILE_SUCCESS';
export const CREATE_PROFILE_FAILURE:string = 'CREATE_PROFILE_FAILURE';

export const UPDATE_PROFILE_REQUEST:string = 'UPDATE_PROFILE_REQUEST';
export const UPDATE_PROFILE_SUCCESS:string = 'UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_FAILURE:string = 'UPDATE_PROFILE_FAILURE';

export const ADD_EDUCATION_REQUEST:string = 'ADD_EDUCATION_REQUEST';
export const ADD_EDUCATION_SUCCESS:string = 'ADD_EDUCATION_SUCCESS';
export const ADD_EDUCATION_FAILURE:string = 'ADD_EDUCATION_FAILURE';

export const ADD_EXPERIENCE_REQUEST:string = 'ADD_EXPERIENCE_REQUEST';
export const ADD_EXPERIENCE_SUCCESS:string = 'ADD_EXPERIENCE_SUCCESS';
export const ADD_EXPERIENCE_FAILURE:string = 'ADD_EXPERIENCE_FAILURE';

export const CLEAR_PROFILE:string = 'CLEAR_PROFILE';

// get my Profile - PRIVATE
export const getMyProfile = () => {
    return async (dispatch:any) => {
        try {
            dispatch({type : GET_MY_PROFILE_REQUEST});
            let storageKey:string | null = UserUtil.getStorageKey();
            if(storageKey){
                AuthUtil.setTokenHeader(storageKey);
                let dataURL:string = `${process.env.REACT_APP_EXPRESS_SERVER_URL}/api/profiles/me`;
                let response = await axios.get(dataURL);
                dispatch({
                    type : GET_MY_PROFILE_SUCCESS,
                    payload : {
                        profile : response.data.profile
                    }
                });
            }
        }
        catch (error) {
            console.error(error);
            dispatch({
                type : GET_MY_PROFILE_FAILURE,
                payload : {
                    error : error
                }
            });
        }
    };
};

export const clearProfile = () => {
    return async (dispatch : any) => {
        try {
            dispatch({
                type : CLEAR_PROFILE
            });
        }
        catch (error) {
            console.error(error);
        }
    };
};

// Delete Experience - PRIVATE
export const deleteExperience = (expId:string) => {
    return async (dispatch:any) => {
        try {
            dispatch({type : DELETE_EXPERIENCE_REQUEST});
            let storageKey:string | null = UserUtil.getStorageKey();
            if(storageKey){
                AuthUtil.setTokenHeader(storageKey);
                let dataURL:string = `${process.env.REACT_APP_EXPRESS_SERVER_URL}/api/profiles/experience/${expId}`;
                let response = await axios.delete(dataURL);
                dispatch({
                    type : DELETE_EXPERIENCE_SUCCESS,
                    payload : {
                        profile : response.data.profile
                    }
                });
                dispatch(alertActions.setAlert(response.data.msg , 'success'));
            }
        }
        catch (error) {
            console.error(error);
            dispatch({
                type : DELETE_EXPERIENCE_FAILURE,
                payload : {
                    error : error
                }
            });
        }
    };
};

// Delete Education - PRIVATE
export const deleteEducation = (eduId:string) => {
    return async (dispatch:any) => {
        try {
            dispatch({type : DELETE_EDUCATION_REQUEST});
            let storageKey:string | null = UserUtil.getStorageKey();
            if(storageKey){
                AuthUtil.setTokenHeader(storageKey);
                let dataURL:string = `${process.env.REACT_APP_EXPRESS_SERVER_URL}/api/profiles/education/${eduId}`;
                let response = await axios.delete(dataURL);
                dispatch({
                    type : DELETE_EDUCATION_SUCCESS,
                    payload : {
                        profile : response.data.profile
                    }
                });
                dispatch(alertActions.setAlert(response.data.msg , 'success'));
            }
        }
        catch (error) {
            console.error(error);
            dispatch({
                type : DELETE_EDUCATION_FAILURE,
                payload : {
                    error : error
                }
            });
        }
    };
};

// Create Profile - PRIVATE
export const createProfile = (profile:any, history:any) => {
    return async (dispatch:any) => {
        try {
            dispatch({type : CREATE_PROFILE_REQUEST});
            let storageKey:string | null = UserUtil.getStorageKey();
            if(storageKey){
                AuthUtil.setTokenHeader(storageKey);
                let dataURL:string = `${process.env.REACT_APP_EXPRESS_SERVER_URL}/api/profiles/`;
                let response = await axios.post(dataURL, profile);
                dispatch({
                    type : CREATE_PROFILE_SUCCESS,
                    payload : {
                        profile : response.data.profile
                    }
                });
                history.push('/profiles/dashboard');
                dispatch(alertActions.setAlert(response.data.msg , 'success'));
            }
        }
        catch (error) {
            console.error(error);
            dispatch({
                type : CREATE_PROFILE_FAILURE,
                payload : {
                    error : error
                }
            });
        }
    };
};

// Update Profile - PRIVATE
export const updateProfile = (profile:any, history:any) => {
    return async (dispatch:any) => {
        try {
            dispatch({type : UPDATE_PROFILE_REQUEST});
            let storageKey:string | null = UserUtil.getStorageKey();
            if(storageKey){
                AuthUtil.setTokenHeader(storageKey);
                let dataURL:string = `${process.env.REACT_APP_EXPRESS_SERVER_URL}/api/profiles/`;
                let response = await axios.put(dataURL, profile);
                dispatch({
                    type : UPDATE_PROFILE_SUCCESS,
                    payload : {
                        profile : response.data.profile
                    }
                });
                history.push('/profiles/dashboard');
                dispatch(alertActions.setAlert(response.data.msg , 'success'));
            }
        }
        catch (error) {
            console.error(error);
            dispatch({
                type : UPDATE_PROFILE_FAILURE,
                payload : {
                    error : error
                }
            });
        }
    };
};

// add Education - PRIVATE
export const addEducation = (education:any, history:any) => {
    return async (dispatch:any) => {
        try {
            dispatch({type : ADD_EDUCATION_REQUEST});
            let storageKey:string | null = UserUtil.getStorageKey();
            if(storageKey){
                AuthUtil.setTokenHeader(storageKey);
                let dataURL:string = `${process.env.REACT_APP_EXPRESS_SERVER_URL}/api/profiles/education`;
                let response = await axios.put(dataURL, education);
                dispatch({
                    type : ADD_EDUCATION_SUCCESS,
                    payload : {
                        profile : response.data.profile
                    }
                });
                history.push('/profiles/dashboard');
                dispatch(alertActions.setAlert(response.data.msg , 'success'));
            }
        }
        catch (error) {
            console.error(error);
            dispatch({
                type : ADD_EDUCATION_FAILURE,
                payload : {
                    error : error
                }
            });
        }
    };
};

// add Experience - PRIVATE
export const addExperience = (experience:any, history:any) => {
    return async (dispatch:any) => {
        try {
            dispatch({type : ADD_EXPERIENCE_REQUEST});
            let storageKey:string | null = UserUtil.getStorageKey();
            if(storageKey){
                AuthUtil.setTokenHeader(storageKey);
                let dataURL:string = `${process.env.REACT_APP_EXPRESS_SERVER_URL}/api/profiles/experience`;
                let response = await axios.put(dataURL, experience);
                dispatch({
                    type : ADD_EXPERIENCE_SUCCESS,
                    payload : {
                        profile : response.data.profile
                    }
                });
                history.push('/profiles/dashboard');
                dispatch(alertActions.setAlert(response.data.msg , 'success'));
            }
        }
        catch (error) {
            console.error(error);
            dispatch({
                type : ADD_EXPERIENCE_FAILURE,
                payload : {
                    error : error
                }
            });
        }
    };
};
