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
    const [errors, setErrors] = useState(null);

    const units = ['g', 'oz', 'lb', 'cup', 'tbsp', 'tsp'];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (quantity <= 0 || calories <= 0 || carbs < 0 || fat < 0 || protein < 0 || servings <= 0) {
            setErrors('Please enter valid values');
            return;
        } else if (name === '') {
            setErrors('Please enter a name');
            return;
        }

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
        setErrors(null);
    }

    return (
        <form 
            className="create-food-form"
            onSubmit={handleSubmit}
        >
            <div className="header-container">
                <h2 className="header">Create Food</h2>
            </div>

            {errors && <p className="errors">{errors}</p>}
            <div className="create-food-grid">

                <label className="create-food-label">Name: </label>
                <input 
                    className="create-food-input"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />

                <label className="create-food-label">Serving Size: </label>
                <input
                    className="create-food-input"   
                    type="number"
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)}  
                />
                
                <label className="create-food-label">Serving Unit: </label>
                <select 
                    className="create-food-input"
                    value={unit}
                    onChange={e => setUnit(e.target.value)}
                >
                    {units.map(unit => (
                    <option key={unit} value={unit}>{unit}</option>
                    ))}
                </select>

                <label className="create-food-label">Calories: </label>
                <input
                    className="create-food-input"
                    type="number"
                    value={calories}
                    onChange={e => setCalories(e.target.value)}
                />

                <label className="create-food-label">Carbohydrates: </label>
                <input
                    className="create-food-input"
                    type="number"
                    value={carbs}
                    onChange={e => setCarbs(e.target.value)}
                />

                <label className="create-food-label">Fat: </label>
                <input
                    className="create-food-input"
                    type="number"
                    value={fat}
                    onChange={e => setFat(e.target.value)}
                    placeholder="Grams of Fat"
                />

                <label className="create-food-label">Protein: </label>
                <input
                    className="create-food-input"
                    type="number"
                    value={protein}
                    onChange={e => setProtein(e.target.value)}
                />

                <label className="create-food-label">Number of Servings:</label>
                <input
                    className="create-food-input"
                    type="number"
                    value={servings}
                    onChange={e => setServings(e.target.value)}
                    placeholder="Number of Servings"
                />
            </div>

            <button className="button">Add Food</button>
        </form>
    )
}

export default CreateFood;