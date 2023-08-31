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
    listItems}) => {
    const dispatch = useDispatch()

    console.log(selectedExercise)


    const handleExit = e => {
        e.stopPropagation()
        dispatch(deactivateWorkoutForm())
        setSelectedExercise('')
    }

    const handleSubmit = async e => {
        e.preventDefault();
    }

    const handleAdd = () => {
        const added = listItems.find(item => item.name === selectedExercise);
        const newList = [...exerciseList, added]
        setExerciseList(newList)

        sessionStorage.setItem(
            "currentWorkout", JSON.stringify(newList)
        )

        setAddExercise(false)
        dispatch(deactivateWorkoutForm())
        setSelectedExercise('')
    }


    const mapListItems = () => {
        return listItems.map((item, i)=>{
            return (
                <div key = {i}
                className = {`list-item ${selectedExercise === item.name ? "selected" : ""}`}
                value={item}
                onClick={() => (selectedExercise === item.name) ? setSelectedExercise('') : setSelectedExercise(item.name)}
                >
                    <div
                    className = {`item-overlay ${selectedExercise === item.name ? "selected" : ""}`}
                    ></div>
                    <div className='image-container'><img src={item.gif ? item.gif : ""} alt="" /></div>
                    <div className='exercise-titles'>
                        <div>{item.name}</div>
                        <div>{item.muscleGroup}</div>
                    </div>
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
                    <button className='create-exercise' onClick={handleAdd}
                    >Create Exercise</button>
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