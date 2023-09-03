import React from 'react';
import { useSelector } from "react-redux";
import { getNutritionByDate } from "../../store/foods";
import { Scatter } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { Chart, CategoryScale, LinearScale, TimeScale, PointElement, LineElement } from 'chart.js'; 
import './NutritionCharts.css'

Chart.register(TimeScale, LinearScale, CategoryScale, PointElement, LineElement );

const NutritionCharts = () => {
    const pointRadius = 5;
    const year = new Date().getFullYear();
    const caloriesByDate = useSelector(getNutritionByDate("calories"));
    const carbsByDate = useSelector(getNutritionByDate("gramsCarbs"));
    const fatByDate = useSelector(getNutritionByDate("gramsFat"));
    const proteinByDate = useSelector(getNutritionByDate("gramsProtein"));

    const sortedCalories = Object.entries(caloriesByDate).sort((a, b) => {
        const dateA = new Date(`${a[0]}, ${year}`);
        const dateB = new Date(`${b[0]}, ${year}`);
        return dateA - dateB;
    });

    const sortedCarbs = Object.entries(carbsByDate).sort((a, b) => {
        const dateA = new Date(`${a[0]}, ${year}`);
        const dateB = new Date(`${b[0]}, ${year}`);
        return dateA - dateB;
    });

    const sortedFat = Object.entries(fatByDate).sort((a, b) => {
        const dateA = new Date(`${a[0]}, ${year}`);
        const dateB = new Date(`${b[0]}, ${year}`);
        return dateA - dateB;
    });

    const sortedProtein = Object.entries(proteinByDate).sort((a, b) => {
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

    const macroData = {
        labels: sortedCarbs.map(date => date[0]),
        datasets: [
            {
                label: 'Carbohydrates',
                data: sortedCarbs.map((entry, index) => ({
                    x: new Date(`${entry[0]}, ${year}`),
                    y: entry[1]
                })),

                backgroundColor: '#2D69AF',
                borderColor: '#2D69AF',
                showLine: true,
                pointRadius: pointRadius
            },
            {
                label: 'Fat',
                data: sortedFat.map((entry, index) => ({
                    x: new Date(`${entry[0]}, ${year}`),
                    y: entry[1]
                })),

                backgroundColor: '#33302E',
                borderColor: '#33302E',
                showLine: true,
                pointRadius: pointRadius
            },
            {
                label: 'Protein',
                data: sortedProtein.map((entry, index) => ({
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
        <div className="charts-container">
            <div className="nutrition-charts">
                <h2 className="subheader">Calories</h2>
                <Scatter 
                    data={calorieData} 
                    options={{
                        plugins: {
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
                                        null, Object.keys(caloriesByDate)
                                            .map(date => 
                                                new Date(`${date}, ${year}`)
                                            )
                                    )
                                ),
                                max: new Date(
                                    Math.max.apply(
                                        null, Object.keys(caloriesByDate)
                                            .map(date => 
                                                new Date(`${date}, ${year}`)
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
            <div className="nutrition-charts">
                <h2 className="subheader">Macronutrients</h2>
                <Scatter
                    data={macroData} 
                    options={{
                        plugins: {
                            legend: {
                                display: true
                            },
                        },
                        scales: {
                            x: {
                                type: 'time',
                                min: new Date(
                                    Math.min.apply(
                                        null, Object.keys(caloriesByDate)
                                            .map(date => 
                                                new Date(`${date}, ${year}`)
                                            )
                                    )
                                ),
                                max: new Date(
                                    Math.max.apply(
                                        null, Object.keys(caloriesByDate)
                                            .map(date => 
                                                new Date(`${date}, ${year}`)
                                            )
                                    )
                                ),
                                title: { 
                                    display: true, 
                                    text: 'Date',
                                    font: { size: 14, weight: 'bold', },
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
                                    text: 'Grams',
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
        </div>
    );
}

export default NutritionCharts;