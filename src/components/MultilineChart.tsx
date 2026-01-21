import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { generateRandomColors } from '@/lib/chart';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface MultilineChartProps {
    labels: string[];
    datasets: { [key: string]: number }[][];
    title: string;
    labelforKey: string;
    yAxisLeftKey: string;
    yAxisRightKey: string;
}

export default function MultilineChart({
    labels,
    datasets,
    title,
    labelforKey,
    yAxisLeftKey,
    yAxisRightKey,
}: MultilineChartProps) {
    const teamColors = generateRandomColors(labels.length);

    const formattedDatasets = labels.flatMap((teamName, index) => {
        const colorSet = teamColors[index];
        const teamSeries = datasets[index];

        return [
            {
                label: `${teamName} - ${yAxisLeftKey}`,
                data: teamSeries.map((s) => s[yAxisLeftKey]),
                borderColor: colorSet.borderColor,
                backgroundColor: colorSet.backgroundColor,
                yAxisID: 'y',
                borderWidth: 2,
                pointStyle: 'circle',
                pointRadius: 5,
                tension: 0.3,
            },
            {
                label: `${teamName} - ${yAxisRightKey}`,
                data: teamSeries.map((s) => s[yAxisRightKey]),
                borderColor: colorSet.borderColor,
                backgroundColor: colorSet.backgroundColor,
                yAxisID: 'y1',
                borderDash: [5, 5], // 점선
                pointStyle: 'rect',
                pointRadius: 6,
                tension: 0.3,
            },
        ];
    });

    const options = {
        responsive: true,
        interaction: {
            mode: 'nearest' as const,
            intersect: false,
        },
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    usePointStyle: true,
                    boxWidth: 10,
                },
            },
            tooltip: {
                callbacks: {
                    title: (context: any) => {
                        const dataIdx = context[0].dataIndex;
                        const teamIdx = Math.floor(context[0].datasetIndex / 2);
                        const xVal = datasets[teamIdx][dataIdx][labelforKey];
                        return `${labelforKey.toUpperCase()}: ${xVal}`;
                    },
                    label: function (context: any) {
                        const datasetIndex = context.datasetIndex;
                        const teamIdx = Math.floor(datasetIndex / 2);
                        const dataIdx = context.dataIndex;
                        const teamName = labels[teamIdx];
                        const item = datasets[teamIdx][dataIdx];

                        return [
                            `[ ${teamName} ]`,
                            `• ${yAxisLeftKey}: ${item[yAxisLeftKey]}`,
                            `• ${yAxisRightKey}: ${item[yAxisRightKey]}`,
                        ];
                    },
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: labelforKey
                },
            },
            y: {
                type: 'linear' as const,
                display: true,
                position: 'left' as const,
                title: { display: true, text: yAxisLeftKey.toUpperCase() },
            },
            y1: {
                type: 'linear' as const,
                display: true,
                position: 'right' as const,
                title: { display: true, text: yAxisRightKey.toUpperCase() },
                grid: { drawOnChartArea: false },
            },
        },
    };

    const xAxisLabels = datasets[0]?.map((item) => `${item[labelforKey]}`) || [];

    return (
        <div style={{ width: '100%', maxWidth: '800px', height: '100%', maxHeight: '800px' }}>
            <h3>{title}</h3>
            <Line data={{ labels: xAxisLabels, datasets: formattedDatasets }} options={options} />
        </div>
    );
} 