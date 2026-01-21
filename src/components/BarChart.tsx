import { Bar } from 'react-chartjs-2';
import { useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { generateRandomColors } from '@/lib/chart';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarChartProps {
    labels: string[];
    datasets: number[];
    labelforData: string;
    title: string;
}

export default function BarChart({ labels, datasets, labelforData, title }: BarChartProps) {
    const startHue = useRef<number>(Math.floor(Math.random() * 360));
    const colors = generateRandomColors(datasets.length, startHue.current);
    const chartData = {
        labels,
        datasets: [
            {
                label: labelforData,
                data: datasets,
                backgroundColor: colors.map((color) => color.backgroundColor),
                borderColor: colors.map((color) => color.borderColor),
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
        },
    };

    return (
        <div style={{ width: '100%', maxWidth: '800px' }}>
            <h3>{title}</h3>
            <Bar data={chartData} options={options} />
        </div>
    );
}