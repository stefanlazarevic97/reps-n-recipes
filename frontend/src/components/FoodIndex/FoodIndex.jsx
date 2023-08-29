import { getFoods, fetchFood, addUserNutrition, getFullFoodItem } from '../../store/foods';
import './FoodIndex.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

const FoodIndex = () => {
    const dispatch = useDispatch()
    const foods = useSelector(getFoods)
    const selectedOption = useSelector(state => state.ui.selectedOption)
    const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString('en-CA'));
    const [selectedFood, setSelectedFood] = useState(null);
    const [foodQuantity, setFoodQuantity] = useState(1);

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    }

    const handleQuantityChange = (e) => {
        setFoodQuantity(e.target.value);
    }
    
    const handleClick = async (food) => {
        const foodDetail = await dispatch(fetchFood(selectedOption, food.id));
        setSelectedFood(foodDetail);
    }

    const handleAddFood = () => {
        const foodItem = {
            foodName: selectedFood.name,
            foodQuantity: selectedFood.amount,
            foodQuantityUnit: selectedFood.unit,
            calories: destructureFood('Calories'),
            gramsCarbs: destructureFood("Carbohydrates"),
            gramsFat: destructureFood("Fat"),
            gramsProtein: destructureFood("Protein"),
            dateConsumed: selectedDate
        };
        dispatch(addUserNutrition(foodItem));
    }

    const destructureFood = (component) => {
        return selectedFood.nutrition.nutrients.filter((nutrient)=> nutrient.name === component)[0].amount
    }

    return (
        <div className="food-index">
            <h2>Search Results</h2>
            <div className="date-input">
                <label>Select Date: </label>
                <input type="date" value={selectedDate} onChange={handleDateChange} />
            </div>
            <ul>
                {foods && foods.map(food => (
                    <>
                        <li
                            onClick={() => handleClick(food)}
                            key={food.id}
                            className="food-item"
                        >
                            {food.name}
                        </li>
                    </>
                ))}
            </ul>

            <div>
                {selectedFood && (
                <div className="selected-food">
                    <h3>Selected Food: {selectedFood.name}</h3>
                    <p>Calories: {destructureFood('Calories')}</p>
                    <p>Carbs: {destructureFood("Carbohydrates")}</p>
                    <p>Fat: {destructureFood("Fat")}</p>
                    <p>Protein: {destructureFood("Protein")}</p>
                    <p>Serving Size: {selectedFood.amount} {selectedFood.unit}</p>
                    <label>Quantity:               
                        <input 
                            type="number" 
                            id="quantity" 
                            value={foodQuantity} 
                            onChange={handleQuantityChange} 
                        />
                    </label>
                    
                    <button onClick={handleAddFood}>Add Food</button>
                </div>
            )}
            </div>
        </div>
    )
}

export default FoodIndex;