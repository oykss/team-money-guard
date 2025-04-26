import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler,
} from 'chart.js';
import css from './Chart.module.css';

//chart drawing

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Filler);

export function Chart() {
  const dataPoints = [3, 13, 10, 23, 17];

  //hide some dots
  const pointRadius = dataPoints.map((_, index) => {
    return index === 1 || index === 3 ? 5 : 0;
  });
  const pointHoverRadius = dataPoints.map((_, index) => {
    return index === 1 || index === 3 ? 7 : 0;
  });

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
          gradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
          gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)');
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

          return gradient;
        },
        tension: 0.4,
        pointBackgroundColor: '#3b2c68',
        pointBorderColor: '#e673c7',
        pointBorderWidth: 2,
        pointRadius: pointRadius,
        pointHoverRadius: pointHoverRadius,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
  };

  return (
    <div className={css.canvas}>
      <Line data={data} options={options} />
    </div>
  );
}
