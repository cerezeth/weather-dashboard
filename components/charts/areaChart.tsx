import React from 'react';
import { Chart, CategoryScale, LinearScale, LineController, LineElement, PointElement, ChartConfiguration, ChartOptions } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
Chart.register(CategoryScale, LinearScale, LineController, LineElement, PointElement);

interface AreaChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor: string;
      pointBackgroundColor?: string;
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
              case 'Direct Radiation':
                return label = ` ${context.parsed.y} W/m²`;;
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
        callback: (value) => `${value} W/m²`,
      },
    },
  }
}

const AreaChart: React.FC<AreaChartProps> = ({ data }) => {
  const chartConfig: ChartConfiguration<'line'> = {
    type: 'line',
    data: data,
    options: options,
  };

  return <Line {...chartConfig} />;
};

export default AreaChart;
