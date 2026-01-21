import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { generateRandomColors } from '@/lib/chart';
import { useRef } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
    labels: string[];
    datasets: number[];
    labelforData: string;
    title: string;
}

export default function DoughnutChart({ labels, datasets, labelforData, title }: DoughnutChartProps) {
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
            <Doughnut data={chartData} options={options} />
        </div>
    );
}