import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateMealPlan } from '../../store/foods';
import './GenerateMealPlan.css';

const GenerateMealPlan = () => {
    const dispatch = useDispatch();
    const TDEE = Math.floor(useSelector(state => state.users.healthData.TDEE));
    const weightGoal = useSelector(state => state.users.healthData.weightGoal);
    const targetCalories = TDEE + weightGoal * 250;
    const [calories, setCalories] = useState(targetCalories);
    const [diet, setDiet] = useState('');
    const [exclusions, setExclusions] = useState('');

    useEffect(() => {
        setCalories(TDEE)
        setCalories(targetCalories)
    }, [TDEE])

    const diets = [
        'Gluten Free', 
        'Ketogenic',
        'Vegetarian',
        'Lacto-Vegetarian',
        'Ovo-Vegetarian',
        'Vegan',
        'Pescatarian', 
        'Paleo',
        'Primal',  
        'Whole30'
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(generateMealPlan(calories, diet, exclusions));
    }

    return (
        <div className='meal-plan-generator-container'>
            <h1 className="header">Generate Meal Plan</h1>
            <form 
                className="meal-plan-generator-form"
                onSubmit={handleSubmit}
            >
                <div className="tdee-container">
                    <label className="tdee-label">Calories:</label>
                    <input 
                        className="food-search-input"
                        type="number"
                        value={calories}
                        onChange={e => setCalories(e.target.value)} 
                        />
                </div>

                <select
                    className="food-search-input"
                    value={diet}
                    onChange={e => setDiet(e.target.value)}  
                    >
                    <option value="">Select Diet</option>
                    
                    {diets.map(diet => (
                        <option key={diet}>{diet}</option>
                        ))}
                </select>
                
                <label>Excluded ingredients, separated by a comma:</label>
                <input
                    className="food-search-input"
                    value={exclusions}
                    onChange={e => setExclusions(e.target.value)}
                    placeholder="Nuts, dairy, etc."
                    />

                <button className="button">Generate Meal Plan</button>
            </form>
        </div>
    )
}

export default GenerateMealPlan;