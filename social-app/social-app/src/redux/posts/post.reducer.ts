import * as postActions from './post.actions';
import {PostView} from "../../modules/posts/models/PostView";

export interface PostState {
    loading :boolean;
    posts : PostView[];
    selectedPost : PostView;
    error : string;
}
let initialState:PostState = {
    loading : false,
    posts : [] as PostView[],
    selectedPost : {} as PostView,
    error : ''
};

export const reducer = (state=initialState , action:any):PostState => {
    switch(action.type) {
        // create a post
        case postActions.CREATE_POST_REQUEST:
            return {
                ...state,
                loading : true
            };
        case postActions.CREATE_POST_SUCCESS:
            return {
                ...state,
                loading : false,
                posts : [action.payload.post , ...state.posts]
            };
        case postActions.CREATE_POST_FAILURE:
            return {
                ...state,
                loading : false,
                error : action.payload.error
            };
        // Get all Posts
        case postActions.GET_ALL_POSTS_REQUEST:
            return {
                ...state,
                loading : true
            };
        case postActions.GET_ALL_POSTS_SUCCESS:
            return {
                ...state,
                loading : false,
                posts : action.payload.posts
            };
        case postActions.GET_ALL_POSTS_FAILURE:
            return {
                ...state,
                loading : false,
                error : action.payload.error
            };
        // Like a Post
        case postActions.LIKE_POST_REQUEST:
            return {
                ...state,
                loading : false
            };
        case postActions.LIKE_POST_SUCCESS:
            let likedPosts:PostView[] = state.posts.map(post => {
                if(post._id === action.payload.post._id){
                    return action.payload.post;
                }
                return post;
            });
            return {
                ...state,
                loading : false,
                posts : [...likedPosts]
            };
        case postActions.LIKE_POST_FAILURE:
            return {
                ...state,
                loading : false,
                error : action.payload.error
            };
        // DisLike a Post
        case postActions.DISLIKE_POST_REQUEST:
            return {
                ...state,
                loading : false
            };
        case postActions.DISLIKE_POST_SUCCESS:
            let disLikedPosts:PostView[] = state.posts.map(post => {
                if(post._id === action.payload.post._id){
                    return action.payload.post;
                }
                return post;
            });
            return {
                ...state,
                loading : false,
                posts : [...disLikedPosts]
            };
        case postActions.DISLIKE_POST_FAILURE:
            return {
                ...state,
                loading : false,
                error : action.payload.error
            };
        // Delete a Post
        case postActions.DELETE_POST_REQUEST:
            return {
                ...state,
                loading : true
            };
        case postActions.DELETE_POST_SUCCESS:
            let updatedPosts:PostView[] = state.posts.filter((post) => {
                return post._id !== action.payload.post._id
            });
            return {
                ...state,
                loading : false,
                posts : [...updatedPosts]
            };
        case postActions.DELETE_POST_FAILURE:
            return {
                ...state,
                loading : false,
                error : action.payload.error
            };
        // Get a Post
        case postActions.GET_POST_REQUEST:
            return {
                ...state,
                loading : true
            };
        case postActions.GET_POST_SUCCESS:
            return {
                ...state,
                loading : false,
                selectedPost : action.payload.post
            };
        case postActions.GET_POST_FAILURE:
            return {
                ...state,
                loading : false,
                error : action.payload.error
            };
        // Create Comment to a Post
        case postActions.CREATE_COMMENT_REQUEST:
            return {
                ...state,
                loading : true
            };
        case postActions.CREATE_COMMENT_SUCCESS:
            return {
                ...state,
                loading : false,
                selectedPost : action.payload.post
            };
        case postActions.CREATE_COMMENT_FAILURE:
            return {
                ...state,
                loading : false,
                error : action.payload.error
            };
        // Delete Comment to a Post
        case postActions.DELETE_COMMENT_REQUEST:
            return {
                ...state,
                loading : true
            };
        case postActions.DELETE_COMMENT_SUCCESS:
            return {
                ...state,
                loading : false,
                selectedPost : action.payload.post
            };
        case postActions.DELETE_COMMENT_FAILURE:
            return {
                ...state,
                loading : false,
                error : action.payload.error
            };
        default: return state;
    }
};