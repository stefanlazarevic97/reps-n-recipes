import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchFoods } from "../../store/foods";
import './FoodInput.css';

const FoodInput = () => {
    const dispatch = useDispatch();
    const [selectedOption, setSelectedOption] = useState("ingredients");
    const [searchQuery, setSearchQuery] = useState("");

    const handleDropdownChange = (e) => {
        setSelectedOption(e.target.value);
    }

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(fetchFoods(selectedOption, searchQuery));
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