import {combineReducers} from 'redux';
import * as developerReducer from './developers/developer.reducer';
import * as userReducer from './users/user.reducer';
import * as profileReducer from './profiles/profile.reducer';
import * as postReducer from './posts/post.reducer';
import * as alertReducer from './alerts/alert.reducer';

const rootReducer = combineReducers({
    developerKey : developerReducer.reducer,
    userKey : userReducer.reducer,
    profileKey : profileReducer.reducer,
    postKey : postReducer.reducer,
    alertKey : alertReducer.reducer
});
export default rootReducer;