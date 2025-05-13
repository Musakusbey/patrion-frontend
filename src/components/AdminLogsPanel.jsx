import React, { useEffect, useState } from "react";
import socket from "../socket";

const AdminLogsPanel = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mostFrequentAction, setMostFrequentAction] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    fetch("http://localhost:3000/logs", {
      headers: {
        Authorization: `Bearer ${JSON.stringify(user)}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setLogs(data.data);
        calculateMostFrequentAction(data.data);
        setLoading(false);
      });

    socket.on("sensor_data", data => {
      const action = `${data.sensor_id} - ${data.temperature}°C / ${data.humidity}%`;
      const newLog = {
        id: Date.now(),
        userId: user.userId,
        action,
        timestamp: new Date().toISOString(),
      };
      setLogs(prev => {
        const updatedLogs = [newLog, ...prev];
        calculateMostFrequentAction(updatedLogs);
        return updatedLogs;
      });
    });

    return () => {
      socket.off("sensor_data");
    };
  }, []);

  const calculateMostFrequentAction = logs => {
    const counts = {};
    logs.forEach(log => {
      counts[log.action] = (counts[log.action] || 0) + 1;
    });

    let maxAction = null;
    let maxCount = 0;
    for (const action in counts) {
      if (counts[action] > maxCount) {
        maxCount = counts[action];
        maxAction = action;
      }
    }

    if (maxAction) {
      setMostFrequentAction(`${maxAction} (${maxCount} kez)`);
    }
  };

  const lastLogs = logs.slice(0, 4); // sadece son 4 log

  return (
    <div className="logs-box">
      <h2>
        🗂️ <span style={{ color: "#f1f5f9" }}>Sistem Logları</span>
      </h2>

      {mostFrequentAction && (
        <div style={{ marginBottom: "16px", fontWeight: "bold" }}>
          <span role="img" aria-label="brain">
            🧠
          </span>{" "}
          <span style={{ color: "#e0e7ff" }}>En sık yapılan işlem:</span>{" "}
          <span className="highlight">{mostFrequentAction}</span>
        </div>
      )}

      {loading ? (
        <p>Yükleniyor...</p>
      ) : (
        <>
          <div className="subtitle">✅ Son Yapılan İşlemler:</div>
          <ul>
            {lastLogs.map(log => (
              <li key={log.id}>
                [{new Date(log.timestamp).toLocaleString()}] User #{log.userId}{" "}
                → {log.action}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default AdminLogsPanel;
