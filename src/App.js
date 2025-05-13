import React, { useEffect, useState } from "react";
import socket from "./socket";
import SensorChart from "./components/SensorChart";
import AdminLogsPanel from "./components/AdminLogsPanel";
import "./App.css";

function App() {
  const [sensorData, setSensorData] = useState(null);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("🟢 WebSocket bağlantısı kuruldu");
    });

    socket.on("sensor_data", (data) => {
      console.log("📡 Veri alındı:", data);
      setSensorData(data);
    });

    return () => {
      socket.off("connect");
      socket.off("sensor_data");
    };
  }, []);

  return (
    <div className="app-bg">
      <div className="container">
        <h1>🔧 Akıllı Sensör Takip Paneli</h1>

        {sensorData ? (
          <>
            <div className="sensor-info">
              <p><strong>Sensor ID:</strong> {sensorData.sensor_id}</p>
              <p><strong>Sıcaklık:</strong> {sensorData.temperature}°C</p>
              <p><strong>Nem:</strong> {sensorData.humidity}%</p>
            </div>

            {sensorData.temperature > 30 && (
              <div className="alert">
                ⚠️ Yüksek sıcaklık tespit edildi: {sensorData.temperature}°C
              </div>
            )}

            {/* 🎯 Grafik bileşeni burada */}
            <div className="chart-container">
              <SensorChart data={sensorData} />
            </div>
          </>
        ) : (
          <p className="sensor-info">Veri bekleniyor...</p>
        )}

        <button
          className="send-button"
          onClick={() => {
            socket.emit("sensor_data", {
              sensor_id: "temp_sensor_01",
              temperature: 35,
              humidity: 70,
            });
          }}
        >
          WebSocket ile Veri Gönder
        </button>

        <AdminLogsPanel />
      </div>
    </div>
  );
}

export default App;
