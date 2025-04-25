import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { formatNumber, getCategoryColor } from '../../constants';

import s from "./StatisticsTab.module.css"

ChartJS.register(ArcElement, Tooltip, Legend);

const centerTextPlugin = {
  id: 'centerText',
  beforeDraw: (chart) => {
    const { width } = chart;
    const { height } = chart;
    const ctx = chart.ctx;
    ctx.restore();
    const fontSize = '18px';
    ctx.font = `${fontSize} sans-serif`;
    ctx.textBaseline = 'middle';

    const text = chart.config.options.plugins.centerText.text;
    const textX = Math.round((width - ctx.measureText(text).width) / 2);
    const textY = height / 2;

    ctx.fillStyle = '#FBFBFB';
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
            display: false,
        },
    },
    cutout: '70%',
  };

  return <Doughnut className={s.chart} data={data} options={options} plugins={[centerTextPlugin]} />;
};

export default Chart;
