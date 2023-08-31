import './CreateFood.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUserNutrition } from '../../store/foods';

const CreateFood = ({ selectedDate }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [unit, setUnit] = useState('g');
    const [calories, setCalories] = useState(0);
    const [carbs, setCarbs] = useState(0);
    const [fat, setFat] = useState(0);
    const [protein, setProtein] = useState(0);
    const [servings, setServings] = useState(1);

    const units = ['g', 'oz', 'lb', 'cup', 'tbsp', 'tsp'];

    const handleSubmit = (e) => {
        e.preventDefault();

        const foodItem = {
            foodName: name,
            foodQuantity: quantity,
            foodQuantityUnit: unit,
            calories: calories,
            gramsCarbs: carbs,
            gramsFat: fat,
            gramsProtein: protein,
            dateConsumed: selectedDate,
            servings: servings
        };
        
        dispatch(addUserNutrition(foodItem));

    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Name: 
                <input 
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </label>

            <label>Serving Size: 
                <input
                    type="number"
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)}  
                />
            </label>
            
            <label>Serving Unit: 
                <select 
                    value={unit}
                    onChange={e => setUnit(e.target.value)}
                >
                    {units.map(unit => (
                    <option key={unit} value={unit}>{unit}</option>
                    ))}
                </select>
            </label>

            <label>Calories: 
                <input
                    type="number"
                    value={calories}
                    onChange={e => setCalories(e.target.value)}
                />
            </label>

            <label>Carbohydrates: 
                <input
                    type="number"
                    value={carbs}
                    onChange={e => setCarbs(e.target.value)}
                />
            </label>

            <label>Fat: 
                <input
                    type="number"
                    value={fat}
                    onChange={e => setFat(e.target.value)}
                    placeholder="Grams of Fat"
                />
            </label>

            <label>Protein: 
                <input
                    type="number"
                    value={protein}
                    onChange={e => setProtein(e.target.value)}
                />
            </label>

            <label>Number of Servings:
                <input
                    type="number"
                    value={servings}
                    onChange={e => setServings(e.target.value)}
                    placeholder="Number of Servings"
                />
            </label>

            <button>Add Food</button>
        </form>
    )
}

export default CreateFood;