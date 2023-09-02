import jwtFetch from "./jwt"

export const RECEIVE_WORKOUTS = 'workout/RECEIVE_WORKOUTS'
export const RECEIVE_WORKOUT = 'workout/RECEIVE_WORKOUT'
export const REMOVE_WORKOUT = 'workout/REMOVE_WORKOUT'
const RECEIVE_WORKOUT_ERRORS = 'workout/RECEIVE_WORKOUT_ERRORS'
// const CLEAR_WORKOUT_ERRORS = 'workout/CLEAR_WORKOUT_ERRORS'

// const receiveWorkouts = workouts => ({
//     type: RECEIVE_WORKOUTS,
//     workouts
// })

const receiveWorkout = workout => ({
    type: RECEIVE_WORKOUT,
    workout
})

// const removeWorkout = workoutId => ({
//     type: REMOVE_WORKOUT,
//     workoutId
// })

const receiveWorkoutErrors = errors => ({
    type: RECEIVE_WORKOUT_ERRORS,
    errors
})

// const clearWorkoutErrors = () => ({
//     type: CLEAR_WORKOUT_ERRORS
// })

// const getWorkouts = state => Object.values(state.workouts)

// const getWorkout = workoutId => state => state.workouts[workoutId]

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
