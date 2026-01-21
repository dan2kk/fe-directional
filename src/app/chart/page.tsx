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


export default function Chart() {
    const { data: chartData1 } = useGetChartData<topCoffeeBrandResData>('top-coffee-brands');
    const { data: chartData2 } = useGetChartData<popularSnackResData>('popular-snack-brands');
    const { data: chartData3 } = useGetChartData<weeklyMoodTrendResData>('weekly-mood-trend');
    const { data: chartData4 } = useGetChartData<weeklyWorkoutTrendResData>('weekly-workout-trend');
    const { data: chartData5 } = useGetChartData<coffeeConsumptionResData>('coffee-consumption');
    const { data: chartData6 } = useGetChartData<snackImpactResData>('snack-impact');

    const chachedChartData1 = useMemo(() => {
        if (!chartData1) return null;
        return {
            labels: chartData1.map((item) => item.brand),
            datasets: chartData1.map((item) => item.popularity),
            labelforData: "인기도",
            title: "커피 브랜드 인기도"
        }
    }, [chartData1]);

    const chachedChartData2 = useMemo(() => {
        if (!chartData2) return null;
        return {
            labels: chartData2.map((item) => item.name),
            datasets: chartData2.map((item) => item.share),
            labelforData: "점유율(%)",
            title: "과자 브랜드 점유율"
        }
    }, [chartData2]);

    const chachedChartData3 = useMemo(() => {
        if (!chartData3) return null;
        return {
            labels: chartData3.map((item) => item.week),
            datasets: chartData3.map(({ week, ...data }) => data),
            labelforData: Object.keys(chartData3[0]).filter(key => key !== 'week'),
            title: "주간 기분 추이"
        };
    }, [chartData3]);

    const chachedChartData4 = useMemo(() => {
        if (!chartData4) return null;
        return {
            labels: chartData4.map((item) => item.week),
            datasets: chartData4.map(({ week, ...data }) => data),
            labelforData: Object.keys(chartData4[0]).filter(key => key !== 'week'),
            title: "주간 운동 추이"
        }
    }, [chartData4]);

    const chachedChartData5 = useMemo(() => {
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
    const chachedChartData6 = useMemo(() => {
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
    console.log(chachedChartData5);
    console.log(chachedChartData6);




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
                    <div>
                        <h2>바 차트</h2>
                        {chachedChartData1 && (
                            <BarChart {...chachedChartData1} />
                        )}
                        {chachedChartData2 && (
                            <BarChart {...chachedChartData2} />
                        )}
                    </div>
                    <div>
                        <h2>도넛 차트</h2>
                        {chachedChartData1 && (
                            <DoughnutChart {...chachedChartData1} />
                        )}
                        {chachedChartData2 && (
                            <DoughnutChart {...chachedChartData2} />
                        )}
                    </div>
                    <div>
                        <h2>스택형 바 차트</h2>
                        {chachedChartData3 && (
                            <StackedBarChart {...chachedChartData3} />
                        )}
                        {chachedChartData4 && (
                            <StackedBarChart {...chachedChartData4} />
                        )}
                    </div>
                    <div style={{ width: '100%', maxWidth: '800px', height: '100%', maxHeight: '800px' }}>
                        <h2>면적 차트</h2>
                        {chachedChartData3 && (
                            <AreaChart {...chachedChartData3} />
                        )}
                        {chachedChartData4 && (
                            <AreaChart {...chachedChartData4} />
                        )}
                    </div>
                    <div style={{ width: '100%', maxWidth: '800px', height: '100%', maxHeight: '800px' }}>
                        <h2>멀티라인 차트</h2>
                        {chachedChartData5 && (
                            <MultilineChart {...chachedChartData5} />
                        )}
                        {chachedChartData6 && (
                            <MultilineChart {...chachedChartData6} />
                        )}
                    </div>
                </div>

            </main>
        </div>
    );
}
