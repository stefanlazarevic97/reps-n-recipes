import FoodInput from "../FoodInput/FoodInput";
import HealthForm from "../HealthForm/HealthForm";

function HomePage() {
    return (
        <>
            <FoodInput />
            <HealthForm/>
            <footer>
                Copyright &copy; 2023 appAcademy
            </footer>
        </>
    );
}

export default HomePage;