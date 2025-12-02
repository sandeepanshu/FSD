import { v4 as uuid } from "uuid";
import { addAlert, removeAlert } from "./alert.slice";
import type { AppDispatch } from "../store";

export const setAlert =
  (message: string, color: "success" | "danger" | "warning" | "info") =>
  (dispatch: AppDispatch) => {
    const id = uuid();

    dispatch(
      addAlert({
        id,
        message,
        color,
      })
    );

    setTimeout(() => {
      dispatch(removeAlert(id));
    }, 3000);
  };
