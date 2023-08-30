import { useDispatch } from "react-redux"
import { activateWorkoutForm } from "../../store/ui" 

const WorkoutPage = () => {
    const dispatch = useDispatch()

    return (
        <>
            <div className="create-new-workout">
                <button onClick={()=>dispatch(activateWorkoutForm())}>Create a new workout</button>

            </div>

            <div>or...</div>
            <h1>Select from default workouts...</h1>
            
        </>
    )

}

export default WorkoutPage
