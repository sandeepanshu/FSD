import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/rootReducer"; // adjust path if needed

const Alert: React.FC = () => {
  // Get alerts from Redux store
  const { alerts } = useSelector((state: RootState) => state.alertKey);

  if (!alerts || alerts.length === 0) return null;

  return (
    <div
      className={`alert alert-${alerts[0].color} alert-dismissible fade show animated slideInDown fixed-top`}
      role="alert"
      style={{ zIndex: 9999 }}
    >
      {alerts.map((alert) => (
        <div key={alert.id}>
          <strong>{alert.message}</strong>
        </div>
      ))}

      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  );
};

export default Alert;
