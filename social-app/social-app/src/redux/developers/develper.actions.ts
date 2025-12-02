import axios from 'axios';

export const GET_ALL_DEVELOPERS_REQUEST:string = 'GET_ALL_DEVELOPERS_REQUEST'
export const GET_ALL_DEVELOPERS_SUCCESS:string = 'GET_ALL_DEVELOPERS_SUCCESS'
export const GET_ALL_DEVELOPERS_FAILURE:string = 'GET_ALL_DEVELOPERS_FAILURE'

export const GET_DEVELOPER_REQUEST:string = 'GET_DEVELOPER_REQUEST'
export const GET_DEVELOPER_SUCCESS:string = 'GET_DEVELOPER_SUCCESS'
export const GET_DEVELOPER_FAILURE:string = 'GET_DEVELOPER_FAILURE'

export const getAllDevelopers = () => {
    return async (dispatch:any) => {
        try {
            dispatch({type : GET_ALL_DEVELOPERS_REQUEST});
            let dataURL:string = `${process.env.REACT_APP_EXPRESS_SERVER_URL}/api/profiles/all`;
            let response = await axios.get(dataURL);
            dispatch({
                type : GET_ALL_DEVELOPERS_SUCCESS,
                payload : {
                    profiles : response.data.profiles
                }
            });
        }
        catch (error) {
            console.error(error);
            dispatch({
                type : GET_ALL_DEVELOPERS_FAILURE,
                payload : {
                    error : error
                }
            })
        }
    };
};

export const getDeveloper = (profileId : string) => {
    return async (dispatch:any) => {
        try {
            dispatch({type : GET_DEVELOPER_REQUEST});
            let dataURL:string = `${process.env.REACT_APP_EXPRESS_SERVER_URL}/api/profiles/${profileId}`;
            let response = await axios.get(dataURL);
            dispatch({
                type : GET_DEVELOPER_SUCCESS,
                payload : {
                    profile : response.data.profile
                }
            });
        }
        catch (error) {
            console.error(error);
            dispatch({
                type : GET_DEVELOPER_FAILURE,
                payload : {
                    error : error
                }
            })
        }
    };
};