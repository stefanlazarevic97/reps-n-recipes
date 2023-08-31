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

    useEffect(()=> {
        // if 
        const currentWorkout =sessionStorage.getItem("currentWorkout") 
        if (currentWorkout){
            setExerciseList(JSON.parse(currentWorkout))
        }
    }, [])

    // const addSet = (name) => {

    //     sessionStorage.setItem(
    //         "currentWorkout", JSON.stringify(newList)
    //     )
    // }


    // console.log(exerciseList)

    const makeExerciseList = () => {
        const list = exerciseList.map((exercise)=>{
            return (
                <li key={exercise} className='exercise-ele'>
                    {/* <div className='exercise-image'><img src={exercise.gif ? exercise.gif : ""} alt="" /></div> */}
                    <div className="exercise-title">{exercise.name}</div>
                    <div className="exercise-headers">
                        <div className="set-header">Set</div>
                        <div className="kg-header">kg</div>
                        <div className="reps-header">reps</div>
                    </div>
                    <div className="input-upper">
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
                    </div>
                    {/* <button className="add-a-set" onClick={addSet(exercise.name)}>+ Add Set</button> */}
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

                    {/* <img src="/Users/apple/Documents/AppAcademy/health-360/backend/assets/workoutGifs/Barbell Bent Over Row.gif" alt="" /> */}
                    {/* <img src="../../../backend/assets/workoutGifs/Barbell Bent Over Row.gif" alt="" /> */}

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
