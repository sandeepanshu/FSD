import type { NavigateFunction } from "react-router-dom";
import type { UserView } from "../../modules/users/models/UserView";

export interface UserState {
  loading: boolean;
  user: UserView | null;
  isAuthenticated: boolean;
  token: string | null;
  error: string | null;
}

// Action types (Saga triggers)
export const REGISTER_USER = "user/REGISTER_USER";
export const LOGIN_USER = "user/LOGIN_USER";
export const GET_USER_INFO = "user/GET_USER_INFO";
export const LOGOUT_USER = "user/LOGOUT_USER";

export interface RegisterPayload {
  user: UserView;
  navigate: NavigateFunction;
}

export interface LoginPayload {
  user: UserView;
  navigate: NavigateFunction;
}
