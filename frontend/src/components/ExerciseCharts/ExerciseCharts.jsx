import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getExercises, fetchExercises } from "../../store/exercises";
import { useState } from 'react';
import titleize from '../../Utils/utils';

const ExerciseCharts = () => {
    const dispatch = useDispatch();
    const exercises = useSelector(getExercises);
    const [filteredData, setFilteredData] = useState([]);
    const [timeRange, setTimeRange] = useState('7');
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

                <select
                    onChange={(e) => setTimeRange(e.target.value)}
                    value={timeRange}
                >
                    <option value="7">Last 7 days</option>
                    <option value="14">Last 14 days</option>
                    <option value="30">Last 30 days</option>
                    <option value="90">Last 3 months</option>
                </select>

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