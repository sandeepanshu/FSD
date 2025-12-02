import * as profileActions from './profile.actions';
import {ProfileView} from "../../modules/profiles/models/ProfileView";

export interface ProfileState {
    loading : boolean;
    profile : ProfileView;
    error : string;
}
let initialState:ProfileState = {
    loading : false,
    profile : {} as ProfileView,
    error : ''
};
export const reducer = (state = initialState , action:any):ProfileState => {
    switch(action.type) {
        case profileActions.GET_MY_PROFILE_REQUEST:
            return {
                ...state,
                loading : true
            };
        case profileActions.GET_MY_PROFILE_SUCCESS:
            return {
                ...state,
                loading : false,
                profile : action.payload.profile
            };
        case profileActions.GET_MY_PROFILE_FAILURE:
            return {
                ...state,
                loading : false,
                error : action.payload.error
            };
        // clear profile
        case profileActions.CLEAR_PROFILE:
            return {
                ...state,
                profile : {} as ProfileView
            };
        // DELETE Experience
        case profileActions.DELETE_EXPERIENCE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case profileActions.DELETE_EXPERIENCE_SUCCESS:
            return {
                ...state,
                loading: false,
                profile : action.payload.profile
            };
        case profileActions.DELETE_EXPERIENCE_FAILURE:
            return {
                ...state,
                loading: false,
                error : action.payload.error
            };
        // DELETE Education
        case profileActions.DELETE_EDUCATION_REQUEST:
            return {
                ...state,
                loading: true
            };
        case profileActions.DELETE_EDUCATION_SUCCESS:
            return {
                ...state,
                loading: false,
                profile : action.payload.profile
            };
        case profileActions.DELETE_EDUCATION_FAILURE:
            return {
                ...state,
                loading: false,
                error : action.payload.error
            };
        // Create a Profile
        case profileActions.CREATE_PROFILE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case profileActions.CREATE_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                profile : action.payload.profile
            };
        case profileActions.CREATE_PROFILE_FAILURE:
            return {
                ...state,
                loading: false,
                error : action.payload.error
            };
        // Update a Profile
        case profileActions.UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case profileActions.UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                profile : action.payload.profile
            };
        case profileActions.UPDATE_PROFILE_FAILURE:
            return {
                ...state,
                loading: false,
                error : action.payload.error
            };
        // Add Education of a Profile
        case profileActions.ADD_EDUCATION_REQUEST:
            return {
                ...state,
                loading: true
            };
        case profileActions.ADD_EDUCATION_SUCCESS:
            return {
                ...state,
                loading: false,
                profile : action.payload.profile
            };
        case profileActions.ADD_EDUCATION_FAILURE:
            return {
                ...state,
                loading: false,
                error : action.payload.error
            };
        // Add Experience of a Profile
        case profileActions.ADD_EXPERIENCE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case profileActions.ADD_EXPERIENCE_SUCCESS:
            return {
                ...state,
                loading: false,
                profile : action.payload.profile
            };
        case profileActions.ADD_EXPERIENCE_FAILURE:
            return {
                ...state,
                loading: false,
                error : action.payload.error
            };
        default: return state;
    }
};