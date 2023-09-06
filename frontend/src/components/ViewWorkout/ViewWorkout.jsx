const ViewWorkout = ( 
    {exerciseList, setExerciseList, addExercise, setAddExercise, listItems}
) => {

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
    }

    const contentFilled = (name) => {
        const exerciseObj = exerciseList.find(exercise => exercise[name])
        if (!exerciseObj) return false;
        const filledSetIndex = Object.values(exerciseObj)[0].findIndex(set =>
            (set["kg"] !== null) && (set["reps"] !== null)
        )
        return filledSetIndex !== -1;
    }

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

    const displaySets = (name) => {
        const exerciseObj = exerciseList.find(exercise => exercise[name])
        const setArray = exerciseObj[name];
        const setDisplay = [];
        let s = 0;
        setArray.forEach((set, i)=>{
            const kg = set["kg"]
            const prevKg = set["prevKg"];
            const prevReps = set["prevReps"];
            const reps = set["reps"]
            const ready = kg && reps
            const done = set["done"]
            const recReps = set["rec-reps"]
            const id = `${name.replace(/ /g, '-')}-row-${i}`
            const warmup = set["type"] === "warmup"
            if (!warmup) s = s + 1;
            setDisplay.push(
                <div className="remove-button-container">
                    <div id={id} 
                    // const stringWithDashes = "lat pulldown".replace(/ /g, '-');
                    className={`input-upper  ${done ? "done-overlay" : ""} ${warmup ? "warmup" : ""}`}>
                        <div className="exercise-inputs">
                            <div className="set-val">
                                { warmup ? 
                                    <div>{`${warmup ? "W" : ""}`}</div>
                                    :
                                    <div>{s}</div>

                                }
                            </div>
                            <div className="kg-input">
                                <input type="text" placeholder={prevKg} value={kg} onChange={(e) => updateInput(name, i,"kg", e)}/>
                            </div>
                            <div className="reps-input">
                                <input type="text" 

                                placeholder={recReps ? recReps : (prevReps ? prevReps : "")}
                                value={reps} onChange={(e) => updateInput(name, i,"reps", e)}/>
                            </div>
                            <div className="prev-top-set-input">

                            {prevTopSet(name) && !warmup ? `${prevTopSet(name).kg} kg x ${prevTopSet(name).reps}` : null}
                            </div>
                        </div>
                        <div className={`complete-set-button 
                            ${ready ? (done ? "completed" : "ready") : ""}`}>
                            <TiTickOutline className="tick-button" onClick={() => setDone(name, i, ready)}/>
                        </div>
                   
                    </div>
                    <div className="remove-button">
                        <BiMinus className="minus-button" 
                        onClick={()=>{removeSet(name, i, id)}}
                        // onClick={() => {
                        //     // debugger
                        //     document.getElementById(`${id}`).classList.add("slide-out");
                        //     setTimeout(() => {
                        //     removeSet(name, i);
                        //     }, 500);
                        // }}
                        />
                    </div>
                   
                </div>
            )
        })
        return setDisplay;
    }
    
   
    const list = exerciseList?.map(ele => Object.keys(ele)[0]).map((exercise, index)=>{
        return (
            <li className='exercise-ele'>
                <div className="exercise-header-container">
                    <div className="exercise-title">{exercise}</div>

                    <div 
                        className="remove-exercise"
                        onClick={() => removeExercise(index)}
                    >
                        &times;
                    </div>
                </div>

                <div className="exercise-headers">
                    <div className="workout-details">
                        <div className="set-header">Set</div>
                        <div className="kg-header">kg</div>
                        <div className="reps-header">reps</div>
                        {rpe(exercise) &&
                            <div className="rpe-header">RPE</div>
                        }
                        <div 
                            className="prev-top-set"
                        >
                            Prev Top Set
                        </div>
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

export default ViewWorkout