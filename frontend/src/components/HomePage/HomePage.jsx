import { useSelector, useDispatch } from "react-redux";
import FoodInput from "../FoodInput/FoodInput";
import FoodIndex from "../FoodIndex/FoodIndex";
import NutritionIndex from '../NutritionIndex/NutritionIndex'
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../store/session";

const HomePage = () => {
    const currentUser = useSelector(state => state.session.user);
    const [selectedOption, setSelectedOption] = useState('ingredients');
    const dispatch = useDispatch();

    useEffect(() => {
        if (currentUser) {
            dispatch(getCurrentUser());
        }
    }, [])

    return (
        <>
            {currentUser && <FoodInput selectedOption={selectedOption} setSelectedOption={setSelectedOption} />}
            {currentUser && <FoodIndex selectedOption={selectedOption} />}
            {currentUser && <NutritionIndex />}
            
            <footer>
                Copyright &copy; 2023 appAcademy
            </footer>
        </>
    );
}

export default HomePage;