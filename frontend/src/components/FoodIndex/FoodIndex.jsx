import { getFoods, fetchFood } from '../../store/foods';
import './FoodIndex.css';
import { useDispatch, useSelector } from 'react-redux';

const FoodIndex = () => {
    const dispatch = useDispatch()
    const foods = useSelector(getFoods)

    const handleClick = () => {
        dispatch(fetchFood())
    }

    return (
        <div className="food-index">
            <h2>Search Results</h2>
            <ul>
                {foods && foods.map(food => (
                    <>
                        <li key={food.fdcId}>
                            {food.name}
                        </li>
                        <button onClick={handleClick}>Add Food</button>
                    </>
                ))}
            </ul>
        </div>
    )
}

export default FoodIndex;