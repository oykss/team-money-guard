import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { selectSummary } from '../../store/statistics/selectors';
import { formatNumber } from '../../utils/formatNumber';
import { getCategoryColor } from '../../utils/getCategoryColor';
import css from './StatisticsChart.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const centerTextPlugin = {
  id: 'centerText',
  beforeDraw: chart => {
    const { width } = chart;
    const { height } = chart;
    const ctx = chart.ctx;
    ctx.restore();
    const fontSize = (height / 250).toFixed(2);
    ctx.font = `${fontSize}em sans-serif`;
    ctx.textBaseline = 'middle';

    const text = chart.config.options.plugins.centerText.text;
    const textX = Math.round((width - ctx.measureText(text).width) / 2);
    const textY = height / 2;

    ctx.fillStyle = '#FBFBFB';
    ctx.fillText(text, textX, textY);
    ctx.save();
  },
};

export default function StatisticsChart() {
  const summary = useSelector(selectSummary);
  const { expense = [], balance = 0 } = summary;

  const hasExpenses = expense.length > 0 && expense.some(category => category.total > 0);

  const color = expense.map(category => getCategoryColor(category.title));

  const data = hasExpenses
    ? {
        labels: expense.map(category => category.title),
        datasets: [
          {
            label: 'Expense total',
            data: expense.map(category => category.total),
            backgroundColor: color,
            borderColor: color,
          },
        ],
      }
    : {
        labels: ['No data'],
        datasets: [
          {
            label: 'No data',
            data: [1],
            backgroundColor: 'rgba(82, 59, 126, 0.6)',
            borderColor: 'rgba(82, 59, 126, 0.6)',
          },
        ],
      };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      centerText: {
        text: formatNumber(balance, { currency: true }),
      },
      legend: {
        display: false,
      },
    },
    cutout: '70%',
  };

  return (
    <div className={css.chart}>
      <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />
    </div>
  );
}
