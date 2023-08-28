import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './HealthForm.css';

const HealthForm = () => {

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

    // const dispatch = useDispatch();

    // const handleExit = e => {
    //     e.stopPropagation()
    //     dispatch(deactivateHealthForm())
    // }
       
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
        // console.log(e.currentTarget.value)
        setDistanceUnit(e.currentTarget.value);
        // console.log(distanceUnit)
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

    const handleSubmit = e => {
        e.preventDefault();
        // e.stopPropagation();

        const mass = (massUnit === "kilos") ? weight : lbToKg(weight);
        const height = (distanceUnit === "cm") ? cm : ftInToCm(foot, inch)
        const coeff = activityCoefficient()
        const tdee = TDEE(mass, height, coeff)

        const userData = {
            mass,
            height,
            age,
            sex,
            activity,
            tdee
        }
        console.log(userData)
    }


       

    return (
        <div className="health-form-container">
        <div className="health-form-background" 
        // onClick={handleExit}
        >
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


                <div className='gender-input hf-block'>
                    <div className='hfh'>Gender / Sex</div>
                    <label>Male
                        <input 
                            type="radio" 
                            value = "M"
                            checked = {sex === "M"}
                            onChange={e => setSex(e.target.value)}
                        />
                    </label>
                    <label >Female
                        <input 
                            type="radio" 
                            value = "F"
                            checked = {sex === "F"}
                            onChange={e => setSex(e.target.value)}
                        />
                    </label>
                    {/* <label>Prefer not to say
                        <input 
                            type="radio" 
                            value = "?"
                            checked = {sex === "?"}
                            onChange={e => setSex(e.target.value)}
                        />
                    </label> */}
                </div>

                <div className='activity-input hf-block'>
                    <div className='hfh'>Activity Level</div>
                    <label>Sedentary
                        <input 
                            type="radio" 
                            value = "S"
                            checked = {activity === "S"}
                            onChange={e => setActivity(e.target.value)}
                        />
                    </label>
                    <label>Lightly Active
                        <input 
                            type="radio" 
                            value = "LA"
                            checked = {activity === "LA"}
                            onChange={e => setActivity(e.target.value)}
                        />
                    </label>
                    <label>Moderately Active
                        <input 
                            type="radio" 
                            value = "MA"
                            checked = {activity === "MA"}
                            onChange={e => setActivity(e.target.value)}
                        />
                    </label>
                    <label>Very Active
                        <input 
                            type="radio" 
                            value = "VA"
                            checked = {activity === "VA"}
                            onChange={e => setActivity(e.target.value)}
                        />
                    </label>
                    <label>Extremely Active
                        <input 
                            type="radio" 
                            value = "EA"
                            checked = {activity === "EA"}
                            onChange={e => setActivity(e.target.value)}
                        />
                    </label>
                </div>

                <button
                disabled={!weight || !((foot && inch) || cm) || 
                !age || !sex || !activity}>Submit</button>

            </form>  
            
        </div>
    )

}

export default HealthForm