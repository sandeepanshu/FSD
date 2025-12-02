import * as developerActions from './develper.actions';
import {IDeveloper} from "../../modules/developers/models/IDeveloper";

export interface DeveloperState {
    loading : boolean;
    developers : IDeveloper[];
    selectedDeveloper : IDeveloper;
    error : string;
}
let initialState:DeveloperState = {
    loading : false,
    developers : [] as IDeveloper[],
    selectedDeveloper : {} as IDeveloper,
    error : ''
};
export const reducer = (state = initialState , action:any):DeveloperState => {
    switch(action.type) {
        // get all developers
        case developerActions.GET_ALL_DEVELOPERS_REQUEST:
            return  {
                ...state,
                loading : true
            };
        case developerActions.GET_ALL_DEVELOPERS_SUCCESS:
            return  {
                ...state,
                loading : false,
                developers : action.payload.profiles
            };
        case developerActions.GET_ALL_DEVELOPERS_FAILURE:
            return  {
                ...state,
                loading : false,
                error : action.payload.error
            };
        // get developer
        case developerActions.GET_DEVELOPER_REQUEST:
            return  {
                ...state,
                loading : true
            };
        case developerActions.GET_DEVELOPER_SUCCESS:
            return  {
                ...state,
                loading : false,
                selectedDeveloper : action.payload.profile
            };
        case developerActions.GET_DEVELOPER_FAILURE:
            return  {
                ...state,
                loading : false,
                error : action.payload.error
            };
        default : return state;
    }
};