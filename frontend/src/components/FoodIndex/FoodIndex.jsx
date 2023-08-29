import { getFoods, fetchFood } from '../../store/foods';
import './FoodIndex.css';
import { useDispatch, useSelector } from 'react-redux';

const FoodIndex = () => {
    const dispatch = useDispatch()
    const foods = useSelector(getFoods)
    const selectedOption = useSelector(state => state.ui.selectedOption)

    const handleClick = (foodId) => {
        console.log("foodId: ", foodId);
        console.log("selectedOption: ", selectedOption);

        dispatch(fetchFood(selectedOption, foodId))
    }

    return (
        <div className="food-index">
            <h2>Search Results</h2>
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
        </div>
    )
}

export default FoodIndex;