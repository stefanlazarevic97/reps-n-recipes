import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getExercises, fetchExercises } from "../../store/exercises";
import { useState } from 'react';
import titleize from '../../Utils/utils';

const ExerciseCharts = () => {
    const dispatch = useDispatch();
    const exercises = useSelector(getExercises);
    const [muscleGroup, setMuscleGroup] = useState('all')
    const muscleGroups = ['all', 'chest', 'back', 'shoulders', 'bicep', 'tricep', 'quad', 'hamstring', 'calf', 'glute', 'core'];
    const displayedExercises = muscleGroup !== 'all' ? exercises.filter(exercise => exercise.muscleGroup === muscleGroup) : exercises;

    useEffect(() => {
        dispatch(fetchExercises)
    }, [dispatch])

    const handleMuscleChange = e => setMuscleGroup(e.target.value);

    return (

            <div className="charts-container">
                <h1 className="header">Exercise Charts</h1>
                <div>
                    <select 
                        onChange={handleMuscleChange}
                    >
                        {muscleGroups.map(muscleGroup => (
                            <option value={muscleGroup}>{titleize(muscleGroup)}</option>
                        ))}
                    </select>
                    <select 
                        name="exercises"
                    >
                        {displayedExercises.map(exercise => (
                            <option value={exercise._id} key={exercise._id}>
                                {exercise.name}
                            </option>

                        ))}
                    </select>
                </div>
            </div>
    )
}

export default ExerciseCharts;