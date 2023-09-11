import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserNutrition } from '../../store/foods';
import './FoodUpdateForm.css'

const FoodUpdateForm = ({ food, onCancel }) => {
    const dispatch = useDispatch();
    const prevFoodQuantity = food.servings
    const [foodQuantity, setFoodQuantity] = useState(food.servings);

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(updateUserNutrition({
            ...food,
            calories: food.calories / prevFoodQuantity * foodQuantity,
            gramsCarbs: food.gramsCarbs / prevFoodQuantity * foodQuantity,
            gramsFat: food.gramsFat / prevFoodQuantity * foodQuantity,
            gramsProtein: food.gramsProtein / prevFoodQuantity * foodQuantity,
            servings: foodQuantity
        }));
        setFoodQuantity(1)
        onCancel();
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="food-index-quantity-container">
                    <label 
                        className="food-index-quantity-label"
                    >
                        Quantity:               
                    </label>

                    <input 
                        className="food-index-input"
                        type='number'
                        min='0'
                        value={foodQuantity}
                        onChange={e => setFoodQuantity(e.target.value)}
                    />
                </div>

                <div className="food-update-button-container">
                    <button className="button food-update-button">Save</button>
                    <button 
                        onClick={onCancel}
                        className="button food-update-button"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </>
    )
}

export default FoodUpdateForm;