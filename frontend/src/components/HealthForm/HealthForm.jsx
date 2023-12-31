import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deactivateHealthForm } from '../../store/ui';
import { getHealthFormState } from '../../store/ui';
import { receiveUserHealth, updateUser } from '../../store/users'
import { RiInformationFill } from 'react-icons/ri'
import { RxReset } from 'react-icons/rx'
import { RxCross1 } from 'react-icons/rx'
import './HealthForm.css';

const HealthForm = () => {
    const dispatch = useDispatch()
    const active = useSelector(getHealthFormState)
    const currentUser = useSelector(state => state.session.user);
    const userHealthData = useSelector(state => state.users.healthData)
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
    const [presentGoal, setPresentGoal] = useState(false)
    const [tdee, setTdee] = useState(null)
    const errors = useSelector(state => state.errors.session);
    const [isHovered, setIsHovered] = useState({ S: false, LA: false, MA: false, VA: false, EA: false });
    const [formErrors, setFormErrors] = useState({
        weight: null,
        cm: null,
        foot: null,
        buttons: null
    });
    
    const revertActivityLevelMap = {
        1: "S",
        2: "LA",
        3: "MA",
        4: "VA",
        5: "EA"
    };

    const cmToFeetInches = cm => {
        const totalInches = cm / 2.54;
        const feet = Math.floor(totalInches / 12);
        const inches = Math.round(totalInches % 12);
        return { feet, inches };
    }

    useEffect(() => {
        if (userHealthData) {
            if (massUnit === 'pounds') {
                setWeight(parseFloat((userHealthData.mass * 2.204623).toFixed(1)) || '');
            } else {
                setWeight(parseFloat(userHealthData.mass.toFixed(1)) || '');
            }

            setFoot(cmToFeetInches(userHealthData.height).feet || '');
            setInch(cmToFeetInches(userHealthData.height).inches || '');
            setCm(userHealthData.height || '');
            setAge(userHealthData.age || '');
            setSex(userHealthData.sex || null);
            setActivity(revertActivityLevelMap[userHealthData.activityLevel] || null);
            setWeightGoal(userHealthData.weightGoal || null);
        }
    },[userHealthData, massUnit])

    if (!active) return null

    const handleExit = e => {
        e.stopPropagation()
        dispatch(deactivateHealthForm())
    }
       
    const update = (field) => {
        return e => {
            let value = e.currentTarget.value;
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

            if (field === 'weight') {
                if (value === '') {
                    setState('');
                } else {
                    value = parseFloat(value);
                    if (!Number.isNaN(value)) {
                        setState(parseFloat(value.toFixed(1)));
                    }
                }
            } else {
                setState(Number(value) || null);
            }        
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
        const tdee = (sex === "M") ? coeff * (10 * mass + 6.25 * height - 5 * age + 5)
        : coeff * (10 * mass + 6.25 * height - 5 * age - 161)
        setTdee(tdee)
        return tdee
    }

    const handleSubmit = async e => {
        e.preventDefault();

        if (!weight || !(foot || cm) || !age || sex === null || activity === null || weightGoal === null) {
            if (weightGoal !== 0) {
                alert("Please fill in all fields!")
                return
            }
        }
        

        const mass = (massUnit === "kilos") ? weight : lbToKg(weight);
        const height = (distanceUnit === "cm") ? cm : ftInToCm(foot, inch);
        const coeff = activityCoefficient();
        const tdee = TDEE(mass, height, coeff);
        const activityMap = {"S": 1, "LA": 2, "MA": 3,"VA": 4, "EA": 5};

        if (mass < 0.1 || mass > 1000) {
            setFormErrors({ ...formErrors, weight: "Please enter a valid weight" });
            // return
        }
        if (distanceUnit === "feet-inches" && (foot < 0 || foot > 10 || inch < 0 || inch > 11)) {
            setFormErrors({ ...formErrors, foot: "Please enter a valid height" });
            // return
        }
        if (distanceUnit === "cm" && (cm < 0 || cm > 300)) {
            setFormErrors({ ...formErrors, cm: "Please enter a valid height" });
            // return
        }
        if (age < 0 || age > 120) {
            setFormErrors({ ...formErrors, age: "Please enter a valid age" });
            // return
        }
        if (sex === null || activity === null || weightGoal === null) {
            setFormErrors({ ...formErrors, buttons: 'Please fill in all fields' });
            // return
        }
        if (Object.values(formErrors).some(err => err !== null)) {
            return;
        }

        const healthData = {
            mass, 
            height, 
            age, 
            sex, 
            activityLevel: activityMap[activity],
            TDEE: tdee, 
            weightGoal
        }  
        
        if (currentUser) {
            const updatedUser = {...currentUser, healthData}
            await dispatch(updateUser(updatedUser));
            dispatch(receiveUserHealth(healthData));
            setPresentGoal(true)
            setTargetCalories(tdee + weightGoal * 500)
            setFormErrors({
                weight: null,
                cm: null,
                foot: null,
                inch: null,
                buttons: null
            })
        } else {
            console.error("No user available to update");
            setFormErrors({
                weight: null,
                cm: null,
                foot: null,
                inch: null,
                buttons: null
            })
        }
    }

    const resetForm = () => {
        setWeight('')
        setFoot('');
        setInch('');
        setCm('');
        setAge('');
        setSex(null);
        setActivity(null);
        setWeightGoal(null);
    }

    return (
        <div className="health-form-container">
            <div className="health-form-background" onClick={handleExit}></div>

            <form className="health-form" onSubmit={handleSubmit}>
                {!presentGoal && 
                    <>
                        <div className='hf-header-container'>
                            <button id="hf-exit" onClick={handleExit}><RxCross1/></button>
                            <h1 className="header">Tell us about yourself</h1>
                            <button id="hf-reset" onClick={resetForm}>reset <RxReset/></button>
                        </div>
                        {/* {formErrors && <div className="health-form-errors">{formErrors?.weight}</div>} */}

                        <div className='weight-input-container'>
                            <div className='subheader'>Weight</div>

                            
                            <input 
                                className="health-form-input"
                                type="number"
                                min='0.1'
                                step="0.1"
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

                        {/* {(formErrors?.cm || formErrors?.foot) && <div className="health-form-errors">{formErrors?.cm || formErrors?.foot}</div>} */}

                        <div className="height-input-container">
                            <div className='subheader'>Height</div>
                            {distanceUnit === 'feet-inches' ? (
                                <>
                                    <input 
                                        className="health-form-input"
                                        type="number"
                                        min='0'
                                        onChange={update('foot')}
                                        value={foot}
                                    />
                                    <input 
                                        className="health-form-input"
                                        type="number"
                                        min='0'
                                        max='11'
                                        onChange={update('inch')}
                                        value={inch}
                                    />
                                </>
                                ) : (
                                <>
                                    <input 
                                        className="health-form-input"
                                        type="number"
                                        min='0'
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
                        {/* <div className="health-form-errors">{formErrors?.age}</div> */}
                        <div className="age-input-container">
                            <div className="subheader">Age</div>
                            <input 
                                className="health-form-input"
                                type="number"
                                min='0'
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
                                                name='sex'
                                                checked={sex === "M"}
                                                onChange={e => setSex(e.target.value)}
                                                required
                                            /> Male
                                        </label>
                                        <label>
                                            <input 
                                                type="radio" 
                                                value="F"
                                                name='sex'
                                                checked={sex === "F"}
                                                onChange={e => setSex(e.target.value)}
                                                required
                                            /> Female
                                        </label>
                                    </div>
                                </div>

                                <div className="radio-buttons-container">
                                    <div className="radio-buttons-subheader">Activity Level</div>
                                    
                                    <div className="radio-buttons">
                                        <label className="activity-level-label">
                                            <div className="activity-level-container">
                                                <input 
                                                    type="radio" 
                                                    value="S"
                                                    name='activity-level'
                                                    checked={activity === "S"}
                                                    onChange={e => setActivity(e.target.value)}
                                                    required
                                                /> Sedentary
                                            </div>

                                            {isHovered.S && (
                                                <div className="tooltip">Little to no exercise and a desk job</div>
                                            )}

                                            <RiInformationFill
                                                className="info-icon"
                                                onMouseEnter={() => setIsHovered({ ...isHovered, S: true })}
                                                onMouseLeave={() => setIsHovered({ ...isHovered, S: false })}
                                            />     
                                        </label>

                                        <label className="activity-level-label">
                                            <div className="activity-level-container">
                                                <input 
                                                    type="radio" 
                                                    value="LA"
                                                    name='activity-level'
                                                    checked={activity === "LA"}
                                                    onChange={e => setActivity(e.target.value)}
                                                    required
                                                /> Lightly Active
                                            </div>

                                            {isHovered.LA && (
                                                <div className="tooltip">Light exercise or sports 1-3 days a week</div>
                                            )}

                                            <RiInformationFill
                                                className="info-icon"
                                                onMouseEnter={() => setIsHovered({ ...isHovered, LA: true })}
                                                onMouseLeave={() => setIsHovered({ ...isHovered, LA: false })}
                                            />
                                        </label>

                                        <label className="activity-level-label">
                                            <div className="activity-level-container">
                                                <input 
                                                    type="radio" 
                                                    value="MA"
                                                    name='activity-level'
                                                    checked={activity === "MA"}
                                                    onChange={e => setActivity(e.target.value)}
                                                    required
                                                /> Moderately Active
                                            </div>

                                            {isHovered.MA && (
                                                <div className="tooltip">Moderate exercise or sports 3-5 days a week</div>
                                            )}

                                            <RiInformationFill
                                                className="info-icon"
                                                onMouseEnter={() => setIsHovered({ ...isHovered, MA: true })}
                                                onMouseLeave={() => setIsHovered({ ...isHovered, MA: false })}
                                            />
                                        </label>

                                        <label className="activity-level-label">
                                            <div className="activity-level-container">
                                                <input 
                                                    type="radio" 
                                                    value="VA"
                                                    name='activity-level'
                                                    checked={activity === "VA"}
                                                    onChange={e => setActivity(e.target.value)}
                                                    required
                                                /> Very Active
                                            </div>

                                            {isHovered.VA && (
                                                <div className="tooltip">Hard exercise or sports 6-7 days a week</div>
                                            )}

                                            <RiInformationFill
                                                className="info-icon"
                                                onMouseEnter={() => setIsHovered({ ...isHovered, VA: true })}
                                                onMouseLeave={() => setIsHovered({ ...isHovered, VA: false })}
                                            />
                                        </label>

                                        <label className="activity-level-label">
                                            <div className="activity-level-container">
                                                <input 
                                                    type="radio" 
                                                    value="EA"
                                                    name='activity-level'
                                                    checked={activity === "EA"}
                                                    onChange={e => setActivity(e.target.value)}
                                                    required
                                                /> Extremely Active
                                            </div>

                                            {isHovered.EA && (
                                                <div className="tooltip">Very hard exercise, physical job, or training twice a day</div>
                                            )}

                                            <RiInformationFill
                                                className="info-icon"
                                                onMouseEnter={() => setIsHovered({ ...isHovered, EA: true })}
                                                onMouseLeave={() => setIsHovered({ ...isHovered, EA: false })}
                                            />
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
                                                name='weight-goal'
                                                checked={weightGoal === -2.0}
                                                onChange={e => setWeightGoal(Number(e.target.value))}
                                                required
                                                /> Lose 2lb / 900g
                                        </label>

                                        <label>
                                            <input 
                                                type="radio" 
                                                value={-1.5}
                                                name='weight-goal'
                                                checked={weightGoal === -1.5}
                                                onChange={e => setWeightGoal(Number(e.target.value))}
                                                required
                                                /> Lose 1.5lb / 700g
                                        </label>

                                        <label>
                                            <input 
                                                type="radio" 
                                                value={-1.0}
                                                name='weight-goal'
                                                checked={(weightGoal === -1.0)}
                                                onChange={e => setWeightGoal(Number(e.target.value))}
                                                required
                                                /> Lose 1lb / 450g
                                        </label>

                                        <label>
                                            <input 
                                                type="radio" 
                                                value={-0.5}
                                                name='weight-goal'
                                                checked={weightGoal === -0.5}
                                                onChange={e => setWeightGoal(Number(e.target.value))}
                                                required
                                                /> Lose 0.5lb / 230g
                                        </label>

                                        <label>
                                            <input
                                                type="radio"
                                                value={0}
                                                name='weight-goal'
                                                checked={weightGoal === 0}
                                                onChange={e => setWeightGoal(Number(e.target.value))}
                                                required
                                            /> Maintain Weight
                                        </label>

                                        <label>
                                            <input 
                                                type="radio" 
                                                value={0.5}
                                                name='weight-goal'
                                                checked={weightGoal === 0.5}
                                                onChange={e => setWeightGoal(Number(e.target.value))}
                                                required
                                                /> Gain 0.5lb / 230g
                                        </label>

                                        <label>
                                            <input 
                                                type="radio" 
                                                value={1.0}
                                                name='weight-goal'
                                                checked={weightGoal === 1.0}
                                                onChange={e => setWeightGoal(Number(e.target.value))}
                                                required
                                                /> Gain 1lb / 450g
                                        </label>

                                        <label>
                                            <input 
                                                type="radio" 
                                                value={1.5}
                                                name='weight-goal'
                                                checked={weightGoal === 1.5}
                                                onChange={e => setWeightGoal(Number(e.target.value))}
                                                required
                                                /> Gain 1.5lb / 700g
                                        </label>

                                        <label>
                                            <input 
                                                type="radio" 
                                                value={2.0}
                                                name='weight-goal'
                                                checked={weightGoal === 2.0}
                                                onChange={e => setWeightGoal(Number(e.target.value))}
                                                required
                                                /> Gain 2lb / 900g
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button 
                            className="button"
                            // disabled={!weight || !(foot || cm) || 
                            //         !age || !sex || !activity}
                        >
                            Submit
                        </button>
                    </>

                }

                {presentGoal &&
                    <>
                        <div className="present-maintenance">
                            <div className="header">Your estimated daily energy expenditure is:</div>
                            <div className="header maintenance">{Math.round(tdee)} calories</div>
                        </div>

                        <div className="present-goals">
                            {Number(weightGoal) === 0 && 
                                <div className="header">To maintain your weight, your recommended daily intake is:</div>
                            }

                            {Number(weightGoal) !== 0 && 
                                <div className="header">To {(weightGoal > 0) ? "gain" : "lose"} {Math.abs(weightGoal)} {(weightGoal === 1 || weightGoal === -1) ? "pound" : "pounds"} per week, your recommended daily intake is:</div>
                            }

                            <div className="header goals">{Math.round(targetCalories)} calories</div>
                        </div>

                        <div className='present-weight-buttons'>
                            <button className="button restart-form" onClick={()=>setPresentGoal(false)}>
                                Start again
                            </button>

                            <button className="button" onClick={()=>dispatch(deactivateHealthForm())}>
                                Done
                            </button>
                        </div>
                    </>
                }
            </form>      
        </div>  
    )
}

export default HealthForm