import { useSelector } from 'react-redux';
import FoodInput from '../FoodInput/FoodInput';
import FoodIndex from '../FoodIndex/FoodIndex';
import { useState } from 'react';
import NutritionIndex from '../NutritionIndex/NutritionIndex'
import './Profile.css'

const Profile = () => {
    const currentUser = useSelector(state => state.session.user);    
    const healthData = useSelector(state => state.users.healthData)


    return (
        <div>
            <h2>Hello, {currentUser.username}</h2>
            <div className="profile-info">
                <div>Mass: {Math.round(healthData.mass)} kg</div>
                <div>Height: {healthData.height} cm</div>
                <div>Age: {healthData.age}</div>
                <div>Activity Level: {healthData.activityLevel}</div>
            </div>
        </div>
    );
}

export default Profile;