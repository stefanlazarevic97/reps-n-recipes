import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIngredients, fetchProducts, fetchMenuItems, fetchRecipes } from "../../store/foods";
import './FoodInput.css';
import { changeSelectedOption } from "../../store/ui";

const FoodInput = () => {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (selectedOption === 'ingredients') {
            dispatch(fetchIngredients(searchQuery));
        } else if (selectedOption === 'products') {
            dispatch(fetchProducts(searchQuery));
        } else if (selectedOption === 'menuItems') {
            dispatch(fetchMenuItems(searchQuery));
        } else {
            dispatch(fetchRecipes(searchQuery))
        }
    } 
    
    return (
        <>
            <h2 className="food-search">Search for a Food</h2>
            <form 
                className="food-search-form"
                onSubmit={handleSubmit}
            >
                <label className="search-dropdown">Select Category:
                    <select 
                        value={selectedOption}
                        onChange={handleDropdownChange}
                    >
                        <option value="ingredients">Ingredients</option>
                        <option value="products">Products</option>
                        <option value="menuItems">Menu Items</option>
                        <option value="recipes">Recipes</option>
                    </select>
                </label>

                <label className="search-label">
                    <input 
                        className='search-query'
                        placeholder="Enter food name here"
                        type="text" 
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </label>
                
                <button className="button">Search</button>
            </form>
        </>
    )
}

export default FoodInput;