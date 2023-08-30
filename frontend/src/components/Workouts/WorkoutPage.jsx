import { useDispatch, useSelector } from "react-redux"
import { activateWorkoutForm, getWorkoutFormState, deactivateWorkoutForm } from "../../store/ui" 
import WorkoutForm from "../WorkoutForm/WorkoutForm"
import { useEffect, useState } from "react"
import { fetchExercises } from "../../store/exercises.jsx"

import './WorkoutPage.css'

const WorkoutPage = () => {
    const dispatch = useDispatch()
    const active = useSelector(getWorkoutFormState)
    const [exerciseList, setExerciseList] = useState([])
    const [selectedExercise, setSelectedExercise] = useState('')
    const [listItems, setListItems] = useState([])
    const [addExercise, setAddExercise] = useState(false)

    // ! would use a fetch here to get a relevant list from db

    useEffect(()=>{
        async function fetchData() {
            const response = await dispatch(fetchExercises)
            setListItems(response)
        }
        fetchData();
    }, [])
    // const listItems = dispatch(fetchExercises())
    // console.log(listItems)
    // [
    //     "Crunch", "Bench Press", "Bulgarian Split Squats", "Squat", "Bicep Curls", "Leg Press"
    // ]

    console.log(listItems)

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

    // console.log(active)

    // dispatch(deactivateWorkoutForm())

    return (
        
        <>
            <div className="workout-page-container">

                <div className="workout-page-inner">

                    <h1 className="create-workout-h1">Create your workout</h1>


                    {makeExerciseList()}
                    {/* <div className="create-new-workout"> */}
                        <button className="add-exercise" onClick={()=>dispatch(activateWorkoutForm())}>Add Exercises</button>
                    {/* </div> */}
                
                    {active && 
                    <WorkoutForm 
                    exerciseList={exerciseList} setExerciseList={setExerciseList}
                    selectedExercise={selectedExercise} setSelectedExercise={setSelectedExercise}
                    addExercise={addExercise} setAddExercise={setAddExercise}
                    listItems={listItems}
                    />}
                    
                    <button className="complete-workout" onClick={()=>setAddExercise(true)}>Complete Workout</button>
                            

                    {/* <div>or...</div>
                    <h1>Select from default workouts...</h1> */}
                </div>
            </div>
            
        </>
    )

}

export default WorkoutPage
