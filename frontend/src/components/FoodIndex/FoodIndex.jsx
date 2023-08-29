import { getFoods, fetchFood } from '../../store/foods';
import './FoodIndex.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

const FoodIndex = () => {
    const dispatch = useDispatch()
    const foods = useSelector(getFoods)
    const selectedOption = useSelector(state => state.ui.selectedOption)
    const [selectedDate, setSelectedDate] = useState('');
    
    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    }
    
    const handleClick = (foodId) => {
        console.log("foodId: ", foodId);
        console.log("selectedOption: ", selectedOption);
        console.log("selectedDate: ", selectedDate);
        dispatch(fetchFood(selectedOption, foodId))
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
                            onClick={() => handleClick(food.id)}
                            key={food.id}
                            className="food-item"
                        >
                            {food.name}
                        </li>
                    </>
                ))}
            </ul>

            <div>
                {/* {selectedFood} */}
            </div>
        </div>
    )
}

export default FoodIndex;