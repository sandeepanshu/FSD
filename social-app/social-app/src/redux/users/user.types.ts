import type { UserView } from "../../modules/users/models/UserView";

export interface UserState {
  loading: boolean;
  user: UserView | null;
  isAuthenticated: boolean;
  token: string | null;
  error: string | null;
  isRegistered: boolean;
}

// Redux Saga Trigger Actions
export const REGISTER_USER = "user/REGISTER_USER";
export const LOGIN_USER = "user/LOGIN_USER";
export const GET_USER_INFO = "user/GET_USER_INFO";
export const LOGOUT_USER = "user/LOGOUT_USER";

// Payloads
export interface RegisterPayload {
  user: UserView;
}

export interface LoginPayload {
  user: UserView;
}
