import { useDispatch, useSelector } from "react-redux"
import { activateWorkoutForm, getWorkoutFormState } from "../../store/ui" 
import WorkoutForm from "../WorkoutForm/WorkoutForm"
import { useEffect, useState } from "react"
import { fetchExercises } from "../../store/exercises.jsx"
import {TiTickOutline} from "react-icons/ti"
import { useHistory } from "react-router-dom";
import { createWorkout } from "../../store/workouts";
import { BiMinus } from "react-icons/bi";
import {MdRemoveCircleOutline} from "react-icons/md";
import SelectWorkoutTemplate from "./SelectWorkoutTemplate";
import moment from "moment"
import './WorkoutPage.css'

const WorkoutPage = () => {
    const dispatch = useDispatch()
    // const [contentFilled, setContentFilled] = useState(false)
    const active = useSelector(getWorkoutFormState)
    const [selectedExercise, setSelectedExercise] = useState('')
    const [listItems, setListItems] = useState([])
    const [addExercise, setAddExercise] = useState(false)
    // const currentUser = useSelector(state => state.session.user);
    const history = useHistory();
    const [exerciseList, setExerciseList] = useState(JSON.parse(sessionStorage.getItem("currentWorkout"))?.sets)    // array of exercise objects
    
    const goToNutritionPage = () => {
        history.push("/");
    };

    const handleSubmit = () => {
        const currentWorkout = JSON.parse(sessionStorage.getItem("currentWorkout"));
        let updatedSets = currentWorkout.sets.map(exerciseObj => {
            const setArray = Object.values(exerciseObj)[0]
            const name = Object.keys(exerciseObj)[0]
            return {[name]: setArray.filter(setObj => setObj["done"])}
        })
        updatedSets = updatedSets.filter(exercise => Object.values(exercise)[0].length !== 0)
        const updatedWorkout = {...currentWorkout, sets: updatedSets}
        dispatch(createWorkout(updatedWorkout))
    }

    useEffect(()=>{
        async function fetchData() {
            const response = await dispatch(fetchExercises)
            setListItems(response)
        }
        fetchData();
    }, [])


    const resetWorkout = () => {
        const newWorkout = {
            title: "",
            sets: [],
        }
        sessionStorage.setItem(
            "currentWorkout", JSON.stringify(newWorkout)
        )
        setExerciseList([])
    }

    useEffect(()=>{
        const currentWorkout = JSON.parse(sessionStorage.getItem("currentWorkout"));
        if (currentWorkout){
            sessionStorage.setItem("currentWorkout", JSON.stringify(currentWorkout));
        } else {
            resetWorkout()
        }
    }, [])

    const addSet = (name) => {
        const updatedExerciseList = exerciseList.map(exercise => {
            if (exercise[name]) {
                exercise[name].push({kg: null, reps: null})
            }
            return exercise;
        })
        setExerciseList(updatedExerciseList)
        const currentWorkout = JSON.parse(sessionStorage.getItem("currentWorkout"))
        const exercise = currentWorkout.sets.find(exercise => exercise[name])
        exercise[name].push({kg: null, reps: null, done: false})
        sessionStorage.setItem("currentWorkout", JSON.stringify(currentWorkout));
    }

    const updateInput = (name, index, type, e) => {
        const val = Number(e.currentTarget.value) || null
        const currentWorkout = JSON.parse(sessionStorage.getItem("currentWorkout"));
        const exercise = currentWorkout.sets.find(exercise => exercise[name])
        exercise[name][index][type] = val
        sessionStorage.setItem("currentWorkout", JSON.stringify(currentWorkout));
        const updatedExerciseList = exerciseList.map(exercise => {
            if (exercise[name]) {
                exercise[name][index][type] = val
                if (val === null) exercise[name][index]["done"] = false
            }
            return exercise;
        })
        setExerciseList(updatedExerciseList)
        // set filled in state
        // if (!exercise[name][index][type] || !exercise[name][index][type]){
        //     setContentFilled(false);
        // }else {
        //     setContentFilled(true);
        // }
    }

    const setDone = (name, index, ready) => {
        if (!ready) return null
        let newDone = null
        const currentWorkout = JSON.parse(sessionStorage.getItem("currentWorkout"));
        const exercise = currentWorkout.sets.find(exercise => exercise[name])
        if (exercise[name][index]["done"]){
            exercise[name][index]["done"] = false
            newDone = false
        } else {
            exercise[name][index]["done"] = true
            newDone = true
        }
        sessionStorage.setItem("currentWorkout", JSON.stringify(currentWorkout));
        const updatedExerciseList = exerciseList.map(exercise => {
            if (exercise[name]) {
                exercise[name][index]["done"] = newDone
            }
            return exercise;
        })
        setExerciseList(updatedExerciseList)
    }

    const removeSet = (name, index) => {
        const currentWorkout = JSON.parse(sessionStorage.getItem("currentWorkout"));
        const exerciseIndex = currentWorkout.sets.findIndex(exercise => exercise[name]);
        if (exerciseIndex !== -1) {
          if (currentWorkout.sets[exerciseIndex][name].length === 1) {
            currentWorkout.sets.splice(exerciseIndex, 1);
          } else {
            currentWorkout.sets[exerciseIndex][name].splice(index, 1);
          }
        }
        sessionStorage.setItem("currentWorkout", JSON.stringify(currentWorkout));
        setExerciseList([...currentWorkout.sets]);
    };





    const contentFilled = (name) => {
        const exerciseObj = exerciseList.find(exercise => exercise[name])
        if (!exerciseObj) return false;
        const filledSetIndex = Object.values(exerciseObj)[0].findIndex(set =>
            (set["kg"] !== null) && (set["reps"] !== null)
        )
        return filledSetIndex !== -1;
    }

    const rpe = (name) => {
        // debugger
        // if (name === "Dumbbell Bench Press"){
        //     debugger
        // }
        const exerciseObj = exerciseList.find(exercise => exercise[name])
        if (!exerciseObj) return false;
        const rpeIndex = Object.values(exerciseObj)[0].findIndex(set =>  !!set["RPE"])
        return rpeIndex !== -1;
    }

    const displaySets = (name) => {
        const exerciseObj = exerciseList.find(exercise => exercise[name])
        const setArray = exerciseObj[name];
        const setDisplay = [];
        let s = 0;
        setArray.forEach((set, i)=>{
            const kg = set["kg"]
            const reps = set["reps"]
            const ready = kg && reps
            const done = set["done"]
            const recReps = set["rec-reps"]
            // debugger
            const warmup = set["type"] === "warmup"
            if (!warmup) s = s + 1;
            setDisplay.push(
                <div className="remove-button-container">
                    <div id={`${name}-row-${i}`} 
                    // const stringWithDashes = "lat pulldown".replace(/ /g, '-');
                    className={`input-upper  ${done && "done-overlay"} ${warmup && "warmup"}`}>
                        <div className="exercise-inputs">
                            <div className="set-val">
                                { warmup ? 
                                    <div>{`${warmup ? "W" : ""}`}</div>
                                    :
                                    <div>{s}</div>

                                }
                            </div>
                            <div className="kg-input">
                                <input type="text" value={kg} onChange={(e) => updateInput(name, i,"kg", e)}/>
                            </div>
                            <div className="reps-input">
                                <input type="text" 

                                placeholder={`${recReps ? recReps : ""}`}
                                value={reps} onChange={(e) => updateInput(name, i,"reps", e)}/>
                            </div>
                        </div>
                        <div className={`complete-set-button 
                            ${ready ? (done ? "completed" : "ready") : ""}`}>
                            <TiTickOutline className="tick-button" onClick={() => setDone(name, i, ready)}/>
                        </div>
                   
                    </div>
                    <div className="remove-button">
                        <BiMinus className="minus-button" 
                        onClick={() => {
                            document.getElementById(`row-${i}`).classList.add("slide-out");
                            setTimeout(() => {
                            removeSet(name, i);
                            }, 500);
                        }}
                        />
                    </div>
                   
                </div>
            )
        })
        return setDisplay
    }

    const makeExerciseList = () => {
        const list = exerciseList?.map(ele => Object.keys(ele)[0]).map((exercise)=>{
            return (
                <li className='exercise-ele'>
                    <div className="exercise-title">{exercise}</div>
                    <div className="exercise-headers">
                        <div className="workout-details">
                            <div className="set-header">Set</div>
                            <div className="kg-header">kg</div>
                            <div className="reps-header">reps</div>
                            {rpe(exercise) &&
                                <div className="rpe-header">RPE</div>
                            }
                        </div>
                        {/* <div className="completed-header">completed</div> */}
                        { contentFilled(exercise) &&
                        <div className="completed-header">completed</div>
                        }
                    </div>
                    {displaySets(exercise)}
                    <button className="add-a-set" onClick={() => addSet(exercise)}>+ Add Set</button>
                </li>
            )
        })
        return (
            <ul>
                {list}
            </ul>
        )
    }

    const getTitle = () => {
        const currentWorkout = JSON.parse(sessionStorage.getItem("currentWorkout"));
        const key = Object.keys(currentWorkout)[0] 
        return currentWorkout["title"] || `${moment(new Date()).format('dddd, MMMM D')} Workout`
    }

    return (
        <>
            <div className="workout-page-container">
            <div className="select-workout-container">
                <SelectWorkoutTemplate
                exerciseList = {exerciseList}
                setExerciseList = {setExerciseList}
                />
            </div>

            <div>

                <div className="workout-page-inner">
                    
                    <div className="create-workout-header">
                        <h1 className="create-workout-h1">
                            {getTitle()}
                            {/* const currentWorkout = JSON.parse(sessionStorage.getItem("currentWorkout")); */}
                            {/* Create your workout */}
                            </h1>
                        <button 
                            className="cancel-workout" 
                            onClick={resetWorkout}
                        >
                            Cancel Workout
                        </button>
                    </div>

                    {makeExerciseList()}

                    <button 
                        className="add-exercise" 
                        onClick={()=>dispatch(activateWorkoutForm())}
                    >
                        Add Exercises
                    </button>  

                    {active && 
                        <WorkoutForm 
                            exerciseList={exerciseList} 
                            setExerciseList={setExerciseList}
                            selectedExercise={selectedExercise} 
                            setSelectedExercise={setSelectedExercise}
                            addExercise={addExercise} 
                            setAddExercise={setAddExercise}
                            listItems={listItems}
                        />
                    }

                    <button 
                        className="complete-workout" 
                        onClick={handleSubmit}
                    >
                        Complete Workout
                    </button>       
                </div>
            </div> 

        </div>
            
        <div className="toggle-button-container">
            <div 
                id="toggle-page-type-button" 
                className="button wprkout-button" 
                onClick={goToNutritionPage}
            >
                <div>
                    Nutrition
                </div>
            </div>
        </div>


        </>
    )
}

export default WorkoutPage;
