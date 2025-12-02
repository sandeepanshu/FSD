import { takeLatest, put, delay } from "redux-saga/effects";
import { v4 as uuidv4 } from "uuid";
import { SET_ALERT } from "./alert.types";
import { setAlertSuccess, removeAlertSuccess } from "./alert.slice";

interface AlertPayload {
  message: string;
  color: string;
}

function* handleSetAlert(action: { type: string; payload: AlertPayload }) {
  const id = uuidv4();

  yield put(
    setAlertSuccess({
      id,
      message: action.payload.message,
      color: action.payload.color,
    })
  );

  // auto remove after 3 seconds
  yield delay(3000);
  yield put(removeAlertSuccess(id));
}

export function* alertSaga() {
  yield takeLatest(SET_ALERT, handleSetAlert);
}
