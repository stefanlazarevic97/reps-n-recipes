import './NutritionIndex.css'
import { Pie } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { fetchUserNutritionByDay, getUserNutritionByDay } from '../../store/users'
import { Chart, PieController, ArcElement, Tooltip } from 'chart.js';
import { deleteUserNutrition } from '../../store/foods';
import FoodUpdateForm from '../FoodUpdateForm/FoodUpdateForm';
import titleize from '../../Utils/utils'
const moment = require('moment');

Chart.register(PieController, ArcElement, Tooltip);

const NutritionIndex = () => {
    const dispatch = useDispatch();
    const dailyNutrition = useSelector(getUserNutritionByDay);
    const selectedDate = useSelector(state => state.ui.selectedDate)
    const [showUpdate, setShowUpdate] = useState(false)
    const [foodToUpdate, setFoodToUpdate] = useState(null);

    let dailyCalories = 0;
    let dailyCarbs = 0;
    let dailyFat = 0;
    let dailyProtein = 0;
    
    dailyNutrition.forEach((food) => {
        dailyCalories += Math.round(food.calories);
        dailyCarbs += Math.round(food.gramsCarbs);
        dailyFat += Math.round(food.gramsFat);
        dailyProtein += Math.round(food.gramsProtein);
    })
    
    let totalMacros = dailyCarbs + dailyFat + dailyProtein;
    let carbsPercentage = Math.round((dailyCarbs / totalMacros) * 100);
    let fatPercentage = Math.round((dailyFat / totalMacros) * 100);
    let proteinPercentage = Math.round((dailyProtein / totalMacros) * 100);

    useEffect(() => {
        dispatch(fetchUserNutritionByDay(selectedDate))
    }, [dispatch])

    const data = !totalMacros ? {
        labels: ['No Data'],
        datasets: [{
            data: [100],
            backgroundColor: ['#2D69AF'],
            hoverBackgroundColor: ['#2D69AF']
        }]
    } : {
        labels: ['Carbs', 'Fat', 'Protein'],
        datasets: [{
            data: [dailyCarbs, dailyFat, dailyProtein],
            percentages: [carbsPercentage, fatPercentage, proteinPercentage],
            backgroundColor: ['#2D69AF', '#33302E', '#FE6A15'],
            hoverBackgroundColor: ['#2D69AF', '#33302E', '#FE6A15']
        }]
    }
    
    const options = {
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                labels: { font: { size: 14 }, color: '#33302E' }
            },
            tooltip: {            
                bodyFont: {
                    size: 18
                },
                callbacks: {
                    label: function(context) {
                        if (!totalMacros) {
                            return 'No Nutrition Data Yet';
                        }
                        const label = context.label || '';
                        const value = context.parsed || '';
                        const dataset = context.chart.data.datasets[context.datasetIndex];
                        const percentage = dataset.percentages[context.dataIndex];
                        return `${label}: ${value} g (${percentage}%)`;
                    }
                }
            }
        }
    }

    const handleUpdate = (foodItem) => e => {
        setFoodToUpdate(foodItem);
        setShowUpdate(true);
    }

    const handleDelete = (foodItem) => e => {
        dispatch(deleteUserNutrition(foodItem._id))
    }

    return (
        <div className="nutrition-index-container">
            <h2 className="header">Nutrition Index</h2>
            <div>
                <div className='chart-container'>
                    <Pie 
                        className="pie-chart" 
                        data={data} 
                        options={options}
                    />

                    <div className="daily-nutrition-facts">
                        <h1 className="header">{moment(selectedDate).format('dddd, MMMM D')}</h1>
                        <div>Calories: {Math.round(dailyCalories)}</div>
                        <div>Carbohydrates: {Math.round(dailyCarbs)} g</div>
                        <div>Fat: {Math.round(dailyFat)} g</div>
                        <div>Protein: {Math.round(dailyProtein)} g</div>
                    </div>
                </div>

                {foodToUpdate && 
                    <FoodUpdateForm 
                        food={foodToUpdate} 
                        onCancel={() => setFoodToUpdate(null)} 
                    />
                }
                
                {dailyNutrition.map(food => (
                    <div className="macros-item-container">
                        <h3 
                            className="nutrition-facts-header"
                        >
                            {titleize(food.foodName)}
                        </h3>
                        <div className='macros-item'>
                            <div className='nutrition-facts'>
                                <div>Calories: {Math.round(food.calories)}</div>
                                <div>Carbohydrates: {Math.round(food.gramsCarbs)} g</div>
                                <div>Fat: {Math.round(food.gramsFat)} g</div>
                                <div>Protein: {Math.round(food.gramsProtein)} g</div>
                            </div>

                            <div className="update-delete-button-container">
                                <button 
                                    className="button update-delete-button"
                                    onClick={handleUpdate(food)}
                                >
                                    Update Food
                                </button>
                                <button 
                                    className="button update-delete-button"
                                    onClick={handleDelete(food)}
                                >
                                    Delete Food
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default NutritionIndex;