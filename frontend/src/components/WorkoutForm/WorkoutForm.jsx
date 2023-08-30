import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deactivateWorkoutForm } from '../../store/ui';
import { getWorkoutFormState } from '../../store/ui';
import { FaSearch } from "react-icons/fa"
import './WorkoutForm.css';


const WorkoutForm = ({
    exerciseList, setExerciseList,
    selectedExercise, setSelectedExercise,
    addExercise, setAddExercise,
    listItems
                        }) => {

    // const [addExercise, setAddExercise] = useState(false)
    // const [selectedExercise, setSelectedExercise] = useState('')
    // const [exerciseList, setExerciseList] = useState([])
    const dispatch = useDispatch()
    // const active = useSelector(getWorkoutFormState)

    // // ! would use a fetch here to get a relevant list from db
    // const listItems = [
    //     "Crunch", "Bench Press", "Bulgarian Split Squats", "Squat", "Bicep Curls", "Leg Press"
    // ]

    // if (!active) return null

    console.log(selectedExercise)

    const handleExit = e => {
        e.stopPropagation()
        dispatch(deactivateWorkoutForm())
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
        setAddExercise(false)
    }

    // const makeExerciseList = () => {

    //     const list = exerciseList.map((exercise)=>{
    //         return (
    //             <li key={exercise} className='exercise-ele'>
    //                 <div>{exercise}</div>
    //                 <div>kg input...</div>
    //                 <div>reps input...</div>
    //             </li>
    //         )
    //     })
    //     return (
    //         <>
    //             <ul>
    //                 {list}
    //             </ul>
    //         </>
    //     )
    // }

    const mapListItems = () => {
        return listItems.map((item, i)=>{
            return (
                <div key = {i}
                className = {`list-item ${selectedExercise === item ? "selected" : ""}`}
                value={item}
                onClick={() => setSelectedExercise(item)}
                >
                    {item}
                </div>
            )
        })
    }

    return (
        <div className="workout-form-container">
        <div className="workout-form-background" onClick={handleExit}>
        </div>
            <form className="workout-form" onSubmit={handleSubmit}>

                <div className='add-or-new'>
                    <button onClick={handleAdd}
                    // className={`${selectedExercise ? "ready-to-press" : ""}`}
                    >New</button>
                    <button onClick={handleAdd}
                    className={`${selectedExercise ? "ready-to-press" : ""}`}
                    >Add</button>
                </div>
                <div className="search-exercise">
                    <FaSearch className='search-icon'/>
                    <input type="text" placeholder='search'/>
                </div>
                <div className="list-wrapper">
                    {mapListItems()}
                </div>

            </form>  
        </div>
    )
}

export default WorkoutForm