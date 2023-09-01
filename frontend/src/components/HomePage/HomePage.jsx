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
    const dispatch = useDispatch();
    const selectedDate = useSelector(state => state.ui.selectedDate);
    const [showCreateFood, setShowCreateFood] = useState(false);

    useEffect(() => {
        if (currentUser) {
            dispatch(getCurrentUser());
        }
    }, [currentUser, dispatch])

    return (
        <div className="nutrition-page">
            <section className="food-input-section">
                <button 
                    className="button"
                    onClick={() => setShowCreateFood(true)}
                >
                    Create Food
                </button>

                {showCreateFood && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                                <div 
                                    className="modal-close"
                                    onClick={() => setShowCreateFood(false)}
                                >
                                    &times;
                                </div>
                            
                            <CreateFood selectedDate={selectedDate}/>
                        </div>
                    </div>
                )}

                <FoodInput selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
                <FoodIndex selectedOption={selectedOption} />
            </section>

            <section className="nutrition-index">
                <NutritionIndex />
            </section>

            <section className="meal-plan-section">
                <GenerateMealPlan />
                <MealPlanShow />
            </section>

            <footer className='footer'>
                Copyright &copy; 2023 Reps 'N' Recipes
            </footer>
        </div>
    );
}

export default HomePage;