import axios from 'axios';
import {UserUtil} from "../../authUtil/UserUtil";
import {AuthUtil} from "../../authUtil/AuthUtil";
import * as alertActions from '../../redux/alerts/alert.actions';

export const CREATE_POST_REQUEST:string = 'CREATE_POST_REQUEST';
export const CREATE_POST_SUCCESS:string = 'CREATE_POST_SUCCESS';
export const CREATE_POST_FAILURE:string = 'CREATE_POST_FAILURE';

export const GET_ALL_POSTS_REQUEST:string = 'GET_ALL_POSTS_REQUEST';
export const GET_ALL_POSTS_SUCCESS:string = 'GET_ALL_POSTS_SUCCESS';
export const GET_ALL_POSTS_FAILURE:string = 'GET_ALL_POSTS_FAILURE';

export const LIKE_POST_REQUEST:string = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS:string = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE:string = 'LIKE_POST_FAILURE';

export const DISLIKE_POST_REQUEST:string = 'DISLIKE_POST_REQUEST';
export const DISLIKE_POST_SUCCESS:string = 'DISLIKE_POST_SUCCESS';
export const DISLIKE_POST_FAILURE:string = 'DISLIKE_POST_FAILURE';

export const DELETE_POST_REQUEST:string = 'DELETE_POST_REQUEST';
export const DELETE_POST_SUCCESS:string = 'DELETE_POST_SUCCESS';
export const DELETE_POST_FAILURE:string = 'DELETE_POST_FAILURE';

export const GET_POST_REQUEST:string = 'GET_POST_REQUEST';
export const GET_POST_SUCCESS:string = 'GET_POST_SUCCESS';
export const GET_POST_FAILURE:string = 'GET_POST_FAILURE';

export const CREATE_COMMENT_REQUEST:string = 'CREATE_COMMENT_REQUEST';
export const CREATE_COMMENT_SUCCESS:string = 'CREATE_COMMENT_SUCCESS';
export const CREATE_COMMENT_FAILURE:string = 'CREATE_COMMENT_FAILURE';

export const DELETE_COMMENT_REQUEST:string = 'DELETE_COMMENT_REQUEST';
export const DELETE_COMMENT_SUCCESS:string = 'DELETE_COMMENT_SUCCESS';
export const DELETE_COMMENT_FAILURE:string = 'DELETE_COMMENT_FAILURE';

// Create Post - PRIVATE
export const createPost = (post:any) => {
    return async (dispatch:any) => {
        try {
            dispatch({type : CREATE_POST_REQUEST});
            let storageKey:string | null = UserUtil.getStorageKey();
            if(storageKey){
                AuthUtil.setTokenHeader(storageKey);
                let dataURL:string = `${process.env.REACT_APP_EXPRESS_SERVER_URL}/api/posts/`;
                let response = await axios.post(dataURL, post);
                dispatch({
                    type : CREATE_POST_SUCCESS,
                    payload : {
                        post : response.data.post
                    }
                });
                console.log(response.data);
                dispatch(alertActions.setAlert(response.data.msg , 'success'));
            }
        }
        catch (error) {
            console.error(error);
            dispatch({
                type : CREATE_POST_FAILURE,
                payload : {
                    error : error
                }
            });
        }
    };
};

// Get All Posts - PRIVATE
export const getAllPosts = () => {
    return async (dispatch:any) => {
        try {
            dispatch({type : GET_ALL_POSTS_REQUEST});
            let storageKey:string | null = UserUtil.getStorageKey();
            if(storageKey){
                AuthUtil.setTokenHeader(storageKey);
                let dataURL:string = `${process.env.REACT_APP_EXPRESS_SERVER_URL}/api/posts/`;
                let response = await axios.get(dataURL);
                dispatch({
                    type : GET_ALL_POSTS_SUCCESS,
                    payload : {
                        posts : response.data.posts
                    }
                });
            }
        }
        catch (error) {
            console.error(error);
            dispatch({
                type : GET_ALL_POSTS_FAILURE,
                payload : {
                    error : error
                }
            });
        }
    };
};

// Like a Post - PRIVATE
export const likePost = (postId:string) => {
    return async (dispatch:any) => {
        try {
            dispatch({type : LIKE_POST_REQUEST});
            let storageKey:string | null = UserUtil.getStorageKey();
            if(storageKey){
                AuthUtil.setTokenHeader(storageKey);
                let dataURL:string = `${process.env.REACT_APP_EXPRESS_SERVER_URL}/api/posts/like/${postId}`;
                let response = await axios.put(dataURL, postId);
                dispatch({
                    type : LIKE_POST_SUCCESS,
                    payload : {
                        post : response.data.post
                    }
                });
            }
        }
        catch (error) {
            console.error(error);
            dispatch({
                type : LIKE_POST_FAILURE,
                payload : {
                    error : error
                }
            });
        }
    };
};

