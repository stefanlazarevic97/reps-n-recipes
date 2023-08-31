import { useDispatch, useSelector } from "react-redux"
import { activateWorkoutForm, getWorkoutFormState, deactivateWorkoutForm } from "../../store/ui" 
import WorkoutForm from "../WorkoutForm/WorkoutForm"
import { useEffect, useState } from "react"
import { fetchExercises } from "../../store/exercises.jsx"

import './WorkoutPage.css'

const WorkoutPage = () => {
    const dispatch = useDispatch()
    const active = useSelector(getWorkoutFormState)
    const [exerciseList, setExerciseList] = useState([])    // array of exercise objects
    const [selectedExercise, setSelectedExercise] = useState('')
    const [listItems, setListItems] = useState([])
    const [addExercise, setAddExercise] = useState(false)
    // const [exerciseNames, setExerciseNames] = useState([])

    const currentUser = useSelector(state => state.session.user);

    useEffect(()=>{
        async function fetchData() {
            const response = await dispatch(fetchExercises)
            setListItems(response)
        }
        fetchData();
    }, [])

    // useEffect(()=>{
    //     const names = exerciseList.map(exerciseObj => Object.keys(exerciseObj)[0])
    //     setExerciseNames(names)
    // }, [exerciseList])

    useEffect(()=>{
        const newWorkout = {
            title: "Workout title",
            description: "",
            sets: [],
            performer: currentUser._id,
            workoutType: ""
        }
        sessionStorage.setItem(
            "currentWorkout", JSON.stringify(newWorkout)
        )
    }, [])

    const addSet = (name) => {
        const updatedExerciseList = exerciseList.map(exercise => {
        if (exercise[name]) {
            return {
            ...exercise,
            [name]: exercise[name] + 1
            };
        }})
        setExerciseList(updatedExerciseList)
        
        // ! update the session storage
        const currentWorkout = JSON.parse(sessionStorage.getItem("currentWorkout"))
        const exercise = currentWorkout.sets.find(exercise => exercise[name])
        exercise[name].push({kg: null, reps: null})
        sessionStorage.setItem("currentWorkout", JSON.stringify(currentWorkout));
    }


    const displaySets = (name) => {
        const exercise = exerciseList.find(exercise => exercise[name])
        const num = Object.values(exercise)[0]
        let sets = [];
        for(let i=0; i<num; i++){
            sets.push(
                (<div className="input-upper">
                    <div className="exercise-inputs">
                        <div className="set-val">
                            <div>1</div>
                        </div>
                        <div className="kg-input">
                            <input type="text" />
                        </div>
                        <div className="reps-input">
                            <input type="text" />
                        </div>
                    </div>
                    <div>
                        <div>tick</div>
                    </div>
                </div>)
            )

        }
        return sets
    }

    const makeExerciseList = () => {
        // debugger
        const list = exerciseList.map(ele => Object.keys(ele)[0]).map((exercise)=>{
            return (
                <li className='exercise-ele'>
                    <div className="exercise-title">{exercise}</div>
                    <div className="exercise-headers">
                        <div className="set-header">Set</div>
                        <div className="kg-header">kg</div>
                        <div className="reps-header">reps</div>
                    </div>
                    {displaySets(exercise)}
                        
                    <button className="add-a-set" onClick={() => addSet(exercise)}
                    >+ Add Set</button>
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
        <>
            <div className="workout-page-container">
                <div className="workout-page-inner">
                    <h1 className="create-workout-h1">Create your workout</h1>
                    {makeExerciseList()}
                    <button className="add-exercise" onClick={()=>dispatch(activateWorkoutForm())}>Add Exercises</button>             
                    {active && 
                    <WorkoutForm 
                    exerciseList={exerciseList} setExerciseList={setExerciseList}
                    selectedExercise={selectedExercise} setSelectedExercise={setSelectedExercise}
                    addExercise={addExercise} setAddExercise={setAddExercise}
                    listItems={listItems}
                    />}
                    
                    <button className="complete-workout" onClick={()=>setAddExercise(true)}>Complete Workout</button>
                            
                </div>
            </div> 
        </>
    )

}

export default WorkoutPage
