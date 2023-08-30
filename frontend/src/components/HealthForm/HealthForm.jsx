import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deactivateHealthForm } from '../../store/ui';
import { getHealthFormState } from '../../store/ui';
import './HealthForm.css';
// import { updateUser } from '../../store/session';
import { receiveUserHealth } from '../../store/users'
import { updateUser } from '../../store/users';

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

    const errors = useSelector(state => state.errors.session);

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
            setState(parseInt(e.currentTarget.value, 10));
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
        return (sex === "M") ? coeff*(10*mass + 6.25*height - 5*age + 5)
        : coeff*(10*mass + 6.25*height - 5*age - 161)
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const mass = (massUnit === "kilos") ? weight : lbToKg(weight);
        const height = (distanceUnit === "cm") ? cm : ftInToCm(foot, inch)
        const coeff = activityCoefficient()
        const tdee = TDEE(mass, height, coeff)
        const activityMap = {"S":1, "LA":2, "MA":3,"VA":4, "EA":5}
        const healthData = {mass,height,age,sex,activityLevel: activityMap[activity],TDEE: tdee}
        if (currentUser){
            const updatedUser = {...currentUser,healthData}
            await dispatch(updateUser(updatedUser));
            dispatch(receiveUserHealth(healthData));
            dispatch(deactivateHealthForm())
        }else{
            console.error("No user available to update");
        }
    }


    return (
        <div className="health-form-container">
        <div className="health-form-background" onClick={handleExit}>
        </div>

            <form className="health-form" onSubmit={handleSubmit}>

                <h2 className='health-form-header'>Tell us about yourself</h2>

                <div className="errors">{errors?.weight}</div>

                <div className='weight-input hf-block'>
                    <div className='hfh'>Weight</div>
                    <input type="text"
                        onChange={update('weight')}
                        value={weight}
                    />
                    <select onChange={handleMassUnitChange} value={massUnit}>
                        <option value="pounds">lb</option>
                        <option value="kilos">kg</option>
                    </select>
                </div>


                <div className="errors">{errors?.cm || errors?.foot}</div>
                <div className='height-input hf-block'>
                    <div className='hfh'>Height</div>
                    {distanceUnit === 'feet-inches' ? (
                        <>
                            <input type="text"
                                onChange={update('foot')}
                                value={foot}
                            />
                            <input type="text"
                                onChange={update('inch')}
                                value={inch}
                            />
                        </>
                        ) : (
                        <>
                            <input type="text"
                                onChange={update('cm')}
                                value={cm}
                            />
                        </>
                    )}
                    <select onChange={handleDistanceUnitChange} value={distanceUnit}>
                        <option value="feet-inches">Foot/Inch</option>
                        <option value="cm">CM</option>
                    </select>
                </div> 

                <div className='age-input hf-block'>
                    <div className='hfh'>Age</div>
                    <input type="text"
                        onChange={update('age')}
                        value={age}
                    />
                </div>


                <div className='gender-input hf-block' id="gender-input">
                    <div className='hfh'>Gender / Sex</div>
                    <div className='radio-button-block'>
                        <label>
                            <input 
                                type="radio" 
                                value = "M"
                                checked = {sex === "M"}
                                onChange={e => setSex(e.target.value)}
                            />Male
                        </label>
                        <label >
                            <input 
                                type="radio" 
                                value = "F"
                                checked = {sex === "F"}
                                onChange={e => setSex(e.target.value)}
                            />Female
                        </label>
                    </div>
                </div>

                <div className='activity-input hf-block' id="activity-input">
                    <div className='hfh'>Activity Level</div>
                    <div className='radio-button-block'>
                        <label>
                            <input 
                                type="radio" 
                                value = "S"
                                checked = {activity === "S"}
                                onChange={e => setActivity(e.target.value)}
                                />Sedentary
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                value = "LA"
                                checked = {activity === "LA"}
                                onChange={e => setActivity(e.target.value)}
                                />Lightly Active
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                value = "MA"
                                checked = {activity === "MA"}
                                onChange={e => setActivity(e.target.value)}
                                />Moderately Active
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                value = "VA"
                                checked = {activity === "VA"}
                                onChange={e => setActivity(e.target.value)}
                                />Very Active
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                value = "EA"
                                checked = {activity === "EA"}
                                onChange={e => setActivity(e.target.value)}
                                />Extremely Active
                        </label>
                    </div>
                </div>

                <button className='submit-health-from'
                disabled={!weight || !((foot && inch) || cm) || 
                !age || !sex || !activity}>Submit</button>

            </form>  
            
        </div>
    )

}

export default HealthForm