import { Line } from 'react-chartjs-2';
import { useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { convertToPercentage, generateRandomColors } from '@/lib/chart';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

interface AreaChartProps {
    labels: string[];
    datasets: { [key: string]: number }[];
    labelforData: string[];
    title: string;
}

export default function AreaChart({ labels, datasets, labelforData, title }: AreaChartProps) {
    const startHue = useRef<number>(Math.floor(Math.random() * 360));
    const colors = generateRandomColors(labelforData.length, startHue.current);

    const chartData = {
        labels,
        datasets: labelforData.map((category, index) => ({
            fill: true,
            label: category,
            data: convertToPercentage(datasets).map(item => item[category]),
            backgroundColor: colors[index].backgroundColor,
            borderColor: colors[index].borderColor,
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 3,
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
        <div style={{ width: '100%', maxWidth: '800px' }}>
            <h3>{title}</h3>
            <Line data={chartData} options={options} />
        </div>
    );
}