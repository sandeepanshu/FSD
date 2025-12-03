import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Alert as AntAlert } from "antd";
import type { RootState } from "../../redux/store";
import { removeAlert } from "../../redux/alerts/alert.slice";

const Alert: React.FC = () => {
  const alerts = useSelector((state: RootState) => state.alert.alerts);
  const dispatch = useDispatch();
  const [visibleAlerts, setVisibleAlerts] = useState<string[]>([]);

  // Auto removal of alerts
  useEffect(() => {
    alerts.forEach((alert) => {
      if (!visibleAlerts.includes(alert.id)) {
        setVisibleAlerts((prev) => [...prev, alert.id]);

        setTimeout(() => {
          dispatch(removeAlert(alert.id));
          setVisibleAlerts((prev) => prev.filter((id) => id !== alert.id));
        }, 3000);
      }
    });
  }, [alerts, dispatch, visibleAlerts]);

  if (alerts.length === 0) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 20,
        left: 0,
        right: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {alerts.map((alert) => (
        <AntAlert
          key={alert.id}
          title={alert.message}
          type={alert.color === "danger" ? "error" : alert.color}
          showIcon
          closable={{
            onClose: () => dispatch(removeAlert(alert.id)),
          }}
          style={{ marginBottom: 8, maxWidth: 500 }}
        />
      ))}
    </div>
  );
};

export default Alert;
