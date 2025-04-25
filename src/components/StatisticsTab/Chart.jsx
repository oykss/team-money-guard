import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { formatNumber, getCategoryColor } from '../../constants';

ChartJS.register(ArcElement, Tooltip, Legend);

const centerTextPlugin = {
  id: 'centerText',
  beforeDraw: (chart) => {
    const { width } = chart;
    const { height } = chart;
    const ctx = chart.ctx;
    ctx.restore();
    const fontSize = (height / 150).toFixed(2);
    ctx.font = `${fontSize}em sans-serif`;
    ctx.textBaseline = 'middle';

    const text = chart.config.options.plugins.centerText.text;
    const textX = Math.round((width - ctx.measureText(text).width) / 2);
    const textY = height / 2;

    ctx.fillStyle = '#000';
    ctx.fillText(text, textX, textY);
    ctx.save();
  }
};

const Chart = () => {
  const summary = useSelector(state => state.statistics.summary);
  const { expense = [], balance = 0 } = summary;

  const data = {
    labels: expense.map(category => category.title),
    datasets: [
      {
        label: 'Expense total',
        data: expense.map(category => category.total),
        backgroundColor: expense.map(category => getCategoryColor(category.title)),
        borderWidth: 1,
      }
    ]
  };

  const options = {
    plugins: {
      centerText: {
        text: `₴ ${formatNumber(balance)} `,
      },
      legend: {
        position: 'bottom',
      },
    },
    cutout: '70%',
  };

  return <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />;
};

export default Chart;
