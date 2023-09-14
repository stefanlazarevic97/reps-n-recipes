import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIngredients, fetchProducts, fetchMenuItems, fetchRecipes } from "../../store/foods";
import './FoodInput.css';
import { changeSelectedOption } from "../../store/ui";

const FoodInput = ({ setHasSubmitted }) => {
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState("");
    const selectedOption = useSelector(state => state.ui.selectedOption);

    const handleDropdownChange = (e) => {
        const newSelectedOption = e.target.value;
        dispatch(changeSelectedOption(newSelectedOption));
    }

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (selectedOption === 'ingredients') {
            await dispatch(fetchIngredients(searchQuery, 0));
        } else if (selectedOption === 'products') {
            await dispatch(fetchProducts(searchQuery, 0));
        } else if (selectedOption === 'menuItems') {
            await dispatch(fetchMenuItems(searchQuery, 0));
        } else {
            await dispatch(fetchRecipes(searchQuery, 0))
        }
        setHasSubmitted(true);
        sessionStorage.setItem("query", searchQuery)
        setSearchQuery('')
    } 
    
    return (
        <div className='food-search-container'>
            <h2 className="header">Search for a Food</h2>
            
            <form 
                className="food-search-form"
                onSubmit={handleSubmit}
            >
                <div className="food-search-dropdown-container">
                    <label className="food-search-dropdown-label">Select Category: </label>
                    <select 
                        className="food-search-input"
                        value={selectedOption}
                        onChange={handleDropdownChange}
                    >
                        <option value="ingredients">Ingredients</option>
                        <option value="products">Products</option>
                        <option value="menuItems">Menu Items</option>
                        <option value="recipes">Recipes</option>
                    </select>
                </div>

                <input 
                    className='food-search-input'
                    placeholder="Enter food name here"
                    type="text" 
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                
                <button className="button">Search</button>
            </form>
        </div>
    )
}

export default FoodInput;