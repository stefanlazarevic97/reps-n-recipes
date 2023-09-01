import { useSelector, useDispatch } from "react-redux";
import FoodInput from "../FoodInput/FoodInput";
import FoodIndex from "../FoodIndex/FoodIndex";
import NutritionIndex from '../NutritionIndex/NutritionIndex'
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../store/session";
import CreateFood from '../CreateFood/CreateFood'
import GenerateMealPlan from '../GenerateMealPlan/GenerateMealPlan'
import MealPlanShow from "../MealPlanShow/MealPlanShow";
import { useHistory } from "react-router-dom";
import './HomePage.css'
import moment from "moment";
import { changeSelectedDate } from '../../store/ui';

const HomePage = () => {
    const currentUser = useSelector(state => state.session.user);
    const [selectedOption, setSelectedOption] = useState('ingredients');
    const dispatch = useDispatch();
    const [selectedDate, setSelectedDate] = useState(new moment().format('YYYY-MM-DD'));
    const [showCreateFood, setShowCreateFood] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if (currentUser) {
            dispatch(getCurrentUser());
        }
    }, [dispatch])

    const goToWorkoutPage = () => {
        history.push("/workout");
    };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
        dispatch(changeSelectedDate(e.target.value));
    }

    return (
        <div className="nutrition-page">
            <section className="food-input-section">
                <div className="date-input-container">
                    <label className="date-label">Select Date: </label>
                    
                    <input 
                        className="date-input"
                        type="date" 
                        value={selectedDate} 
                        onChange={handleDateChange} 
                    />
                </div>

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
                <FoodIndex selectedOption={selectedOption} selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
            </section>

            <section className="nutrition-index">
                <NutritionIndex />
            </section>

            <section className="meal-plan-section">
                <GenerateMealPlan />
                <MealPlanShow />
            </section>

            <div className="toggle-button-container">
                <div 
                    id="toggle-page-type-button" 
                    className="button workout-button" 
                    onClick={goToWorkoutPage}
                >
                    <div>
                        Workouts
                    </div>
                </div>
            </div>

            <footer className="footer">
                Copyright &copy; 2023 Reps 'N' Recipes
            </footer>
        </div>
    );
}

export default HomePage;