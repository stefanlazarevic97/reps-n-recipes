import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import './MealPlanShow.css'

const MealPlanShow = () => {
    const mealPlan = useSelector(state => state.users.mealPlan);
    const [meals, setMeals] = useState(mealPlan.meals);

    useEffect(() => {
        if (mealPlan.meals) {
            const fetchImages = async () => {
                const mealsWithImages = await Promise.all(
                    mealPlan.meals.map(async meal => {
                        const response = await fetch(meal.sourceUrl);
                        const html = await response.text();
                        const doc = new DOMParser().parseFromString(html, 'text/html');
                        const imgSrc = doc.querySelector('.recipeImage')?.src; 
                            
                        return {
                            ...meal, 
                            imgSrc
                        }
                    })  
                );
                    
                setMeals(mealsWithImages);
            }
            
            fetchImages();
        }
        
    }, [mealPlan]);


    if (!mealPlan) {
        return <div>No meal plan generated</div>;
    }

    return (
        <>
            {meals && <div className='meal-plan-container'>
                <h1 className="header">Daily Meal Plan</h1>
                
                <div className="daily-nutrition-facts">
                    <p>Total Calories: {Math.round(mealPlan?.nutrients?.calories)}</p>
                    <p>Total Carbs: {Math.round(mealPlan?.nutrients?.carbohydrates)} g</p>
                    <p>Total Fat: {Math.round(mealPlan?.nutrients?.fat)} g</p>
                    <p>Total Protein: {Math.round(mealPlan?.nutrients?.protein)} g</p>
                </div>
                
                {meals?.map(meal => (
                    <div
                        className="meal-item-container"
                        key = {meal.id}
                    >
                        <div 
                            className="meal-item"
                            key={meal.id}
                        >
                            <a 
                                className="meal-item-link"
                                href={meal.sourceUrl} 
                                target='_blank'
                            >
                                <h2 className="meal-item-subheader">{meal.title}</h2>
                                <img className="meal-plan-image" src={meal.imgSrc} />

                                <div className="meal-item-stats">
                                    <p>Servings: {meal.servings}</p>
                                    <p>Ready in {meal.readyInMinutes} minutes</p>
                                </div>
                            </a>
                        </div>
                    </div>
                ))}
            </div>}
        </>
    );
}

export default MealPlanShow;