import { useDispatch, useSelector } from "react-redux"
import { activateWorkoutForm, getWorkoutFormState } from "../../store/ui" 
import WorkoutForm from "../WorkoutForm/WorkoutForm"
import { useEffect, useState } from "react"
import { fetchExercises } from "../../store/exercises.jsx"
import {TiTickOutline} from "react-icons/ti"
import { useHistory } from "react-router-dom";
import { createWorkout } from "../../store/workouts";
import { LuCross } from "react-icons/lu";
import {MdRemoveCircleOutline} from "react-icons/md";
import './WorkoutPage.css'

const WorkoutPage = () => {
    const dispatch = useDispatch()
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
            title: "Workout title",
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

    const updateKgInput = (name, index, e) => {
        const kgs = Number(e.currentTarget.value) || null
        const currentWorkout = JSON.parse(sessionStorage.getItem("currentWorkout"));
        const exercise = currentWorkout.sets.find(exercise => exercise[name])
        exercise[name][index]["kg"] = kgs
        sessionStorage.setItem("currentWorkout", JSON.stringify(currentWorkout));

        const updatedExerciseList = exerciseList.map(exercise => {
            if (exercise[name]) {
                exercise[name][index]["kg"] = kgs
            }

            return exercise;
        })

        setExerciseList(updatedExerciseList)
    }

    const updateRepInput = (name, index, e) => {
        const reps = Number(e.currentTarget.value) || null
        const currentWorkout = JSON.parse(sessionStorage.getItem("currentWorkout"));
        const exercise = currentWorkout.sets.find(exercise => exercise[name])
        exercise[name][index]["reps"] = reps
        sessionStorage.setItem("currentWorkout", JSON.stringify(currentWorkout));
        const updatedExerciseList = exerciseList.map(exercise => {
            if (exercise[name]) {
                exercise[name][index]["reps"] = reps
            }
            return exercise;
        })
        setExerciseList(updatedExerciseList)
    }

    const setDone = (name, index, e) => {
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

    // const removeSet = (name, index) => {
    //     const currentWorkout = JSON.parse(sessionStorage.getItem("currentWorkout"));
    //     const exercise = currentWorkout.sets.find(exercise => exercise[name])
    //     if (exercise && exercise[name].length === 1){
    //         // delete the entire exercise 
    //     }else if (exercise && exercise[name]) {
    //         exercise[name].splice(index, 1);
    //     }
    //     sessionStorage.setItem("currentWorkout", JSON.stringify(currentWorkout));
    //     setExerciseList([...currentWorkout.sets])
    // }

    const removeSet = (name, index) => {
        const currentWorkout = JSON.parse(sessionStorage.getItem("currentWorkout"));
        const exerciseIndex = currentWorkout.sets.findIndex(exercise => exercise[name]);
      
        if (exerciseIndex !== -1) {
          if (currentWorkout.sets[exerciseIndex][name].length === 1) {
            // Delete the entire exercise
            currentWorkout.sets.splice(exerciseIndex, 1);
          } else {
            // Remove the set at index
            currentWorkout.sets[exerciseIndex][name].splice(index, 1);
          }
        }
        
        sessionStorage.setItem("currentWorkout", JSON.stringify(currentWorkout));
        setExerciseList([...currentWorkout.sets]);
    };





    const displaySets = (name) => {
        const exerciseObj = exerciseList.find(exercise => exercise[name])
        const setArray = exerciseObj[name];
        const setDisplay = [];
        setArray.forEach((set, i)=>{
            const kg = set["kg"]
            const reps = set["reps"]
            const done = set["done"]
            setDisplay.push(
                <div className="remove-button-container">
                    <div className={`input-upper  ${done && "done-overlay"}`}>
                        <div className="exercise-inputs">
                            <div className="set-val">
                                <div>{i + 1}</div>
                            </div>
                            <div className="kg-input">
                                <input type="text" value={kg} onChange={(e) => updateKgInput(name, i, e)}/>
                            </div>
                            <div className="reps-input">
                                <input type="text" value={reps} onChange={(e) => updateRepInput(name, i, e)}/>
                            </div>
                        </div>
                        <div className="complete-set-button">
                            {
                                ((kg && reps) && !done) &&
                                <TiTickOutline className="tick-button" onClick={() => setDone(name, i)}/>
                            }
                            {    ((kg && reps) && done) &&
                                <LuCross className="cross-button" onClick={() => setDone(name, i)}/>
                            }
                        </div>
                    </div>
                    <div className="remove-button">
                        <MdRemoveCircleOutline className="reemove-button" onClick={() => removeSet(name, i)}/>
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
                        </div>
                        <div className="completed-header">completed</div>
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

    return (
        <>
            <div className="workout-page-container">
                <div className="workout-page-inner">
                    <div className="create-workout-header">
                        <h1 className="create-workout-h1">Create your workout</h1>
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
