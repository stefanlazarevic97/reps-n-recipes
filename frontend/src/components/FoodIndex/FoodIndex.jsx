import { getFoods, addUserNutrition, fetchRecipe, fetchMenuItem, fetchIngredient, fetchProduct, clearFoods } from '../../store/foods';
import './FoodIndex.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import moment from 'moment';
import {fetchIngredients, fetchProducts, fetchMenuItems, fetchRecipes} from '../../store/foods'
import titleize from '../../Utils/utils'

const FoodIndex = () => {
    const dispatch = useDispatch();
    const foods = useSelector(getFoods);
    const selectedOption = useSelector(state => state.ui.selectedOption);
    const date = useSelector(state => state.ui.selectedDate);
    const [selectedDate, setSelectedDate] = useState(new moment().format('YYYY-MM-DD'));
    const [selectedFood, setSelectedFood] = useState(null);
    const [foodQuantity, setFoodQuantity] = useState(1);
    const [searchResults, setSearchResults] = useState(foods);
    const [offset, setOffset] = useState(0);

    // const handleDateChange = (e) => {
    //     setSelectedDate(e.target.value);
    //     dispatch(changeSelectedDate(e.target.value));
    // }

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
            dateConsumed: selectedDate,
            servings: foodQuantity
        };

        dispatch(addUserNutrition(foodItem));
        setSelectedFood(null);
        setSearchResults([]);
        dispatch(clearFoods());
        sessionStorage.removeItem("query");
        setOffset(0);
        setFoodQuantity(1);
    }

    useEffect(() => {
        setSearchResults(foods);
    }, [foods]);

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
    
    useEffect(() => {
        if (selectedOption === 'ingredients') {
            dispatch(fetchIngredients(sessionStorage.getItem("query"), offset));
        } else if (selectedOption === 'products') {
            dispatch(fetchProducts(sessionStorage.getItem("query"), offset));
        } else if (selectedOption === 'menuItems') {
            dispatch(fetchMenuItems(sessionStorage.getItem("query"), offset));
        } else {
            dispatch(fetchRecipes(sessionStorage.getItem("query"), offset))
        }
    }, [offset])

    useEffect(() => {
        return () => {
            setOffset(0);
            sessionStorage.removeItem("query");
        }
    }, [])
    const handleNextPage = (e) => {
        setOffset((prev) => prev + 10);
        e.preventDefault();
    } 
        
    const handlePreviousPage = (e) => {
        setOffset((prev) => prev - 10);
        e.preventDefault();
    } 
        
    return (
        <>
            {searchResults.length > 0 && 
                <div className="food-index">
                    {/* <div className="date-input-container">
                        <label className="date-label">Select Date: </label>
                        
                        <input 
                            className="date-input"
                            type="date" 
                            value={selectedDate} 
                            onChange={handleDateChange} 
                        />
                    </div> */}
                
                    <h2 className="header">Search Results</h2>
                    
                    <ul className="food-item-container">
                        {searchResults && searchResults.map(food => (
                            <li
                                onClick={() => handleClick(food)}
                                key={food.id}
                                className="food-item"
                            >
                                {food.name ? titleize(food.name) : titleize(food.title) }
                            </li>
                        ))}
                        
                        <div className="pagination-button-container">
                            {offset > 9 && (
                                <button 
                                    onClick={handlePreviousPage}
                                    className="button pagination-button"
                                >
                                    Previous Page
                                </button>
                            )}

                            {Object.values(searchResults).length === 10 && Object.values(searchResults) !== 0 && (
                                <button 
                                    onClick={handleNextPage}
                                    className="button pagination-button"
                                >
                                    Next Page
                                </button>
                            )}
                        </div>
                    </ul>

                    <div className="selected-food-container">
                        {selectedFood && (
                            <div className="selected-food">
                                <div className="nutrition-facts">
                                    <h3 className="nutrition-facts-header">{selectedFood.name ? titleize(selectedFood.name) : titleize(selectedFood.title)}</h3>
                                    <p>Calories: {Math.round(destructureFood('Calories'))}</p>
                                    <p>Carbs: {Math.round(destructureFood('Carbohydrates'))} g</p>
                                    <p>Fat: {Math.round(destructureFood('Fat'))} g</p>
                                    <p>Protein: {Math.round(destructureFood('Protein'))} g</p>
                                    {servingAmount() && servingUnit() && <p>Serving Size: {servingAmount()} {servingUnit()}</p>}
                                </div>

                                <div className="food-index-quantity-container">
                                    <label 
                                        className="food-index-quantity-label"
                                    >
                                        Quantity:               
                                    </label>
                                    <input 
                                        className="food-index-input"
                                        type="number" 
                                        id="quantity" 
                                        value={foodQuantity} 
                                        onChange={handleQuantityChange} 
                                    />    
                                </div>

                                <button 
                                    className="button" 
                                    onClick={handleAddFood}
                                >
                                    Add Food
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            }
        </>
    )
}

export default FoodIndex;