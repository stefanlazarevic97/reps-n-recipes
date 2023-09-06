import jwtFetch from './jwt';
import { RECEIVE_MEAL_PLAN, RECEIVE_USER_NUTRITION, REMOVE_USER_NUTRITION, receiveUserNutrition } from './foods';
import { receiveErrors } from './session';
import { RECEIVE_USER_LOGOUT } from './session';
import { RECEIVE_CURRENT_USER } from './session';
import moment from 'moment-timezone';
import { RECEIVE_WORKOUT, RECEIVE_WORKOUTS } from './workouts';

// CONSTANTS 

const RECEIVE_USER_HEALTH = 'users/RECEIVE_USER_HEALTH'
const RECEIVE_WEIGHT_BY_DATE = 'users/RECEIVE_WEIGHT_BY_DATE'

// ACTION CREATORS

export const receiveUserHealth = healthData => ({
    type: RECEIVE_USER_HEALTH,
    healthData
});

export const receiveWeightByDate = (weight, date) => ({
    type: RECEIVE_WEIGHT_BY_DATE,
    weight,
    date
});

// SELECTORS

export const getUserNutritionByDay = state => {
    const nutritionItems = Object.values(state.users.nutritionItems);

    const dailyNutrition = nutritionItems.filter(nutritionItem => {
        const dateConsumed = new moment.utc(nutritionItem.dateConsumed).format("YYYY-MM-DD")
        return dateConsumed === state.ui.selectedDate;
    });

    return dailyNutrition;
}

export const getUserWeightByDate = state => state.users.weightByDate;

// THUNK ACTION CREATORS

export const updateUser = updatedUser => async dispatch => {
    try {  
        const res = await jwtFetch(`api/users/${updatedUser._id}`, {
            method: "PATCH",
            body: JSON.stringify(updatedUser)
        });
        const user = await res.json();

    } catch(err) {
        const res = await err.json();
        return dispatch(receiveErrors(res.errors));
    }
};

export const fetchUserNutritionByDay = selectedDate => async dispatch => {
    try {
        const res = await jwtFetch(`/api/nutrition/day?date=${selectedDate}`);
        const dailyNutrition = await res.json();
        dispatch(receiveUserNutrition({nutrition: dailyNutrition}));
    } catch(err) {
        const res = await err.json();
        return dispatch(receiveErrors(res.errors));
    }
}

export const addWeightByDate = (weight, date) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/users/weight`, {
            method: "POST",
            body: JSON.stringify({ weight, date })
        });


        if (res.ok) {
            dispatch(receiveWeightByDate(weight, date));
        } else {
            const errorData = await res.json();
            return dispatch(receiveErrors(errorData.errors));
        }
    } catch(err) {
        const res = await err.json();
        return dispatch(receiveErrors(res.errors));
    }
}

// REDUCER

const initialState = {
    nutritionItems: {},
    workouts: [],
    healthData: {},
    mealPlan: {},
    weightByDate: {}
};

const usersReducer = (state = initialState, action) => {
    const nextState = { ...state };
    
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            nextState.nutritionItems = action.currentUser?.nutritionData ? action.currentUser.nutritionData : {}
            nextState.healthData = action.currentUser?.healthData ? action.currentUser.healthData : {}
            nextState.workouts = action.currentUser?.workouts || []
            nextState.weightByDate = action.currentUser?.weightByDate || {}
            return nextState
        case RECEIVE_USER_NUTRITION:
            nextState.nutritionItems = action.userNutrition.nutrition
            return nextState;
        case REMOVE_USER_NUTRITION:
            return {
                ...state,
                nutritionItems: state.nutritionItems.filter(item => item._id !== action.userNutritionId)
            };
        case RECEIVE_USER_HEALTH:
            return { ...state, healthData: action.healthData };
        case RECEIVE_MEAL_PLAN:
            return { ...state, mealPlan: action.mealPlan };
        case RECEIVE_WORKOUT:
            const newWorkout = action.workout.workouts[action.workout.workouts.length - 1];
            nextState.workouts.push(newWorkout);
            return nextState
        case RECEIVE_WORKOUTS:
            nextState.workouts = action.workouts;
            return nextState;
        case RECEIVE_WEIGHT_BY_DATE:
            nextState.weightByDate[action.date] = action.weight;
            return nextState;
        case RECEIVE_USER_LOGOUT:
            return initialState;
        default:
            return state;
    }
};

export default usersReducer;