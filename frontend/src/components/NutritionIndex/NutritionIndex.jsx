import './NutritionIndex.css'
import { Pie } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { getUserNutritionByDay } from '../../store/users'
import { Chart, PieController, ArcElement, Tooltip } from 'chart.js';

Chart.register(PieController, ArcElement, Tooltip);

const NutritionIndex = () => {
    const dailyNutrition = useSelector(getUserNutritionByDay);
    let dailyCalories = 0;
    let dailyCarbs = 0;
    let dailyFat = 0;
    let dailyProtein = 0;
    
    dailyNutrition.forEach((food) => {
        dailyCalories += food.calories;
        dailyCarbs += food.gramsCarbs;
        dailyFat += food.gramsFat;
        dailyProtein += food.gramsProtein;
    })
    
    console.log("dailyCalories", dailyCalories);
    console.log("dailyCarbs", dailyCarbs);
    console.log("dailyFat", dailyFat);
    console.log("dailyProtein", dailyProtein);

    const data = {
        labels: ['Carbs', 'Fat', 'Protein'],
        datasets: [{
            data: [dailyCarbs, dailyFat, dailyProtein],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
    }
    
    return (
        <div className="nutrition-index">
            <h2 className="nutrition-index-title">Nutrition Index</h2>
            <div>
                <div className='chart-container'>
                    <Pie data={data} />
                </div>
                {dailyNutrition.map(food => (
                    <div>
                        <h3>{food.foodName}</h3>
                        <div className='macros-wrapper'>
                            <div>Calories: {food.calories}</div>
                            <div>Protein: {food.gramsProtein}g</div>
                            <div>Carbohydrates: {food.gramsCarbs}g</div>
                            <div>Fat: {food.gramsFat}g</div>
                        </div>
                        <div>
                            <button>Update Food</button>
                            <button>Delete Food</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default NutritionIndex;