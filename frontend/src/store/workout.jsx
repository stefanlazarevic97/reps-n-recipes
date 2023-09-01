import jwtFetch from "./jwt"

const RECEIVE_WORKOUT = 'workout/RECEIVE_WORKOUT'
const RECEIVE_WORKOUT_ERRORS = 'workout/RECEIVE_WORKOUT_ERRORS'

const receiveWorkout = workout => ({
    type: RECEIVE_WORKOUT,
    workout
})

const receiveWorkoutErrors = errors => ({
    type: RECEIVE_WORKOUT_ERRORS,
    errorsr
})

export const createWorkout = workout => async dispatch => {
    try {
        const res = await jwtFetch('/api/workout', {
            method: 'POST',
            body: JSON.stringify(workout)
        })
        const newWorkout = res.json()
        dispatch(receiveWorkout(newWorkout))
    } catch(err) {
        const errors = await err.json();
        dispatch(receiveWorkoutErrors(errors))
    }
}

const workoutReducer = (state = initalState)