// DisLike a Post - PRIVATE
export const disLikePost = (postId:string) => {
    return async (dispatch:any) => {
        try {
            dispatch({type : DISLIKE_POST_REQUEST});
            let storageKey:string | null = UserUtil.getStorageKey();
            if(storageKey){
                AuthUtil.setTokenHeader(storageKey);
                let dataURL:string = `${process.env.REACT_APP_EXPRESS_SERVER_URL}/api/posts/unlike/${postId}`;
                let response = await axios.put(dataURL, postId);
                dispatch({
                    type : DISLIKE_POST_SUCCESS,
                    payload : {
                        post : response.data.post
                    }
                });
            }
        }
        catch (error) {
            console.error(error);
            dispatch({
                type : DISLIKE_POST_FAILURE,
                payload : {
                    error : error
                }
            });
        }
    };
};

// Delete a Post - PRIVATE
export const deletePost = (postId:string) => {
    return async (dispatch:any) => {
        try {
            dispatch({type : DELETE_POST_REQUEST});
            let storageKey:string | null = UserUtil.getStorageKey();
            if(storageKey){
                AuthUtil.setTokenHeader(storageKey);
                let dataURL:string = `${process.env.REACT_APP_EXPRESS_SERVER_URL}/api/posts/${postId}`;
                let response = await axios.delete(dataURL);
                dispatch({
                    type : DELETE_POST_SUCCESS,
                    payload : {
                        post : response.data.post
                    }
                });
                dispatch(alertActions.setAlert(response.data.msg , 'success'));
            }
        }
        catch (error) {
            console.error(error);
            dispatch({
                type : DELETE_POST_FAILURE,
                payload : {
                    error : error
                }
            });
        }
    };
};

// Get a Post - PRIVATE
export const getPost = (postId:string) => {
    return async (dispatch:any) => {
        try {
            dispatch({type : GET_POST_REQUEST});
            let storageKey:string | null = UserUtil.getStorageKey();
            if(storageKey){
                AuthUtil.setTokenHeader(storageKey);
                let dataURL:string = `${process.env.REACT_APP_EXPRESS_SERVER_URL}/api/posts/${postId}`;
                let response = await axios.get(dataURL);
                dispatch({
                    type : GET_POST_SUCCESS,
                    payload : {
                        post : response.data.post
                    }
                });
            }
        }
        catch (error) {
            console.error(error);
            dispatch({
                type : GET_POST_FAILURE,
                payload : {
                    error : error
                }
            });
        }
    };
};

// Create Comment to a Post - PRIVATE
export const createComment = (postId:string, comment : any) => {
    return async (dispatch:any) => {
        try {
            dispatch({type : CREATE_COMMENT_REQUEST});
            let storageKey:string | null = UserUtil.getStorageKey();
            if(storageKey){
                AuthUtil.setTokenHeader(storageKey);
                let dataURL:string = `${process.env.REACT_APP_EXPRESS_SERVER_URL}/api/posts/comment/${postId}`;
                let response = await axios.post(dataURL, comment);
                dispatch({
                    type : CREATE_COMMENT_SUCCESS,
                    payload : {
                        post : response.data.post
                    }
                });
                dispatch(alertActions.setAlert(response.data.msg , 'success'));
            }
        }
        catch (error) {
            console.error(error);
            dispatch({
                type : CREATE_COMMENT_FAILURE,
                payload : {
                    error : error
                }
            });
        }
    };
};

// Delete a Comment - PRIVATE
export const deleteComment = (postId:string, commentId:string) => {
    return async (dispatch:any) => {
        try {
            dispatch({type : DELETE_COMMENT_REQUEST});
            let storageKey:string | null = UserUtil.getStorageKey();
            if(storageKey){
                AuthUtil.setTokenHeader(storageKey);
                let dataURL:string = `${process.env.REACT_APP_EXPRESS_SERVER_URL}/api/posts/comment/${postId}/${commentId}`;
                let response = await axios.delete(dataURL);
                dispatch({
                    type : DELETE_COMMENT_SUCCESS,
                    payload : {
                        post : response.data.post
                    }
                });
                dispatch(alertActions.setAlert(response.data.msg , 'success'));
            }
        }
        catch (error) {
            console.error(error);
            dispatch({
                type : DELETE_COMMENT_FAILURE,
                payload : {
                    error : error
                }
            });
        }
    };
};