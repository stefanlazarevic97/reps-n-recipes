import { useDispatch } from 'react-redux';
import { deactivateWorkoutForm } from '../../store/ui';
import { FaSearch } from "react-icons/fa";
// import { VscListFilter } from "react-icons/vs";
import React, { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
// import { VscListFilter } from "react-icons/vs";
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
    const [searchString, setSearchString] = useState("");
    const [searchFilter, setSearchFilter] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    console.log(searchResults)

    // console.log(listItems)

    const handleSearchUpdate = e => {
        const newSearchString = e.target.value;
        setSearchString(newSearchString);

        if (newSearchString){
            const matchingExercises = listItems
            .filter(item => item["name"].toLowerCase().includes(newSearchString.toLowerCase()))
            .sort((a, b) => 
                a["name"].toLowerCase().indexOf(newSearchString.toLowerCase()) - 
                b["name"].toLowerCase().indexOf(newSearchString.toLowerCase())
            );
            setSearchResults(matchingExercises)
        }else {
            setSearchResults([])
        }
    }

    const handleFilterUpdate = e => {
        // debugger
        const filter = e.target.value
        setSearchFilter(filter)
        if (filter && searchResults.length === 0){
            const matchingExercises = listItems.filter(item => item["muscleGroup"] === filter)
            setSearchResults(matchingExercises)
        }else if (filter && searchResults.length !== 0){
            const matchingExercises = searchResults.filter(item => item["muscleGroup"] === filter)
            setSearchResults(matchingExercises)
        }
    }

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
        if ( searchString && searchResults.length === 0 ){
            return <div>No exercises match this search</div>
        }
        return ((searchString || searchFilter) ? searchResults : listItems).map((item, i) => {
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

    const mapFilterOptions = () => {
        return ['chest', 'back', 'shoulders', 'bicep', 'tricep', 'quad', 'hamstring', 'glute', 'calf', 'core'].map(group => {
            return <option value={group}>{group}</option>
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
                            onChange={handleSearchUpdate}
                            value={searchString}
                        />
                        <div className='filter-button'>
                            <div className='visible-stuff'>
                                <div className='selected-group'>{searchFilter || "All" }</div>
                                <IoIosArrowDown className='dropdown-arrow'/>
                            </div>
                            {/* <div>{searchFilter}</div> */}
                            <select name="" id="" value={searchFilter} onChange={handleFilterUpdate}>
                                {mapFilterOptions()}
                            </select>
                        </div>
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