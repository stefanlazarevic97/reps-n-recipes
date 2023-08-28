import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './HealthForm.css';

const HealthForm = () => {

    const [unit, setUnit] = useState('feet-inches'); 


    const [weight, setWeight] = useState('');
    const [foot, setFoot] = useState();
    const [inch, setInch] = useState();
    const [cm, setCm] = useState('');
    const [age, setAge] = useState('');
    const [sex, setSex] = useState(null);

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
            const val = parseInt(e.currentTarget.value, 10)
            setState(val);
        }
    }

    const handleUnitChange = e => {
        setUnit(e.currentTarget.value);
    };


       

    return (
        <div className="health-form-container">
        <div className="health-form-background" 
        // onClick={handleExit}
        >
        </div>

            <form className="health-form" 
            // onSubmit={handleSubmit}
            >

                <h2>Tell us about yourself</h2>

                <div className="errors">{errors?.weight}</div>

                <div className='weight-input'>
                    <div>Weight</div>
                    <input type="text"
                        onChange={update('weight')}
                        value={weight}
                    />
                    <select>
                        <option value="pounds">lb</option>
                        <option value="kilos">kg</option>
                    </select>
                </div>


                <div className="errors">{errors?.cm || errors?.foot}</div>
                <div className='height-input'>

                    <div>Height</div>

                    {unit === 'feet-inches' ? (
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
                
                    <select onChange={handleUnitChange} value={unit}>
                        <option value="feet-inches">Foot/Inch</option>
                        <option value="meters-cm">CM</option>
                    </select>
                </div> 

                <div className='age-input'>
                    <div>Age</div>
                    <input type="text"
                        onChange={update('age')}
                        value={age}
                    />
                </div>


                <div className='gender-input'>
                    <label>Male
                        <input 
                            type="radio" 
                            value = "M"
                            checked = {sex === "M"}
                            onChange={e => setSex(e.target.value)}
                        />
                    </label>
                    <label>Female
                        <input 
                            type="radio" 
                            value = "F"
                            checked = {sex === "F"}
                            onChange={e => setSex(e.target.value)}
                        />
                    </label>
                    <label>Prefer not to say
                        <input 
                            type="radio" 
                            value = "?"
                            checked = {sex === "?"}
                            onChange={e => setSex(e.target.value)}
                        />
                    </label>

                </div>

                {/* <input
                    type="submit"
                    value="Log In"
                    disabled={!weight || !true}
                /> */}
                <button
                disabled={!weight || !(foot || cm)}>Submit</button>

            </form>
            

              
            
        </div>
    )




}

export default HealthForm