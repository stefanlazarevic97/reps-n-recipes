import { useSelector } from 'react-redux';
import FoodInput from '../FoodInput/FoodInput';
import FoodIndex from '../FoodIndex/FoodIndex';
import { useState } from 'react';
import NutritionIndex from '../NutritionIndex/NutritionIndex'

const Profile = () => {
    const currentUser = useSelector(state => state.session.user);    
    const [selectedOption, setSelectedOption] = useState('ingredients');

    return (
        <>
            <h2>Hello, {currentUser.username}</h2>
            <FoodInput selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
            <FoodIndex selectedOption={selectedOption} />
            <NutritionIndex />
        </>
    );
}

export default Profile;