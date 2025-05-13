import React, { useEffect, useState } from 'react';

function Logs({ token }) {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/logs', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log('📜 Loglar alındı:', data);
                setLogs(data.logs || []); // backend'den sadece `message` dönüyorsan uyarlayabiliriz
            })
            .catch(err => console.error('❌ Log alma hatası:', err));
    }, [token]);

    return (
        <div style={{ marginTop: '30px' }}>
            <h2>📘 Kullanıcı Logları</h2>
            {logs.length > 0 ? (
                <ul>
                    {logs.map((log, index) => (
                        <li key={index}>
                            [{new Date(log.timestamp).toLocaleString()}] → {log.action}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Henüz log bulunamadı.</p>
            )}
        </div>
    );
}

export default Logs;
