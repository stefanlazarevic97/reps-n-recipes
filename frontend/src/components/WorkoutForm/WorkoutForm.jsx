import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deactivateHealthForm } from '../../store/ui';
import { getWorkoutFormState } from '../../store/ui';
import './WorkoutForm.css';


const WorkoutForm = () => {

    const dispatch = useDispatch()
    const active = useSelector(getWorkoutFormState)

    if (!active) return null

    const handleExit = e => {
        e.stopPropagation()
        dispatch(deactivateHealthForm())
    }


    const handleSubmit = async e => {
        e.preventDefault();
    }


    return (
        <div className="workout-form-container">
        <div className="workout-form-background" onClick={handleExit}>
        </div>

            <form className="workout-form" onSubmit={handleSubmit}>

            </form>  
            
        </div>
    )

}

export default WorkoutForm