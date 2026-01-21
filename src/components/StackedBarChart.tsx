import { Bar } from 'react-chartjs-2';
import { useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, scales } from 'chart.js';
import { convertToPercentage, generateRandomColors } from '@/lib/chart';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface StackedBarChartProps {
    labels: string[];
    datasets: { [key: string]: number }[];
    labelforData: string[];
    title: string;
}

export default function StackedBarChart({ labels, datasets, labelforData, title }: StackedBarChartProps) {
    const startHue = useRef<number>(Math.floor(Math.random() * 360));
    const colors = generateRandomColors(datasets.length, startHue.current);
    const chartData = {
        labels,
        datasets: labelforData.map((category, index) => ({
            label: category,
            data: convertToPercentage(datasets).map(item => item[category]),
            backgroundColor: colors[index].backgroundColor,
            borderColor: colors[index].borderColor,
            borderWidth: 2,
        })),
    };

    const options = {
        responsive: true,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
        plugins: {
            legend: {
                position: 'top' as const,
            },
        },
    };

    return (
        <div style={{ width: '100%', maxWidth: '900px' }}>
            <h3>{title}</h3>
            <Bar data={chartData} options={options} />
        </div>
    );
}