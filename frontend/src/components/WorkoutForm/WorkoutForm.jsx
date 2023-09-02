import { useDispatch } from 'react-redux';
import { deactivateWorkoutForm } from '../../store/ui';
import { FaSearch } from "react-icons/fa";
import React, { useState } from 'react';
import './WorkoutForm.css';

const WorkoutForm = ({
    exerciseList, 
    setExerciseList,
    selectedExercise,
    setSelectedExercise,
    setAddExercise,
    listItems
}) => {
    const dispatch = useDispatch();

    const [isFocused, setIsFocused] = useState(false);

    const handleExit = e => {
        e.stopPropagation();
        dispatch(deactivateWorkoutForm());
        setSelectedExercise('');
    }

    const handleSubmit = async e => {
        e.preventDefault();
    }

    const handleAdd = () => {
        const currentWorkout = JSON.parse(sessionStorage.getItem("currentWorkout"));

        currentWorkout.sets.push({ [selectedExercise]: [{kg: null, reps: null, done: false}] });

        sessionStorage.setItem("currentWorkout", JSON.stringify(currentWorkout));

        const newList = [...exerciseList, {[selectedExercise]: [{kg: null, reps: null}]} ];
        setExerciseList(newList);
        setAddExercise(false);
        dispatch(deactivateWorkoutForm());
        setSelectedExercise('');
    }


    const mapListItems = () => {
        return listItems.map((item, i) => {
            return (
                <div 
                    key = {i}
                    className = {
                        `list-item ${
                            selectedExercise === item.name ?
                            "selected" :
                            ""
                        }`
                    }
                    value={item}
                    onClick={() => (
                        selectedExercise === item.name) ? 
                        setSelectedExercise('') : 
                        setSelectedExercise(item.name)
                    }
                >
                    <div
                        className="exercise-container"
                    >
                        <div className="exercise-titles">
                            <div>{item.name}</div>
                        </div>

                        <div className="image-container">
                            <img 
                                className="exercise-gif"
                                src={item.gif ? item.gif : ""} 
                                alt="" 
                            />
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (
        <div className="workout-form-container">
            <div className="workout-form-background" onClick={handleExit}></div>
            <form className="workout-form" onSubmit={handleSubmit}>
                {/* <h3 className="subheader exercise-subheader">Choose an Exercise</h3> */}

                <div className='add-search-container'>

                    <div className={`search-container ${isFocused ? 'focused' : ''}`}>
                        <div className="search-exercise">
                            <FaSearch className='search-icon'/>
                        </div>
                        <input 
                            className="search-input"
                            type="text" 
                            placeholder='Search for exercise...'
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                        />
                    </div>

                    <button 
                        onClick={handleAdd}
                        className={
                            `${selectedExercise ?
                            "workout-button ready-to-press" 
                            : "workout-button hidden"}`
                        }
                    >
                        Add
                    </button>
                </div>

                <div className="list-wrapper">
                    {mapListItems()}
                </div>
            </form>  
        </div>
    )
}

export default WorkoutForm;