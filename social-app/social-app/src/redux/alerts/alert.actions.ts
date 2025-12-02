import { SET_ALERT } from "./alert.types";

export const setAlert = (message: string, color: string) => ({
  type: SET_ALERT,
  payload: { message, color },
});
