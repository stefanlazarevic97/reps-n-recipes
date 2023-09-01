import './NutritionIndex.css'
import { Pie } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { fetchUserNutritionByDay, getUserNutritionByDay } from '../../store/users'
import { Chart, PieController, ArcElement, Tooltip } from 'chart.js';
import { deleteUserNutrition } from '../../store/foods';
import FoodUpdateForm from '../FoodUpdateForm/FoodUpdateForm';

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

    const data = {
        labels: ['Carbs', 'Fat', 'Protein'],
        datasets: [{
            data: [dailyCarbs, dailyFat, dailyProtein],
            percentages: [carbsPercentage, fatPercentage, proteinPercentage],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
    }
    
    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const label = context.label || ''
                        const value = context.parsed || ''
                        const dataset = context.chart.data.datasets[context.datasetIndex];
                        const percentage = dataset.percentages[context.dataIndex]
                        return `${label}: ${value} (${percentage}%)`
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
        <div className="nutrition-index">
            <h2 className="nutrition-index-title">Nutrition Index</h2>
            <div>
                <div className='chart-container'>
                    <Pie data={data} options={options}/>
                    <div className="daily-wrapper">
                        <div>{Math.round(dailyCalories).toFixed(1)} Calories</div>
                        <div>{Math.round(dailyCarbs).toFixed(1)} g Carbs</div>
                        <div>{Math.round(dailyFat).toFixed(1)} g Fat</div>
                        <div>{Math.round(dailyProtein).toFixed(1)} g Protein</div>
                    </div>
                </div>

                {foodToUpdate && 
                    <FoodUpdateForm 
                        food={foodToUpdate} 
                        onCancel={() => setFoodToUpdate(null)} 
                    />
                }
                
                {dailyNutrition.map(food => (
                    <div className='macros-item'>
                        <h3>{food.foodName}</h3>
                        <div className='macros-wrapper'>
                            <div>Calories: {Math.round(food.calories).toFixed(1)}</div>
                            <div>Protein: {Math.round(food.gramsProtein).toFixed(1)} g</div>
                            <div>Carbohydrates: {Math.round(food.gramsCarbs).toFixed(1)} g</div>
                            <div>Fat: {Math.round(food.gramsFat).toFixed(1)} g</div>
                        </div>
                        <div>
                            <button onClick={handleUpdate(food)}>Update Food</button>
                            <button onClick={handleDelete(food)}>Delete Food</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default NutritionIndex;