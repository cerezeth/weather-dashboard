import React from 'react';
import { Chart, CategoryScale, BarController, BarElement, ChartConfiguration, ChartOptions} from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
Chart.register(CategoryScale, BarController, BarElement);

interface BarChartProps {
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

const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
        tooltip: {
                      callbacks: {
                label: (context) => {
                    let label = context.dataset.label || '';
          
                    if (label) {
                        switch (label) {
                            case 'Hourly Relative Humidity':
                                return label = ` ${context.parsed.y} %`;;
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
                callback: (value) => `${value} %`,
            },
        },
        x: {
            beginAtZero: true,
        },
    }

}






const BarChart: React.FC<BarChartProps> = ({ data }) => {
    const chartConfig: ChartConfiguration<'bar'> = {
        type: 'bar',
        data: data,
        options: options,
    };

    return <Bar {...chartConfig} />;
};



export default BarChart