import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  
const LineChart = ({historyData,name}) => {
  const data = {
    labels: historyData && Object.keys(historyData)?.map(v=>v),
    datasets: [
      {
        label: 'Exchange Rate Data',
        data: historyData && Object.keys(historyData)?.map(v=> historyData?.[v]?.[name] ),
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.9)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="chart-container">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
