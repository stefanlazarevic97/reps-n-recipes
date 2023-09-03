import { useDispatch, useSelector } from 'react-redux';
import titleize from '../../Utils/utils'
import './Profile.css'
import NutritionCharts from '../NutritionCharts/NutritionCharts';
import ExerciseCharts from '../ExerciseCharts/ExerciseCharts';
import { useState } from 'react';
import { addWeightByDate, receiveUserHealth, updateUser } from '../../store/users';

const Profile = () => {
    const currentUser = useSelector(state => state.session.user);    
    const healthData = useSelector(state => state.users.healthData);
    const weightGoal = useSelector(state => state.users.healthData.weightGoal);
    const maintain = weightGoal ? null : 'Maintain Weight';
    const [weight, setWeight] = useState(healthData.mass * 2.204623);
    const [massUnit, setMassUnit] = useState('pounds'); 
    const dispatch = useDispatch();
    
    const handleMassUnitChange = e => {
        const newUnit = e.currentTarget.value;
    
        if (newUnit === 'pounds' && massUnit === 'kilos') {
            setWeight(prevWeight => parseFloat((prevWeight * 2.204623).toFixed(1)));
        } else if (newUnit === 'kilos' && massUnit === 'pounds') {
            setWeight(prevWeight => parseFloat((prevWeight / 2.204623).toFixed(1)));
        }
        
        setMassUnit(newUnit);
    };

    const handleWeightChange = e => {
        let value = parseFloat(e.currentTarget.value);
            if (Number.isNaN(value)) {
                setWeight('');
            } else {
                setWeight(parseFloat(value.toFixed(1)));
        }  
    };

    const updatedHealthData = { ...healthData, mass: massUnit === 'pounds' ? weight / 2.204623 : weight};

    const handleWeightSubmit = (e) => {
        e.preventDefault();
        const date = new Date().toLocaleDateString();
        const updatedUser = { ...currentUser, healthData: updatedHealthData };
        const weightInKg = massUnit === 'pounds' ? weight / 2.204623 : weight;
        dispatch(addWeightByDate(Number(weightInKg), date));
        dispatch(updateUser(updatedUser));
        dispatch(receiveUserHealth(updatedHealthData));
    };

    return (
        <div>
            <div className="profile-container">
                <section className="profile-section">
                    <div className="profile-chart-container">
                        <NutritionCharts />
                    </div>
                </section>

                <section className="profile-section">

                    <div className="profile-info">
                        <h2 className="header">Hello, {titleize(currentUser.username)}</h2>
                        
                        <div className="stats">
                                <div className="stat-label">Mass</div>
                                <div className="stat-value">{healthData.mass.toFixed(1)} kg</div>

                                <div className="stat-label">Height</div>
                                <div className="stat-value">{Math.round(healthData.height)} cm</div>

                                <div className="stat-label">Age</div>
                                <div className="stat-value">{Math.round(healthData.age)}</div>

                                <div className="stat-label">Total Daily Energy Expenditure</div>
                                <div className="stat-value">{Math.round(healthData.TDEE)} calories</div>

                                <div className="stat-label">Goal</div>

                                {maintain && 
                                    <div className="stat-value">{maintain}</div>
                                }

                                {!maintain && weightGoal > 0 && 
                                    <div className="stat-value">Gain {weightGoal} lbs per week</div>
                                }

                                <div className="stat-label">Recommended Daily Intake</div>
                                <div className="stat-value">{Math.round(healthData.TDEE + weightGoal * 500)} calories</div>
                        </div>

                        <form 
                            onSubmit={handleWeightSubmit}
                            className='weight-update-container'
                        >
                            <div className='subheader'>Enter Current Weight</div>
                            
                            <div className="weight-update">
                                <input 
                                    className="weight-update-input"
                                    type="number"
                                    step="0.1"
                                    value={weight}
                                    onChange={handleWeightChange}
                                />

                                <select 
                                    className="weight-update-input"
                                    onChange={handleMassUnitChange} 
                                    value={massUnit}
                                >
                                    <option value="pounds">lb</option>
                                    <option value="kilos">kg</option>
                                </select>
                            </div>

                            <button className="button">Update Weight</button>
                        </form>
                    </div>
                </section>

                <section className="profile-section">
                    <div className="profile-chart-container">
                        <ExerciseCharts />
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Profile;