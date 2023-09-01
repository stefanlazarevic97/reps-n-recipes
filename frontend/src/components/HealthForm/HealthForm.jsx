import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deactivateHealthForm } from '../../store/ui';
import { getHealthFormState } from '../../store/ui';
import './HealthForm.css';
import { receiveUserHealth, updateUser } from '../../store/users'
import { RiInformationFill } from 'react-icons/ri'

const HealthForm = () => {
    const dispatch = useDispatch()
    const active = useSelector(getHealthFormState)
    const currentUser = useSelector(state => state.session.user);
    const [distanceUnit, setDistanceUnit] = useState('feet-inches'); 
    const [massUnit, setMassUnit] = useState('pounds'); 
    const [weight, setWeight] = useState('');
    const [foot, setFoot] = useState('');
    const [inch, setInch] = useState('');
    const [cm, setCm] = useState('');
    const [age, setAge] = useState('');
    const [sex, setSex] = useState(null);
    const [activity, setActivity] = useState(null);
    const [weightGoal, setWeightGoal] = useState(null);
    const [targetCalories, setTargetCalories] = useState(null)
    const errors = useSelector(state => state.errors.session);
    const [isHovered, setIsHovered] = useState({ S: false, LA: false, MA: false, VA: false, EA: false });

    if (!active) return null

    const handleExit = e => {
        e.stopPropagation()
        dispatch(deactivateHealthForm())
    }
       
    const update = (field) => {
        return e => {
            let setState;
            
            switch (field){
                case 'weight':
                    setState = setWeight;
                    break;
                case 'foot':
                    setState = setFoot;
                    break;
                case 'inch':
                    setState = setInch;
                    break;
                case 'cm':
                    setState = setCm;
                    break;
                case 'age':
                    setState = setAge;
                    break;
                default: 
                    return;
            }
            setState(Number(e.currentTarget.value) || null);
        }
    }

    const handleDistanceUnitChange = e => {
        setDistanceUnit(e.currentTarget.value);
    };

    const handleMassUnitChange = e => {
        setMassUnit(e.currentTarget.value);
    };

    const lbToKg = (massLb) => {
        return (massLb / 2.204623);
    }

    const ftInToCm = (foot, inch) => {
        return (foot * 30.48) + (inch * 2.54);
    }

    const activityCoefficient = () => {
        if (activity === "S") return 1.2 
        if (activity === "LA") return 1.375
        if (activity === "MA") return 1.55
        if (activity === "VA") return 1.725
        if (activity === "EA") return 1.9
        return 1
    }

    const TDEE = (mass, height, coeff) => {
        return (sex === "M") ?
            coeff * (10 * mass + 6.25 * height - 5 * age + 5) : 
            coeff * (10 * mass + 6.25 * height - 5 * age - 161)
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const mass = (massUnit === "kilos") ? weight : lbToKg(weight);
        const height = (distanceUnit === "cm") ? cm : ftInToCm(foot, inch);
        const coeff = activityCoefficient();
        const tdee = TDEE(mass, height, coeff);
        const activityMap = {"S": 1, "LA": 2, "MA": 3,"VA": 4, "EA": 5};

        const healthData = {
            mass, 
            height, 
            age, 
            sex, 
            activityLevel: activityMap[activity],
            TDEE: tdee, 
            weightGoal
        }
        
        if (currentUser){
            const updatedUser = {...currentUser,healthData}
            await dispatch(updateUser(updatedUser));
            dispatch(receiveUserHealth(healthData));
            dispatch(deactivateHealthForm())
        } else {
            console.error("No user available to update");
        }
    }

    return (
        <div className="health-form-container">
            <div className="health-form-background" onClick={handleExit}></div>

            <form className="health-form" onSubmit={handleSubmit}>
                <h1 className="header">Tell us about yourself</h1>
                <div className="health-form-errors">{errors?.weight}</div>

                <div className='weight-input-container'>
                    <div className='subheader'>Weight</div>

                    
                    <input 
                        className="health-form-input"
                        type="text"
                        onChange={update('weight')}
                        value={weight}
                    />

                    <select 
                        className="health-form-input"
                        onChange={handleMassUnitChange} 
                        value={massUnit}
                    >
                        <option value="pounds">lb</option>
                        <option value="kilos">kg</option>
                    </select>
                </div>

                <div className="health-form-errors">{errors?.cm || errors?.foot}</div>

                <div className="height-input-container">
                    <div className='subheader'>Height</div>
                    {distanceUnit === 'feet-inches' ? (
                        <>
                            <input 
                                className="health-form-input"
                                type="text"
                                onChange={update('foot')}
                                value={foot}
                            />
                            <input 
                                className="health-form-input"
                                type="text"
                                onChange={update('inch')}
                                value={inch}
                            />
                        </>
                        ) : (
                        <>
                            <input 
                                className="health-form-input"
                                type="text"
                                onChange={update('cm')}
                                value={cm}
                            />
                        </>
                    )}
                    <select 
                        className="health-form-input"
                        onChange={handleDistanceUnitChange} 
                        value={distanceUnit}
                    >
                        <option value="feet-inches">Foot/Inch</option>
                        <option value="cm">CM</option>
                    </select>
                </div> 

                <div className="age-input-container">
                    <div className="subheader">Age</div>
                    <input 
                        className="health-form-input"
                        type="text"
                        onChange={update('age')}
                        value={age}
                    />
                </div>
                
                <div className="health-form-radio-buttons">
                    <div className="left-radio-buttons">
                        <div className="radio-buttons-container">
                            <div className="radio-buttons-subheader">Sex</div>
                            <div className="radio-buttons">
                                <label>
                                    <input 
                                        type="radio" 
                                        value="M"
                                        checked={sex === "M"}
                                        onChange={e => setSex(e.target.value)}
                                    /> Male
                                </label>
                                <label>
                                    <input 
                                        type="radio" 
                                        value="F"
                                        checked={sex === "F"}
                                        onChange={e => setSex(e.target.value)}
                                    /> Female
                                </label>
                            </div>
                        </div>

                        <div className="radio-buttons-container">
                            <div className="radio-buttons-subheader">Activity Level</div>
                            
                            <div className="radio-buttons">
                                <label className="activity-level-label">
                                    <input 
                                        type="radio" 
                                        value="S"
                                        checked={activity === "S"}
                                        onChange={e => setActivity(e.target.value)}
                                    /> Sedentary

                                    <RiInformationFill
                                        className="info-icon"
                                        onMouseEnter={() => setIsHovered({ ...isHovered, S: true })}
                                        onMouseLeave={() => setIsHovered({ ...isHovered, S: false })}
                                    >
                                        {isHovered && (
                                            <div className="tooltip">Little to no exercise and a desk job</div>
                                        )}
                                    </RiInformationFill>
                                </label>

                                <label className="activity-level-label">
                                    <input 
                                        type="radio" 
                                        value="LA"
                                        checked={activity === "LA"}
                                        onChange={e => setActivity(e.target.value)}
                                    /> Lightly Active

                                    <RiInformationFill
                                        className="info-icon"
                                        onMouseEnter={() => setIsHovered({ ...isHovered, LA: true })}
                                        onMouseLeave={() => setIsHovered({ ...isHovered, LA: false })}
                                    >
                                        {isHovered && (
                                            <div className="tooltip">Light exercise or sports 1-3 days a week</div>
                                        )}
                                    </RiInformationFill>
                                </label>

                                <label className="activity-level-label">
                                    <input 
                                        type="radio" 
                                        value="MA"
                                        checked={activity === "MA"}
                                        onChange={e => setActivity(e.target.value)}
                                    /> Moderately Active

                                    <RiInformationFill
                                        className="info-icon"
                                        onMouseEnter={() => setIsHovered({ ...isHovered, MA: true })}
                                        onMouseLeave={() => setIsHovered({ ...isHovered, MA: false })}
                                    >
                                        {isHovered && (
                                            <div className="tooltip">Moderate exercise or sports 3-5 days a week</div>
                                        )}
                                    </RiInformationFill>
                                </label>

                                <label className="activity-level-label">
                                    <input 
                                        type="radio" 
                                        value="VA"
                                        checked={activity === "VA"}
                                        onChange={e => setActivity(e.target.value)}
                                    /> Very Active

                                    <RiInformationFill
                                        className="info-icon"
                                        onMouseEnter={() => setIsHovered({ ...isHovered, VA: true })}
                                        onMouseLeave={() => setIsHovered({ ...isHovered, VA: false })}
                                    >
                                        {isHovered && (
                                            <div className="tooltip">Hard exercise or sports 6-7 days a week</div>
                                        )}
                                    </RiInformationFill>
                                </label>

                                <label className="activity-level-label">
                                    <input 
                                        type="radio" 
                                        value="EA"
                                        checked={activity === "EA"}
                                        onChange={e => setActivity(e.target.value)}
                                    /> Extremely Active

                                    <RiInformationFill
                                        className="info-icon"
                                        onMouseEnter={() => setIsHovered({ ...isHovered, EA: true })}
                                        onMouseLeave={() => setIsHovered({ ...isHovered, EA: false })}
                                    >
                                        {isHovered && (
                                            <div className="tooltip">Very hard exercise, physical job, or training twice a day</div>
                                        )}
                                    </RiInformationFill>
                                </label>
                            </div>
                        </div>
                    </div>
                    
                    <div className="right-radio-buttons">
                        <div className="radio-buttons-container">
                            <div className="radio-buttons-subheader">Weekly Weight Goals</div>
                            <div className="radio-buttons">
                                <label>
                                    <input 
                                        type="radio" 
                                        value={-2.0}
                                        checked={weightGoal === -2.0}
                                        onChange={e => setWeightGoal(Number(e.target.value))}
                                        /> Lose 2lb / 900g
                                </label>

                                <label>
                                    <input 
                                        type="radio" 
                                        value={-1.5}
                                        checked={weightGoal === -1.5}
                                        onChange={e => setWeightGoal(Number(e.target.value))}
                                        /> Lose 1.5lb / 700g
                                </label>

                                <label>
                                    <input 
                                        type="radio" 
                                        value={-1.0}
                                        checked={(weightGoal === -1.0)}
                                        onChange={e => setWeightGoal(Number(e.target.value))}
                                        /> Lose 1lb / 450g
                                </label>

                                <label>
                                    <input 
                                        type="radio" 
                                        value={-0.5}
                                        checked={weightGoal === -0.5}
                                        onChange={e => setWeightGoal(Number(e.target.value))}
                                        /> Lose 0.5lb / 230g
                                </label>

                                <label>
                                    <input
                                        type="radio"
                                        value={0}
                                        checked={weightGoal === 0}
                                        onChange={e => setWeightGoal(Number(e.target.value))}
                                    /> Maintain Weight
                                </label>

                                <label>
                                    <input 
                                        type="radio" 
                                        value={0.5}
                                        checked={weightGoal === 0.5}
                                        onChange={e => setWeightGoal(Number(e.target.value))}
                                        /> Gain 0.5lb / 230g
                                </label>

                                <label>
                                    <input 
                                        type="radio" 
                                        value={1.0}
                                        checked={weightGoal === 1.0}
                                        onChange={e => setWeightGoal(Number(e.target.value))}
                                        /> Gain 1lb / 450g
                                </label>

                                <label>
                                    <input 
                                        type="radio" 
                                        value={1.5}
                                        checked={weightGoal === 1.5}
                                        onChange={e => setWeightGoal(Number(e.target.value))}
                                        /> Gain 1.5lb / 700g
                                </label>

                                <label>
                                    <input 
                                        type="radio" 
                                        value={2.0}
                                        checked={weightGoal === 2.0}
                                        onChange={e => setWeightGoal(Number(e.target.value))}
                                        /> Gain 2lb / 900g
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <button 
                    className="button"
                    disabled={!weight || !((foot && inch) || cm) || 
                !age || !sex || !activity}
                >
                    Submit
                </button>
            </form>  
        </div>
    )
}

export default HealthForm;