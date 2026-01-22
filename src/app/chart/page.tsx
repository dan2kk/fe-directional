"use client"
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { useGetChartData } from "@/lib/query";
import { useMemo } from "react";

import { topCoffeeBrandResData, popularSnackResData, weeklyMoodTrendResData, weeklyWorkoutTrendResData, coffeeConsumptionResData, snackImpactResData } from "@/types/api";
import BarChart from "@/components/BarChart";
import DoughnutChart from "@/components/DoughnutChart";
import StackedBarChart from "@/components/StackedBarChart";
import AreaChart from "@/components/AreaChart";
import MultilineChart from "@/components/MultilineChart";

interface ChartItem {
    chartData: any;
    isError: boolean;
    ChartComponent: React.ComponentType<any>;
}


export default function Chart() {
    const { data: chartData1, isError: isError1 } = useGetChartData<topCoffeeBrandResData>('top-coffee-brands');
    const { data: chartData2, isError: isError2 } = useGetChartData<popularSnackResData>('popular-snack-brands');
    const { data: chartData3, isError: isError3 } = useGetChartData<weeklyMoodTrendResData>('weekly-mood-trend');
    const { data: chartData4, isError: isError4 } = useGetChartData<weeklyWorkoutTrendResData>('weekly-workout-trend');
    const { data: chartData5, isError: isError5 } = useGetChartData<coffeeConsumptionResData>('coffee-consumption');
    const { data: chartData6, isError: isError6 } = useGetChartData<snackImpactResData>('snack-impact');

    const cachedChartData1 = useMemo(() => {
        if (!chartData1) return null;
        return {
            labels: chartData1.map((item) => item.brand),
            datasets: chartData1.map((item) => item.popularity),
            labelforData: "인기도",
            title: "커피 브랜드 인기도"
        }
    }, [chartData1]);

    const cachedChartData2 = useMemo(() => {
        if (!chartData2) return null;
        return {
            labels: chartData2.map((item) => item.name),
            datasets: chartData2.map((item) => item.share),
            labelforData: "점유율(%)",
            title: "과자 브랜드 점유율"
        }
    }, [chartData2]);

    const cachedChartData3 = useMemo(() => {
        if (!chartData3) return null;
        return {
            labels: chartData3.map((item) => item.week),
            datasets: chartData3.map(({ week, ...data }) => data),
            labelforData: Object.keys(chartData3[0]).filter(key => key !== 'week'),
            title: "주간 기분 추이"
        };
    }, [chartData3]);

    const cachedChartData4 = useMemo(() => {
        if (!chartData4) return null;
        return {
            labels: chartData4.map((item) => item.week),
            datasets: chartData4.map(({ week, ...data }) => data),
            labelforData: Object.keys(chartData4[0]).filter(key => key !== 'week'),
            title: "주간 운동 추이"
        }
    }, [chartData4]);

    const cachedChartData5 = useMemo(() => {
        if (!chartData5) return null;
        return {
            labels: chartData5.teams.map((item) => item.team),
            datasets: chartData5.teams.map(({ team, series }) => series),
            labelforKey: "cups",
            title: "주간 커피 소비 추이",
            yAxisLeftKey: "bugs",
            yAxisRightKey: "productivity"
        }
    }, [chartData5]);
    const cachedChartData6 = useMemo(() => {
        if (!chartData6) return null;
        return {
            labels: chartData6.departments.map((item) => item.name),
            datasets: chartData6.departments.map(({ name, metrics }) => metrics),
            labelforKey: "snacks",
            title: "주간 과자 영향 추이",
            yAxisLeftKey: "meetingsMissed",
            yAxisRightKey: "morale"
        }
    }, [chartData6]);
    const chartList = ["바 차트", "도넛 차트", "누적 바 차트", "면적 차트", "멀티 라인 차트"];

    const chartDataList = useMemo<ChartItem[]>(() => {
        return [
            { chartData: cachedChartData1, isError: isError1, ChartComponent: BarChart },
            { chartData: cachedChartData2, isError: isError2, ChartComponent: BarChart },
            { chartData: cachedChartData1, isError: isError1, ChartComponent: DoughnutChart },
            { chartData: cachedChartData2, isError: isError2, ChartComponent: DoughnutChart },
            { chartData: cachedChartData3, isError: isError3, ChartComponent: StackedBarChart },
            { chartData: cachedChartData4, isError: isError4, ChartComponent: StackedBarChart },
            { chartData: cachedChartData3, isError: isError3, ChartComponent: AreaChart },
            { chartData: cachedChartData4, isError: isError4, ChartComponent: AreaChart },
            { chartData: cachedChartData5, isError: isError5, ChartComponent: MultilineChart },
            { chartData: cachedChartData6, isError: isError6, ChartComponent: MultilineChart },
        ]
    }, [cachedChartData1, cachedChartData2, cachedChartData3, cachedChartData4, cachedChartData5, cachedChartData6, isError1, isError2, isError3, isError4, isError5, isError6])




    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <h1>차트 기능</h1>
                <Link href="/" className={styles.card}>
                    <h2>&larr; 메인 페이지</h2>
                    <p>메인 페이지로 이동</p>
                </Link>
                <div style={{
                    display: 'flex',
                    gap: '20px',
                    alignItems: 'start',
                    flexWrap: 'wrap'
                }}>
                    {chartList.map((chart, index) => {
                        const firstChart = chartDataList[2 * index];
                        const secondChart = chartDataList[2 * index + 1];

                        return (
                            <div key={index} style={{ width: '100%', maxWidth: '800px' }}>
                                <h2>{chart}</h2>
                                {firstChart?.chartData && (
                                    <firstChart.ChartComponent {...firstChart.chartData} />
                                )}
                                {firstChart?.isError && <p>데이터를 불러오지 못했습니다.</p>}
                                {secondChart?.chartData && (
                                    <secondChart.ChartComponent {...secondChart.chartData} />
                                )}
                                {secondChart?.isError && <p>데이터를 불러오지 못했습니다.</p>}
                            </div>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}
