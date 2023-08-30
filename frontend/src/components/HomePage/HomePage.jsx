import { useSelector } from "react-redux";
import FoodInput from "../FoodInput/FoodInput";
import NutritionIndex from '../NutritionIndex/NutritionIndex'

const HomePage = () => {
    const currentUser = useSelector(state => state.session.user);

    return (
        <>
            {currentUser && <FoodInput />}
            <NutritionIndex />
            <footer>
                Copyright &copy; 2023 appAcademy
            </footer>
        </>
    );
}

export default HomePage;