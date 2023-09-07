import './WorkoutHistory.css'
import { useState } from 'react'
import { templates } from './Templates';
import { useSelector } from 'react-redux';

const WorkoutHistory = ({ selectedTemplate, setSelectedTemplate, exerciseList, setExerciseList, setStopWatchActive }) => {
    const workouts = useSelector(state => state.users.workouts)
    let lastTenWorkouts;

    const handleSelectTemplate = async (workout) => {
        if (selectedTemplate.title === workout.title){
            sessionStorage.setItem("currentWorkout", JSON.stringify({title: "", sets: []}));
            setExerciseList([]);
            setSelectedTemplate("");
        } else {
            setSelectedTemplate(workout)
            renderWorkout(workout)
        }
    }

    const renderWorkout = (workout) => {
        sessionStorage.setItem("currentWorkout", JSON.stringify({title: "", sets: []}));
        setExerciseList([]);
      
        const sets = workout.sets.map(exercise => {
            const key = Object.keys(exercise)[0];
            const ingredients = Object.values(exercise)[0];
            return {[key]: buildSets(ingredients) }
        })
       
        setExerciseList([...sets]);
    }

    const filterData = () => {
        const cutOffDate = new Date();
        cutOffDate.setDate(cutOffDate.getDate() - 16); //last 2 weeks
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1)
    
        const filteredWorkouts = workouts
            .filter(workout => {
                const parsedDate = new Date(workout.datePerformed);
                return parsedDate >= cutOffDate && parsedDate <= yesterday;
            })
            .sort((a, b) => new Date(b.datePerformed) - new Date(a.datePerformed));
    
        return filteredWorkouts;
    }
    lastTenWorkouts = filterData()

    const createTemplateList = () => {

        const listEles = lastTenWorkouts.map((workout, i) => {
            const name = Object.values(workout)[0];
            return (
                <>
                   <div key = {`history-${workout.title}-${i}`} 
                     className = {
                        `template-item ${
                            selectedTemplate.title === name ?
                            "selected" :
                            ""
                        }`
                    }
                   value={name}
                   onClick={() => handleSelectTemplate(workout)}
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
            <h1 className='header'>Your Previous Workouts</h1>
            <form className="template-list">
                <div className="template-list-wrapper">
                    {createTemplateList()}
                </div>
            </form>  

        </div>
    )
}

export default WorkoutHistory;