import { useSelector, useDispatch } from "react-redux";
import FoodInput from "../FoodInput/FoodInput";
import FoodIndex from "../FoodIndex/FoodIndex";
import NutritionIndex from '../NutritionIndex/NutritionIndex'
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../store/session";
import CreateFood from '../CreateFood/CreateFood'
import GenerateMealPlan from '../GenerateMealPlan/GenerateMealPlan'
import MealPlanShow from "../MealPlanShow/MealPlanShow";
import './HomePage.css'

const HomePage = () => {
    const currentUser = useSelector(state => state.session.user);
    const [selectedOption, setSelectedOption] = useState('ingredients');
    const [isToggled, setIsToggled] = useState(false);
    const dispatch = useDispatch();
    const selectedDate = useSelector(state => state.ui.selectedDate)

    useEffect(() => {
        if (currentUser) {
            dispatch(getCurrentUser());
        }
    }, [])

    return (
        <>
            <div className='switch-container'>
                <label className='switch'>
                    <input 
                        type='checkbox' 
                        checked={isToggled}
                        onChange={() => setIsToggled(!isToggled)}
                    />
                    <span className="slider"></span>
                </label>
            </div>
            {currentUser && (isToggled ? <CreateFood selectedDate={selectedDate}/> : <FoodInput selectedOption={selectedOption} setSelectedOption={setSelectedOption} />)}
            {currentUser && <FoodIndex selectedOption={selectedOption} />}
            {currentUser && <NutritionIndex />}
            {currentUser && <GenerateMealPlan />}
            {currentUser && <MealPlanShow />}
            <footer className='footer'>
                Copyright &copy; 2023 Reps 'N' Recipes
            </footer>
        </>
    );
}

export default HomePage;