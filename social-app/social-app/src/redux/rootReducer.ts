import { combineReducers } from "redux";

import userReducer from "./users/user.slice";
// import profileReducer from "./profiles/profile.slice";
// import postReducer from "./posts/post.slice";
import developerReducer from "./developers/developer.slice";
import alertReducer from "./alerts/alert.slice";

const rootReducer = combineReducers({
  user: userReducer,
//   profile: profileReducer,
//   post: postReducer,
  developer: developerReducer,
  alert: alertReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
