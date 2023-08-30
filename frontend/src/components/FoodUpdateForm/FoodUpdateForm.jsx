import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserNutrition } from '../../store/foods';

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
                <input 
                    value={foodQuantity}
                    onChange={e => setFoodQuantity(e.target.value)}
                />

                <button>Save</button>
            </form>
            <button onClick={onCancel}>Cancel</button>
        </>
    )
}

export default FoodUpdateForm;