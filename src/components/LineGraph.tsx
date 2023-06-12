// src/components/LineGraph.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { useHistoricalData } from '../api/api';
import { Chart } from 'chart.js/auto';

// Import the linear scale from Chart.js
import { LinearScale } from 'chart.js';

// Register the linear scale globally
Chart.register(LinearScale);
const LineGraph: React.FC = () => {
  const { data: historicalData, isLoading } = useHistoricalData();

  if (isLoading || !historicalData) {
    return <div>Loading line graph...</div>;
  }

  const dates = Object.keys(historicalData.cases);
  const cases = Object.values(historicalData.cases);
  const deaths = Object.values(historicalData.deaths);
  const recovered = Object.values(historicalData.recovered);

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Cases',
        data: cases,
        borderColor: 'blue',
        fill: false,
      },
      {
        label: 'Deaths',
        data: deaths,
        borderColor: 'red',
        fill: false,
      },
      {
        label: 'Recovered',
        data: recovered,
        borderColor: 'green',
        fill: false,
      },
    ],
  };

  return <Line data={data} />;
};

export default LineGraph;
