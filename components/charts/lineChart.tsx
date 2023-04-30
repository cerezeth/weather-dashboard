import React from 'react';
import { Chart, CategoryScale, LinearScale, LineController, LineElement, PointElement, ChartConfiguration, ChartOptions } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
Chart.register(CategoryScale, LinearScale, LineController, LineElement, PointElement);

interface LineChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor: string;
    }[];
  };
}

const options: ChartOptions<'line'> = {
  responsive: true,
  plugins: {
    tooltip: {
      callbacks: {
        label: (context) => {
          let label = context.dataset.label || '';
          if (label) {
            switch (label) {
              case 'Daily Max':
                return label = ` ${context.parsed.y} °C`;
              case 'Daily Min':
                return label = ` ${context.parsed.y} °C`;
              default:
                return '';
            }
          }
          return label;
        }
      }
    }
  },
  scales: {
    y: {
      ticks: {
        callback: (value) => `${value} °C`,
      },
    },
  }
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const chartConfig: ChartConfiguration<'line'> = {
    type: 'line',
    data: data,
    options: options,
  };

  return <Line {...chartConfig} />;
};

export default LineChart;
