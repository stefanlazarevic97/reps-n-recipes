import jwtFetch from './jwt';
import { RECEIVE_MEAL_PLAN, RECEIVE_USER_NUTRITION, REMOVE_USER_NUTRITION, receiveUserNutrition } from './foods';
import { receiveErrors } from './session';
import { RECEIVE_USER_LOGOUT } from './session';
import { RECEIVE_CURRENT_USER } from './session';
import moment from 'moment-timezone';
import { RECEIVE_WORKOUT, RECEIVE_WORKOUTS } from './workouts';

// CONSTANTS 

const RECEIVE_USER_HEALTH = 'users/RECEIVE_USER_HEALTH'

// ACTION CREATORS

export const receiveUserHealth = healthData => ({
    type: RECEIVE_USER_HEALTH,
    healthData
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

// REDUCER

const initialState = {
    nutritionItems: {},
    workouts: {},
    healthData: {},
    mealPlan: {}
};

const usersReducer = (state = initialState, action) => {
    const nextState = { ...state };
    
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            nextState.nutritionItems = action.currentUser?.nutritionData ? action.currentUser.nutritionData : {}
            nextState.healthData = action.currentUser?.healthData ? action.currentUser.healthData : {}
            nextState.workouts = action.currentUser?.workouts ? action.currentUser.workouts : {}
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
            nextState.workouts = action.workout
            return nextState;
        case RECEIVE_USER_LOGOUT:
            return initialState;
        default:
            return state;
    }
};

export default usersReducer;