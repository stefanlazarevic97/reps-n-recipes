import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deactivateHealthForm } from '../../store/ui';
import { getWorkoutFormState } from '../../store/ui';
import './WorkoutForm.css';


const WorkoutForm = () => {

    const [addExercise, setAddExercise] = useState(false)
    const [selectedExercise, setSelectedExercise] = useState('')
    const [exerciseList, setExerciseList] = useState([])
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

    const selectedAnExercise = e => {
        const exercise = e.currentTarget.value
        setSelectedExercise(exercise)
    }

    const handleAdd = () => {
        const newList = [...exerciseList, selectedExercise]
        setExerciseList(newList)
    }

    const makeExerciseList = () => {

        const list = exerciseList.map((exercise)=>{
            return (
                <li key={exercise} className='exercise-ele'>
                    <div>{exercise}</div>
                    <div>kg input...</div>
                    <div>reps input...</div>
                </li>
            )
        })
        return (
            <>
                <ul>
                    {list}
                </ul>
            </>
        )
    }

    return (
        <div className="workout-form-container">
        <div className="workout-form-background" onClick={handleExit}>
        </div>
            <form className="workout-form" onSubmit={handleSubmit}>

                {makeExerciseList()}

                <button onClick={()=>setAddExercise(true)}>Add Exercises</button>
                {addExercise && 
                    <div>
                        <input type="text" placeholder='search'/>
                        <div>
                            <select onChange={selectedAnExercise} value={selectedExercise}>
                                <option value="crunch">Crunch</option>
                                <option value="bench">Bench Press</option>
                                <option value="bulg-squat">Bulgarian Split Squats</option>
                            </select>
                        </div>
                        <button onClick={handleAdd}>Add</button>
                    </div>
                }
            </form>  
        </div>
    )
}

export default WorkoutForm