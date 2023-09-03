<div className="exercise-ele">
    <div className="exercise-title">{exercise}</div>
    
    
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
                <LuCross className="cross-button"/>
            }
        </div>
    </div>

</div>


