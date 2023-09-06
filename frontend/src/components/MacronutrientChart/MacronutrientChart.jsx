import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { getNutritionByDate } from "../../store/foods";
import { Scatter } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { Chart, CategoryScale, LinearScale, TimeScale, PointElement, LineElement } from 'chart.js'; 

Chart.register(TimeScale, LinearScale, CategoryScale, PointElement, LineElement );

const MacronutrientChart = () => {
    const pointRadius = 5;
    const year = new Date().getFullYear();
    const [filteredCarbs, setFilteredCarbs] = useState([]);
    const [filteredFat, setFilteredFat] = useState([]);
    const [filteredProtein, setFilteredProtein] = useState([])
    const [timeRange, setTimeRange] = useState('7');
    const carbsByDate = useSelector(getNutritionByDate("gramsCarbs"));
    const fatByDate = useSelector(getNutritionByDate("gramsFat"));
    const proteinByDate = useSelector(getNutritionByDate("gramsProtein"));
    
    const filterData = (days) => {
        const cutOffDate = new Date();
        cutOffDate.setDate(cutOffDate.getDate() - days);
        const today = new Date();
    
        setFilteredCarbs(
            Object.entries(carbsByDate)
                .filter(([date]) => {
                    const parsedDate = new Date(date);
                    return parsedDate >= cutOffDate && parsedDate <= today;
                })
                .sort((a, b) => new Date(a[0]) - new Date(b[0]))
        );

        setFilteredFat(
            Object.entries(fatByDate)
                .filter(([date]) => {
                    const parsedDate = new Date(date);
                    return parsedDate >= cutOffDate && parsedDate <= today;
                })
                .sort((a, b) => new Date(a[0]) - new Date(b[0]))
        );

        setFilteredProtein(
            Object.entries(proteinByDate)
                .filter(([date]) => {
                    const parsedDate = new Date(date);
                    return parsedDate >= cutOffDate && parsedDate <= today;
                })
                .sort((a, b) => new Date(a[0]) - new Date(b[0]))
        );
    };

    useEffect(() => {
        filterData(timeRange)
    }, [timeRange]);
    
    const macroData = {
        labels: filteredCarbs?.map(date => date[0]),
        datasets: [
            {
                label: 'Carbohydrates',
                data: filteredCarbs.map((entry) => ({
                    x: new Date(entry[0]), 
                    y: entry[1] 
                })),
                
                backgroundColor: '#2D69AF',
                borderColor: '#2D69AF',
                showLine: true,
                pointRadius: pointRadius
            },
            {
                label: 'Fat',
                data: filteredFat?.map((entry) => ({
                    x: new Date(entry[0]),
                    y: entry[1]
                })),
                
                backgroundColor: '#33302E',
                borderColor: '#33302E',
                showLine: true,
                pointRadius: pointRadius
            },
            {
                label: 'Protein',
                data: filteredProtein?.map((entry) => ({
                    x: new Date(entry[0]),
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
        <div className="charts">
            <div className="chart-header">
                <div className="chart-toggle-container">
                    <select
                        className="chart-toggle"
                        onChange={(e) => setTimeRange(e.target.value)}
                        value={timeRange}
                    >
                        <option value="7">Last 7 days</option>
                        <option value="14">Last 14 days</option>
                        <option value="30">Last 30 days</option>
                        <option value="90">Last 3 months</option>
                    </select>
                </div>

                <h2 className="profile-header">Macronutrients</h2>
            </div>
            
            <Scatter
                data={macroData} 
                options={{
                    plugins: {
                        legend: {
                            display: true,
                            position: 'bottom',
                            labels: {
                                font: { size: 14 },
                                color: '#33302E'
                            }
                        },
                        tooltip: {
                            enabled: true,
                            callbacks: {
                                title: (tooltipItems) => {
                                    const date = tooltipItems[0].raw.x;
                                    return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
                                },
                                label: (tooltipItem) => {
                                    return `${tooltipItem.dataset.label}: ${Math.round(tooltipItem.raw.y)}g`;
                                }
                            }
                        },
                    },
                    scales: {
                        x: {
                            type: 'time',
                            min: filteredCarbs.length > 0 ? new Date(filteredCarbs[0][0]).toISOString() : undefined,
                            max: filteredCarbs.length > 0 ? new Date(filteredCarbs[filteredCarbs.length - 1][0]).toISOString() : undefined,
                            title: { 
                                display: true, 
                                font: { size: 18, weight: 'bold' },
                                text: 'Date',
                                color: '#33302E'
                            },
                            ticks: { font: { size: 14 }, color: '#33302E' },
                            time: { unit: 'day', displayFormats: { day: 'MMM d' } }
                        },
                        y: { 
                            title: { 
                                display: true, 
                                text: 'Grams',
                                font: { size: 18, weight: 'bold', },
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

export default MacronutrientChart;