import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const MealPlanShow = () => {
    const mealPlan = useSelector(state => state.users.mealPlan);
    const [meals, setMeals] = useState(mealPlan.meals);
    
    useEffect(() => {
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
        
    }, [mealPlan]);

    if (!mealPlan) {
        return <div>No meal plan generated</div>;
    }
    console.log("meals", meals)

    return (
        <div>
            <h1>Meal Plan</h1>
            
            {meals && 
                <div>
                    <p>Total Calories: {mealPlan?.nutrients?.calories}</p>
                    <p>Total Carbs: {mealPlan?.nutrients?.carbohydrates}</p>
                    <p>Total Fat: {mealPlan?.nutrients?.fat}</p>
                    <p>Total Protein: {mealPlan?.nutrients?.protein}</p>
                </div>
            }
            {meals?.map(meal => (
                <div key={meal.id}>
                    <h2>{meal.title}</h2>
                    <img src={meal.imgSrc} />
                    <p>Servings: {meal.servings}</p>
                    <p>Ready in {meal.readyInMinutes} minutes</p>
                </div>
            ))}

        </div>
    );
}

export default MealPlanShow;