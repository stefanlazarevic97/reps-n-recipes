import { templates } from './Templates';
import './SelectWorkoutTemplate.css'

const SelectWorkoutTemplate = ({ exerciseList, setExerciseList, selectedTemplate, setSelectedTemplate }) => {
    const handleSelectTemplate = async (workout) => {
        if (selectedTemplate.title === workout.title){
            sessionStorage.setItem("currentWorkout", JSON.stringify({}));
            setExerciseList([]);
            setSelectedTemplate(null);
        } else {
            setSelectedTemplate(workout)
            renderWorkout(workout)
        }
    }

    const renderWorkout = (workout) => {
        sessionStorage.setItem("currentWorkout", JSON.stringify({}));
        setExerciseList([]);
      
        const sets = workout.sets.map(exercise => {
            const key = Object.keys(exercise)[0];
            const ingredients = Object.values(exercise)[0];
            return {[key]: buildSets(ingredients) }
        })
       
        setExerciseList([...sets]);
    }

    const createTemplateList = () => {
        const listEles = templates().map((workout, i) => {
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
        const sets = [];
        
        for (let i=0; i < ingredients["warm"]; i++){
            sets.push({"kg": null, "reps": null, "done": false, "type": "warmup"})
        }
        for (let i=0; i < ingredients["work"]; i++){
            sets.push({"kg": null, "reps": null, "done": false, "type": "working",
            "rec-reps": ingredients["rec-reps"], "RPE": ingredients["RPE"]  })
        }
        return sets
    }

    return (
        <div className='template-list-container'>
            <h1 className='header'>Select a template workout</h1>
            <form className="template-list">
                <div className="template-list-wrapper">
                    {createTemplateList()}
                </div>
            </form>  
        </div>    
    )
}

export default SelectWorkoutTemplate;