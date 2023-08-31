import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateMealPlan } from '../../store/foods';

const GenerateMealPlan = () => {
    const dispatch = useDispatch();
    const TDEE = Math.floor(useSelector(state => state.users.healthData.TDEE));
    const [calories, setCalories] = useState(TDEE);
    const [diet, setDiet] = useState('');
    const [exclusions, setExclusions] = useState('');

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
        <form onSubmit={handleSubmit}>
            <input 
                type="number"
                value={calories}
                onChange={e => setCalories(e.target.value)} 
            />

            <select
                value={diet}
                onChange={e => setDiet(e.target.value)}  
            >
                <option value="">Select Diet</option>
                
                {diets.map(diet => (
                    <option key={diet}>{diet}</option>
                ))}
            </select>
            
            <label>Excluded ingredients, separated by a comma:
                <input
                    value={exclusions}
                    onChange={e => setExclusions(e.target.value)}
                    placeholder="nuts, dairy, etc."
                />
            </label>

            <button>Generate Meal Plan</button>
        </form>
    )
}

export default GenerateMealPlan;