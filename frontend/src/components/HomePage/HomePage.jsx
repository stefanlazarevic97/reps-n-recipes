import { useSelector } from "react-redux";
import FoodInput from "../FoodInput/FoodInput";
import HealthForm from "../HealthForm/HealthForm";

const HomePage = () => {
    const currentUser = useSelector(state => state.session.user);

    return (
        <>
            {currentUser && <FoodInput />}
            <footer>
                Copyright &copy; 2023 appAcademy
            </footer>
        </>
    );
}

export default HomePage;