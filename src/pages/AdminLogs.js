// src/pages/AdminLogs.js
import React, { useEffect, useState } from 'react';

function AdminLogs() {
    const [logs, setLogs] = useState([]);
    const token = localStorage.getItem('token'); // Veya başka bir yerden alıyorsan güncelle

    useEffect(() => {
        fetch('http://localhost:3000/logs', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => setLogs(data.data || []))
            .catch((err) => console.error('Logları çekerken hata:', err));
    }, []);

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h2>📝 Log Kayıtları</h2>
            <table border="1" cellPadding="10" style={{ marginTop: '20px', width: '100%' }}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Kullanıcı ID</th>
                        <th>İşlem</th>
                        <th>Zaman</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log) => (
                        <tr key={log.id}>
                            <td>{log.id}</td>
                            <td>{log.userId}</td>
                            <td>{log.action}</td>
                            <td>{new Date(log.timestamp).toLocaleString('tr-TR')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminLogs;
