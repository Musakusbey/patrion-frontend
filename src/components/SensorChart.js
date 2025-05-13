// src/components/SensorChart.js
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const SensorChart = ({ data }) => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Sıcaklık (°C)',
                data: [],
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.3,
            },
            {
                label: 'Nem (%)',
                data: [],
                borderColor: 'rgb(54, 162, 235)',
                tension: 0.3,
            },
        ],
    });

    useEffect(() => {
        if (data) {
            setChartData((prev) => {
                const newLabels = [...prev.labels, new Date().toLocaleTimeString()].slice(-10);
                const newTempData = [...prev.datasets[0].data, data.temperature].slice(-10);
                const newHumidityData = [...prev.datasets[1].data, data.humidity].slice(-10);

                return {
                    labels: newLabels,
                    datasets: [
                        { ...prev.datasets[0], data: newTempData },
                        { ...prev.datasets[1], data: newHumidityData },
                    ],
                };
            });
        }
    }, [data]);

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '30px' }}>
            <Line data={chartData} />
        </div>
    );
};

export default SensorChart;
