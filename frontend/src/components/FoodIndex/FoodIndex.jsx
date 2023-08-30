import { getFoods, addUserNutrition, fetchRecipe, fetchMenuItem, fetchIngredient, fetchProduct } from '../../store/foods';
import './FoodIndex.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { changeSelectedDate } from '../../store/ui';

const FoodIndex = () => {
    const dispatch = useDispatch();
    const foods = useSelector(getFoods);
    const selectedOption = useSelector(state => state.ui.selectedOption);
    const date = useSelector(state => state.ui.selectedDate);
    const [selectedDate, setSelectedDate] = useState(new moment().format('YYYY-MM-DD'));
    const [selectedFood, setSelectedFood] = useState(null);
    const [foodQuantity, setFoodQuantity] = useState(1);

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
        dispatch(changeSelectedDate(e.target.value));
    }

    const handleQuantityChange = (e) => {
        setFoodQuantity(e.target.value);
    }
    
    const handleClick = async (food) => {      
        let foodDetail; 
        
        if (selectedOption === 'ingredients') {
            foodDetail = await dispatch(fetchIngredient(food.id));
        } else if (selectedOption === 'products') {
            foodDetail = await dispatch(fetchProduct(food.id));
        } else if (selectedOption === 'menuItems') {
            foodDetail = await dispatch(fetchMenuItem(food.id));
        } else {
            foodDetail = await dispatch(fetchRecipe(food.id))
        }
        
        setSelectedFood(foodDetail);
    }

    const handleAddFood = () => {
        const foodItem = {
            foodName: selectedFood.name ? selectedFood.name : selectedFood.title,
            foodQuantity: servingAmount() * foodQuantity,
            foodQuantityUnit: servingUnit(),
            calories: destructureFood('Calories') * foodQuantity,
            gramsCarbs: destructureFood("Carbohydrates") * foodQuantity,
            gramsFat: destructureFood("Fat") * foodQuantity,
            gramsProtein: destructureFood("Protein") * foodQuantity,
            dateConsumed: selectedDate
        };
        
        dispatch(addUserNutrition(foodItem));
        setSelectedFood(null);
    }

    const destructureFood = (component) => {
        return selectedFood.nutrition.nutrients.filter((nutrient) => nutrient.name === component)[0]?.amount || 0;
    }

    const servingAmount = () => {
        let servingAmount; 

        if (selectedOption === 'ingredients') {
            if (selectedFood.amount) {
                servingAmount = selectedFood.amount;
            }
        } else if (selectedOption === 'products' || selectedOption === 'menuItems') {
            if (selectedFood.servings.size) {
                servingAmount = selectedFood.servings.size;
            }
        } else {
            if (selectedFood.nutrition.weightPerServing.amount) {
                servingAmount = selectedFood.nutrition.weightPerServing.amount;
            }
        }

        return servingAmount ? servingAmount : null;
    }

    const servingUnit = () => {
        let servingUnit; 

        if (selectedOption === 'ingredients') {
            if (selectedFood.unit) {
                servingUnit = selectedFood.unit;
            }
        } else if (selectedOption === 'products' || selectedOption === 'menuItems') {
            if (selectedFood.servings.unit) {
                servingUnit = selectedFood.servings.unit;
            }
        } else {
            if (selectedFood.nutrition.weightPerServing.unit) {
                servingUnit = selectedFood.nutrition.weightPerServing.unit;
            }
        }

        return servingUnit ? servingUnit : null;
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
                        <li
                            onClick={() => handleClick(food)}
                            key={food.id}
                            className="food-item"
                        >
                            {food.name ? food.name : food.title }
                        </li>
                ))}
            </ul>

            <div>
                {selectedFood && (
                <div className="selected-food">
                    <h3>Selected Food: {selectedFood.name ? selectedFood.name : selectedFood.title}</h3>
                    <p>Calories: {destructureFood('Calories')}</p>
                    <p>Carbs: {destructureFood('Carbohydrates')}</p>
                    <p>Fat: {destructureFood('Fat')}</p>
                    <p>Protein: {destructureFood('Protein')}</p>
                    {servingAmount() && servingUnit() && <p>Serving Size: {servingAmount()} {servingUnit()}</p>}

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