import { useSelector } from 'react-redux';
import FoodInput from '../FoodInput/FoodInput';
import FoodIndex from '../FoodIndex/FoodIndex';

function Profile () {
    const currentUser = useSelector(state => state.session.user);    

    return (
        <>
            <h2>Hello, {currentUser.username}</h2>
            <FoodInput />
            <FoodIndex />
        </>
    );
}

export default Profile;