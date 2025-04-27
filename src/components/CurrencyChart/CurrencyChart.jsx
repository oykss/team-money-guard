import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import css from './CurrencyChart.module.css';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Filler);

export default function CurrencyChart() {
  const dataPoints = [3, 13, 10, 23, 17];

  const pointRadius = dataPoints.map((_, index) => (index === 1 || index === 3 ? 5 : 0));
  const pointHoverRadius = dataPoints.map((_, index) =>
    index === 1 || index === 3 ? 7 : 0
  );

  const data = {
    labels: [0, 1, 2, 3, 4],
    datasets: [
      {
        label: 'Dataset',
        data: dataPoints,
        fill: true,
        borderColor: '#e673c7',
        backgroundColor: ctx => {
          const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, '#e0b3ff55');
          gradient.addColorStop(1, '#1c124055');
          return gradient;
        },
        tension: 0.4,
        pointBackgroundColor: '#3b2c68',
        pointBorderColor: '#ff868d',
        pointBorderWidth: 2,
        pointRadius,
        pointHoverRadius,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { display: false },
      y: { display: false },
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  };

  return (
    <div className={css.chart}>
      <Line data={data} options={options} />
    </div>
  );
}
