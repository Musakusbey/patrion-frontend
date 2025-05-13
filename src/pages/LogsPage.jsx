import React, { useEffect } from "react";

const LogsPage = () => {
  useEffect(() => {
    const token = localStorage.getItem("token"); // Login olunca localStorage'a kaydedilmiş olmalı
    fetch("http://localhost:3000/logs", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📜 Log Sayfası</h2>
      <p>Bu sayfayı açtığın için log kaydı oluşturuldu!</p>
    </div>
  );
};

export default LogsPage;
