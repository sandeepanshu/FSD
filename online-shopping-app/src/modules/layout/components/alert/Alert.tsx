import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../../../redux/store";
import { removeAlert } from "../../../../redux/alert/alert.slice";

const Alert: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { alerts } = useSelector((state: RootState) => state.alerts);

  // Auto dismiss after 2 seconds
  useEffect(() => {
    if (alerts.length > 0) {
      const timer = setTimeout(() => {
        dispatch(removeAlert(alerts[0].id)); // remove the first alert
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [alerts, dispatch]);

  return (
    <>
      {alerts.length > 0 && (
        <div
          className={`alert alert-${alerts[0].color} alert-dismissible m-3 fixed-top animated slideInDown`}
        >
          <button
            type="button"
            className="btn-close"
            onClick={() => dispatch(removeAlert(alerts[0].id))}
          />
          {alerts.map((alert) => (
            <div key={alert.id}>
              <small className="font-weight-bold">{alert.message}</small>
              <br />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Alert;
