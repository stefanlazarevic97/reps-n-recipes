import jwtFetch from "./jwt"

const RECEIVE_WORKOUTS = 'workout/RECEIVE_WORKOUTS'
const RECEIVE_WORKOUT = 'workout/RECEIVE_WORKOUT'
const REMOVE_WORKOUT = 'workout/REMOVE_WORKOUT'
const RECEIVE_WORKOUT_ERRORS = 'workout/RECEIVE_WORKOUT_ERRORS'
const CLEAR_WORKOUT_ERRORS = 'workout/CLEAR_WORKOUT_ERRORS'

const receiveWorkouts = workouts => ({
    type: RECEIVE_WORKOUTS,
    workouts
})

const receiveWorkout = workout => ({
    type: RECEIVE_WORKOUT,
    workout
})

const removeWorkout = workoutId => ({
    type: REMOVE_WORKOUT,
    workoutId
})

const receiveWorkoutErrors = errors => ({
    type: RECEIVE_WORKOUT_ERRORS,
    errors
})

const clearWorkoutErrors = () => ({
    type: CLEAR_WORKOUT_ERRORS
})

const getWorkouts = state => Object.values(state.workouts)

const getWorkout = workoutId => state => state.workouts[workoutId]

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

const workoutsReducer = (state = {}, action) => {
    const nextState = { ...state }
    switch (action.type) {
        case RECEIVE_WORKOUTS:
            return { ...action.workouts }
        case RECEIVE_WORKOUT:
            return { ...state, [action.workout.id]: action.workout}
        case REMOVE_WORKOUT:
            delete nextState[action.workoutId]
            return nextState
        default:
            return state
    }
}

export default workoutsReducer
