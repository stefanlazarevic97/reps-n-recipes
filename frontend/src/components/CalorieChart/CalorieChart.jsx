import React from 'react';
import { useSelector } from "react-redux";
import { getNutritionByDate } from "../../store/foods";
import { Scatter } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { Chart, CategoryScale, LinearScale, TimeScale, PointElement, LineElement } from 'chart.js'; 
import './CalorieChart.css'

Chart.register(TimeScale, LinearScale, CategoryScale, PointElement, LineElement );

const CalorieChart = () => {
    const pointRadius = 5;
    const year = new Date().getFullYear();
    const caloriesByDate = useSelector(getNutritionByDate("calories"));

    const sortedCalories = Object.entries(caloriesByDate).sort((a, b) => {
        const dateA = new Date(`${a[0]}, ${year}`);
        const dateB = new Date(`${b[0]}, ${year}`);
        return dateA - dateB;
    });

    const calorieData = {
        labels: sortedCalories.map(date => date[0]),
        datasets: [
            {
                label: 'Calories',
                data: sortedCalories.map((entry, index) => ({
                    x: new Date(`${entry[0]}, ${year}`),
                    y: entry[1]
                })),

                backgroundColor: '#FE6A15',
                borderColor: '#FE6A15',
                showLine: true,
                pointRadius: pointRadius
            }
        ]
    };

    return (
        <div className="nutrition-charts">
            <h2 className="subheader">Calories</h2>
            <Scatter 
                data={calorieData} 
                options={{
                    plugins: {
                        legend: {
                            display: false,
                        },
                        tooltip: {
                            enabled: true,
                            callbacks: {
                                title: function (tooltipItems) {
                                    const date = tooltipItems[0].raw.x;
                                    return date.toLocaleDateString(
                                        'en-US', {
                                            month: 'short', day: '2-digit' 
                                        }
                                    );
                                },
                                label: function (tooltipItem) {
                                    return `${Math.round(tooltipItem.raw.y)} calories`;
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            type: 'time',
                            min: new Date(
                                Math.min.apply(
                                    null, Object.keys(caloriesByDate).map(
                                        date => new Date(`${date}, ${year}`)
                                    )
                                )
                            ),
                            max: new Date(
                                Math.max.apply(
                                    null, Object.keys(caloriesByDate).map(
                                        date => new Date(`${date}, ${year}`)
                                    )
                                )
                            ),
                            title: { 
                                display: true, 
                                text: 'Date',
                                font: { size: 14, weight: 'bold' },
                                color: '#33302E'
                            },
                            ticks: {
                                font: { size: 14 },
                                color: '#33302E'
                            },
                            time: {
                                unit: 'day',
                                displayFormats: {
                                    day: 'MMM d'
                                }
                            }
                        },
                        y: { 
                            title: { 
                                display: true, 
                                text: 'Calories',
                                font: { size: 14, weight: 'bold', },
                                color: '#33302E'
                            },
                            ticks: {
                                font: { size: 14 },
                                color: '#33302E'
                            }
                        }
                    }
                }}
            />
        </div>
    );
}

export default CalorieChart;