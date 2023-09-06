import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { getNutritionByDate } from "../../store/foods";
import { Scatter } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { Chart, CategoryScale, LinearScale, TimeScale, PointElement, LineElement } from 'chart.js'; 

Chart.register(TimeScale, LinearScale, CategoryScale, PointElement, LineElement);

const CalorieChart = () => {
    const pointRadius = 5;
    const [filteredData, setFilteredData] = useState([]);
    const [timeRange, setTimeRange] = useState('7');
    const caloriesByDate = useSelector(getNutritionByDate("calories"));

    const filterData = (days) => {
        const cutOffDate = new Date();
        cutOffDate.setDate(cutOffDate.getDate() - days);
        const today = new Date();
        
        setFilteredData(
            Object.entries(caloriesByDate)
                .filter(([date]) => {
                    const parsedDate = new Date(date);
                    return parsedDate >= cutOffDate && parsedDate <= today;
                })
                .sort((a, b) => new Date(a[0]) - new Date(b[0]))
        );
    };
    
    useEffect(() => {
        filterData(timeRange);
    }, [timeRange]);

    const calorieData = {
        labels: filteredData.map(date => date[0]),
        datasets: [
            {
                label: 'Calories',
                data: filteredData.map((entry) => ({
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

    console.log("calorieData", calorieData);
    
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
                
                <h2 className="profile-header">Calories</h2>
            </div>

            <Scatter 
                data={calorieData} 
                options={{
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            enabled: true,
                            callbacks: {                                
                                title: (tooltipItems) => {
                                    const date = tooltipItems[0].raw.x;
                                    return date.toLocaleDateString('en-US', { 
                                        month: 'short', day: '2-digit' 
                                    });
                                },
                                label: (tooltipItem) => {
                                    return `${Math.round(tooltipItem.raw.y)} calories`;
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            type: 'time',
                            min: filteredData.length > 0 ?
                                new Date(filteredData[0][0]).toISOString() :
                                undefined,
                            max: filteredData.length > 0 ?
                                new Date(filteredData[filteredData.length - 1][0]).toISOString() :
                                undefined,
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
                                font: { size: 18, weight: 'bold' }, 
                                text: 'Calories', 
                                color: '#33302E' 
                            },
                            ticks: { font: { size: 14 }, color: '#33302E' }
                        }
                    }
                }}
            />
        </div>
    );
}

export default CalorieChart;
