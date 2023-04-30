import { useState, useEffect, useRef } from "react";
import { GetServerSideProps, GetStaticProps } from "next";
import Layout from "../components/Layout"
import React from "react";
// import { Chart as ChartJS, ChartOptions, CategoryScale } from 'chart.js';
// import { Bar, Line } from 'react-chartjs-2';
import { Chart, CategoryScale, BarController, BarElement } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import BarChart from '../components/charts/columnChart'
import LineChart from '../components/charts/lineChart'
import AreaChart from '../components/charts/areaChart'
Chart.register(CategoryScale, BarController, BarElement);

type WeatherData = {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    hourly_units: {
        time: string;
        relativehumidity_2m: string;
        direct_radiation: string;
    },
    hourly: {
        time: string[];
        relativehumidity_2m: number[];
        direct_radiation: number[];
    },
    daily_units: {
        time: string;
        temperature_2m_max: string;
        temperature_2m_min: string;
    },
    daily: {
        time: string[];
        temperature_2m_max: number[];
        temperature_2m_min: number[];
    }
}

type ChartData = {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor: string;
        borderColor: string;
        barPercentage?: number;
        categoryPercentage?: number;
        pointBackgroundColor?: string;
        fill?: boolean;
        tension?: number;
        borderWidth?:number;
    }[];
}

type Props = {
    dashboardData: WeatherData;
}
export default function Sembcorp({ dashboardData }: Props) {    
    const [barChartData, setBarChartData] = useState<ChartData>({
        labels: Array.from({ length: 240 }, (_, i) => `${i}`),
        datasets: [
            {
                label: "Hourly Relative Humidity",
                data: dashboardData.hourly.relativehumidity_2m || [],                
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
            },
        ],
    });

    const [lineChartData, setLineChartData] = useState<ChartData>({
        labels: Array.from({ length: 10 }, (_, i) => `${i + 1}`),
        datasets: [
            {
                label: "Daily Max",
                data: dashboardData.daily.temperature_2m_max || [],
                // barPercentage: 0.5, // Set bar width to 50%
                // categoryPercentage: 0.8, // Set group width to 80%
                backgroundColor: 'rgba(255, 0, 0, 0.1)',
                borderColor: 'rgba(255, 99, 132, 1)',
                fill: false,
                tension: 0.4,
            },
            {
                label: "Daily Min",
                data: dashboardData.daily.temperature_2m_min || [],                
                backgroundColor: 'rgba(0, 172, 255, 1)',
                borderColor: 'rgba(0, 0, 255, 1)',
                fill: false,
                tension: 0.4,
            },
        ],
    });

    const [areaChartData, setAreaChartData] = useState<ChartData>({
        labels: Array.from({ length: 240 }, (_, i) => `${i}`),
        datasets: [
            {
                label: 'Direct Radiation',
                data: dashboardData.hourly.direct_radiation || [],
                backgroundColor: 'rgba(13, 255, 13, 0.3)',
                borderColor: 'rgba(255, 99, 132, 1)',
                pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                fill: true,
                tension: 0.4,
                borderWidth:1,
            },
           
        ],

    });  
    return (
        <Layout>
            <h1>Column Chart(Humidity)</h1>
            <BarChart data={barChartData} />
            <h1>Line Chart(Temperature)</h1>
            <LineChart data={lineChartData} />
            <h1>Area Chart(Radiation)</h1>
            <AreaChart data={areaChartData} />
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=1.29&longitude=103.85&hourly=relativehumidity_2m,direct_radiation&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FSingapore&start_date=2023-01-01&end_date=2023-01-10';
    const res = await fetch(url);
    const dashboardData: WeatherData = await res.json();    
    return {
        props: {
            dashboardData,
        },
    };
};


