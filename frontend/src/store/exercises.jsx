import jwtFetch from "./jwt";

// CONSTANTS
const RECEIVE_EXERCISES = 'exercises/RECEIVE_EXERCISES';
const RECEIVE_EXERCISE = 'exercises/RECEIVE_EXERCISE';
const REMOVE_EXERCISE = 'exercises/REMOVE_EXERCISE';
const RECEIVE_EXERCISE_ERRORS = 'exercises/RECEIVE_EXERCISE_ERRORS';
const CLEAR_EXERCISE_ERRORS = 'exercises/CLEAR_EXERCISE_ERRORS';

// ACTION CREATORS

const receiveExercises = exercises => ({ type: RECEIVE_EXERCISES, exercises });
const receiveExercise = exercise => ({ type: RECEIVE_EXERCISE, exercise });
const removeExercise = exerciseId => ({ type: REMOVE_EXERCISE, exerciseId });
const receiveExerciseErrors = errors => ({ type: RECEIVE_EXERCISE_ERRORS, errors });
const clearExerciseErrors = () => ({ type: CLEAR_EXERCISE_ERRORS });

// SELECTORS

export const getFoods = state => Object.values(state.exercises);
export const getFood = exerciseId => state => state.exercises.results[exerciseId]


export const fetchExercises = async dispatch => {
    // debugger
    try {
        const res = await jwtFetch('/api/exercises');
        const exercises = await res.json();
        dispatch(receiveExercises(exercises));
        return exercises
    } catch (err) {
        const errors = await err.json();
        dispatch(receiveExerciseErrors(errors));
    }
}


// THUNK ACTION CREATORS


export const fetchExercise = exerciseId => async dispatch => {
    try {
        const res = await jwtFetch(`/api/exercises/${exerciseId}`);
        const exercise = await res.json();
        dispatch(receiveExercise(exercise));
    } catch (err) {
        const errors = await err.json();
        dispatch(receiveExerciseErrors(errors));
    }
}

export const updateExercise = exercise => async dispatch => {
    try {
        const res = await jwtFetch(`/api/exercises/${exercise.id}`, {
            method: 'PATCH',
            body: JSON.stringify(exercise)
        });
        const updatedExercise = await res.json();
        dispatch(receiveExercise(updatedExercise));
    } catch (err) {
        const errors = await err.json();
        dispatch(receiveExerciseErrors(errors));
    }
}

export const deleteExercise = exerciseId => async dispatch => {
    try {
        const res = await jwtFetch(`/api/exercises/${exerciseId}`, {
            method: 'DELETE'
        });
        dispatch(removeExercise(exerciseId));
    } catch (err) {
        const errors = await err.json();
        dispatch(receiveExerciseErrors(errors));
    }
}

const nullErrors = null;

export const exerciseErrorsReducer = (state = nullErrors, action) => {
    switch(action.type) {
        case RECEIVE_EXERCISE_ERRORS:
            return action.errors;
        case RECEIVE_EXERCISE:
            return nullErrors;
        case CLEAR_EXERCISE_ERRORS:
            return nullErrors;
        default:
            return state;
    }
}

const exercisesReducer = (state = {}, action) => {
    const nextState = { ...state }

    switch (action.type) {
        case RECEIVE_EXERCISES:
            return { ...action.exercises };
        case RECEIVE_EXERCISE:
            return { ...state, [action.exercise.id]: action.exercise };
        case REMOVE_EXERCISE:
            delete nextState[action.exerciseId];
            return nextState;
        default:
            return state;
    }
}

export default exercisesReducer;