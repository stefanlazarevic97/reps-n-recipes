import './WorkoutHistory.css'
import { useState } from 'react'
import { templates } from './Templates';
import { useSelector } from 'react-redux';

const WorkoutHistory = ({ exerciseList, setExerciseList, setStopWatchActive }) => {
    const workouts = useSelector(state => state.users.workouts)
    const [selectedTemplate, setSelectedTemplate] = useState('');

    const createTemplateList = () => {

        const listEles = workouts.map((workout, i) => {
            const name = Object.values(workout)[0];
            return (
                <>
                   <div key = {i} 
                     className = {
                        `template-item ${
                            selectedTemplate["title"] === name ?
                            "selected" :
                            ""
                        }`
                    }
                   value={name}
                    onClick={() => (
                        selectedTemplate.title === workout.title) ? 
                        setSelectedTemplate('') : 
                        setSelectedTemplate(workout)
                    }
                    >
                    <div className="exercise-container">
                        <div className="exercise-titles">
                            <div>{name}</div>
                        </div>
                    </div>
                </div>
                </>
            )
        })
        return listEles
    }

    const buildSets = (ingredients) => {
        const sets = []

        // for (let i=0; i < ingredients; i++){
        //     sets.push({"kg": null, "reps": null, "done": false, "type": "warmup"})
        // }
        for (let i=0; i < ingredients.length; i++){
            sets.push({"prevKg": ingredients[i]['kg'], "prevReps": ingredients[i]['reps'], "done": false, "type": "working",
            "rec-reps": ingredients["rec-reps"], "RPE": ingredients["RPE"]  })
        }
        return sets
    }

    const handleStartTemplate = (e) => {
        e.preventDefault()
        sessionStorage.setItem("currentWorkout", JSON.stringify({}));
        setExerciseList([]);

        const sets = selectedTemplate.sets.map(exercise => {
            const key = Object.keys(exercise)[0];
            const ingredients = Object.values(exercise)[0];
            return {[key]: buildSets(ingredients) }
        })
        // build the workout
        const workout = {
            "title": selectedTemplate.title,
            "sets": [...sets]
        }
        sessionStorage.setItem("currentWorkout", JSON.stringify(workout));
        setExerciseList([...sets]);

        setStopWatchActive(true)
    }

    return ( 
        <div className='template-list-container'>
            <h1 className='select-template-header'>Your Previous Workouts</h1>
            <form className="template-list">
                <div className='start-template'>

                    { selectedTemplate && 
                        <button 
                            onClick={handleStartTemplate}
                            className={
                                `${selectedTemplate ?
                                "workout-button ready-to-press" 
                                : "workout-button hidden"}`
                            }
                        >
                            Start
                        </button>
                    }
                </div>

                <div className="template-list-wrapper">
                    {createTemplateList()}
                </div>
            </form>  

        </div>
    )
}

export default WorkoutHistory;