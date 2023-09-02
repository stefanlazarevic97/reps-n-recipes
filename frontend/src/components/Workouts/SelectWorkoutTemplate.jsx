import { useState } from 'react'
import './SelectWorkoutTemplate.css'

const SelectWorkoutTemplate = () => {

    const [selectedTemplate, setSelectedTemplate] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const JeffNipPush = {
        "title": "Upper1",
        "sets": [
            {"Dumbbell Bench Press": {"reps": null, "kg": null, "warm": 3, "work": 2, "rec-reps": "4-6", "RPE": "8-9"}},
            {"Lat Pulldown": {"reps": null, "kg": null, "warm": 2, "work": 2, "rec-reps": "10-12", "RPE": "9-10"}},
            {"Seated Dumbbell Overhead Press": {"reps": null, "kg": null, "warm": 1, "work": 2, "rec-reps": "10-12", "RPE": "9-10"}},
            {"Cable Row": {"reps": null, "kg": null, "warm": 1, "work": 2, "rec-reps": "10-12", "RPE": "9-10"}},
            {"EZ Bar Tricep Extension": {"reps": null, "kg": null, "warm": 2, "work": 1, "rec-reps": "12-15", "RPE": "10"}},
            {"EZ Bar Bicep Curl": {"reps": null, "kg": null, "warm": 1, "work": 2, "rec-reps": "12-15", "RPE": "10"}},
        ]
    }


    const createTemplateList = () => {

        const templateWorkouts = [JeffNipPush,JeffNipPush,JeffNipPush,JeffNipPush,
        JeffNipPush,JeffNipPush,JeffNipPush,JeffNipPush,JeffNipPush,JeffNipPush,JeffNipPush,
        JeffNipPush,JeffNipPush,JeffNipPush,JeffNipPush,JeffNipPush,JeffNipPush,JeffNipPush]

        const listEles = templateWorkouts.map((exercise, i) => {
            const name = Object.values(exercise)[0];
            return (
                <>
                   <div key = {i} className = "template-item" value={name}
                    onClick={() => (
                        selectedTemplate === name) ? 
                        setSelectedTemplate('') : 
                        setSelectedTemplate(name)
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


    return (
        
        <div className='template-list-container'>
            <h1 className='select-template-header'>Select a template workout</h1>
            <form className="template-list">
                <div className='add-search-container'>

                    <button 
                        // onClick={handleAdd}
                        className={
                            `${selectedTemplate ?
                            "workout-button ready-to-press" 
                            : "workout-button hidden"}`
                        }
                    >
                        Start
                    </button>
                </div>

                <div className="template-list-wrapper">
                    {createTemplateList()}
                </div>
            </form>  

        </div>




    
    )

}


export default SelectWorkoutTemplate