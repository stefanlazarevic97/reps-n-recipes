import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserWeightByDate } from '../../store/users';
import { Scatter } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { Chart, CategoryScale, LinearScale, TimeScale, PointElement, LineElement, Legend } from 'chart.js';
import './WeightChart.css';

Chart.register(TimeScale, LinearScale, CategoryScale, PointElement, LineElement, Legend);

const WeightChart = () => {
    const [unit, setUnit] = useState('kg');
    const [filteredData, setFilteredData] = useState([]);
    const [timeRange, setTimeRange] = useState('7');
    const pointRadius = 5;

    const weightsByDate = useSelector(getUserWeightByDate);

    const filterData = (days) => {
        const cutOffDate = new Date();
        cutOffDate.setDate(cutOffDate.getDate() - days);

        setFilteredData(
            Object.entries(weightsByDate)
                .filter(([date]) => new Date(date) >= cutOffDate)
                .sort((a, b) => new Date(a[0]) - new Date(b[0]))
        );
    };

    useEffect(() => {
        filterData(timeRange);
    }, [weightsByDate, timeRange]);

    const minWeight = Math.min(...filteredData.map((entry) => entry[1]));
    const maxWeight = Math.max(...filteredData.map((entry) => entry[1]));

    const convertWeight = (weight) =>
        unit === 'kg' ? weight : weight * 2.204623;

    const weightData = {
        labels: filteredData.map((entry) => entry[0]),
        datasets: [{
            label: 'Weight',
            data: filteredData.map((entry) => ({
                x: new Date(entry[0]),
                y: convertWeight(entry[1]),
            })),
            
            backgroundColor: '#33302E',
            borderColor: '#33302E',
            showLine: true,
            pointRadius: pointRadius,
        }],
    };

    return (
        <div className="weight-charts">
            <h2 className="subheader">Weight</h2>
            
            <select onChange={(e) => setUnit(e.target.value)} value={unit}>
                <option value="kg">Kilograms</option>
                <option value="lbs">Pounds</option>
            </select>

            <select
                onChange={(e) => setTimeRange(e.target.value)}
                value={timeRange}
            >
                <option value="7">Last 7 days</option>
                <option value="14">Last 14 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 3 months</option>
            </select>

            <Scatter
                data={weightData}
                options={{
                    plugins: {
                        legend: {
                            display: false,
                        },
                        tooltip: {
                            enabled: true,
                            callbacks: {
                                title: (tooltipItems) => {
                                    const date = tooltipItems[0].raw.x;
                                    return date.toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: '2-digit',
                                    });
                                },

                                label: (tooltipItem) => {
                                    return `${tooltipItem.raw.y.toFixed(1)} ${unit}`;
                                },
                            },
                        },
                    },

                    scales: {
                        x: {
                            type: 'time',
                            min: filteredData.length > 0 ? new Date(filteredData[0][0]).toISOString() : undefined,
                            max: filteredData.length > 0 ? new Date(filteredData[filteredData.length - 1][0]).toISOString() : undefined,
                            title: {
                                display: true,
                                text: 'Date',
                                font: { size: 14, weight: 'bold' },
                                color: '#33302E',
                            },
                            ticks: { font: { size: 14 }, color: '#33302E' },
                            time: {
                                unit: 'day',
                                displayFormats: { day: 'MMM d' },
                            },
                        },
                        y: {
                            min: Math.floor(convertWeight(minWeight)),
                            max: Math.ceil(convertWeight(maxWeight)),
                            title: {
                                display: true,
                                text: `Weight (${unit})`,
                                font: { size: 14, weight: 'bold' },
                                color: '#33302E',
                            },
                            ticks: { font: { size: 14 }, color: '#33302E' },
                        },
                    },
                }}
            />
        </div>
    );
};

export default WeightChart;
