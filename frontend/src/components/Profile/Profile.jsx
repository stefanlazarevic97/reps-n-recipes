import { useSelector } from 'react-redux';
import FoodInput from '../FoodInput/FoodInput';
import FoodIndex from '../FoodIndex/FoodIndex';
import { useState } from 'react';

function Profile () {
    const currentUser = useSelector(state => state.session.user);    
    const [selectedOption, setSelectedOption] = useState('ingredients');

    return (
        <>
            <h2>Hello, {currentUser.username}</h2>
            <FoodInput selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
            <FoodIndex selectedOption={selectedOption} />
        </>
    );
}

export default Profile;