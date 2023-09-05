import jwtFetch from "./jwt"

export const RECEIVE_WORKOUTS = 'workout/RECEIVE_WORKOUTS';
export const RECEIVE_WORKOUT = 'workout/RECEIVE_WORKOUT';
export const REMOVE_WORKOUT = 'workout/REMOVE_WORKOUT';
const RECEIVE_WORKOUT_ERRORS = 'workout/RECEIVE_WORKOUT_ERRORS';

const receiveWorkout = workout => ({
    type: RECEIVE_WORKOUT,
    workout
})

const receiveWorkoutErrors = errors => ({
    type: RECEIVE_WORKOUT_ERRORS,
    errors
})

export const getWorkoutsByExercise = exercise => state => {
    const workouts = state.users.workouts
    const workoutsByExercise = workouts.filter(workout => workout.sets.find(set => set.hasOwnProperty(exercise)))
    .reduce((accumulator, workout) => {
        const exerciseSets = workout.sets.find(set => set.hasOwnProperty(exercise))[exercise];
        
        if (exerciseSets && exerciseSets.length > 0) {
            const topSet = exerciseSets.sort((a, b) => {
                if (a.kg !== b.kg) {
                    return a.kg - b.kg;
                } else {
                    return a.reps - b.reps;
                }
            }).slice(-1)[0];

            const estimated1RM = topSet.kg / (1.0278 - (0.0278 * topSet.reps));
            accumulator[workout.datePerformed.split('T')[0]] = estimated1RM;
        }

        return accumulator;
    }, {});

    return workoutsByExercise;
}

export const createWorkout = workout => async dispatch => {
    try {
        const res = await jwtFetch('/api/workout', {
            method: 'POST',
            body: JSON.stringify(workout)
        })
        const newWorkout = await res.json()
        dispatch(receiveWorkout(newWorkout))
    } catch(err) {
        const errors = await err.json();
        dispatch(receiveWorkoutErrors(errors))
    }
}

const workoutsReducer = (state = {}, action) => {
    switch (action.type) {
        default:
            return state
    }
}

export default workoutsReducer
