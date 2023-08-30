import jwtFetch from './jwt';
import { RECEIVE_USER_NUTRITION } from './foods';
import { receiveErrors } from './session';
import { RECEIVE_USER_LOGOUT } from './session';
import { RECEIVE_CURRENT_USER } from './session';

const RECEIVE_USER_HEALTH = 'users/RECEIVE_USER_HEALTH'
// const RECEIVE_USER_NUTRITION = 'RECEIVE_USER_NUTRITION'

export const receiveUserHealth = healthData => ({
    type: RECEIVE_USER_HEALTH,
    healthData
});



export const updateUser = updatedUser => async dispatch => {
    // console.log(updatedUser)
    try {  
        const res = await jwtFetch(`api/users/${updatedUser._id}`, {
            method: "PATCH",
            body: JSON.stringify(updatedUser)
        });
        const user = await res.json();
        // dispatch(receiveUserHealth(user));
        // return dispatch(receiveCurrentUser(user));
    } catch(err) {
        const res = await err.json();
        return dispatch(receiveErrors(res.errors));
    }
};


const initialState = {
    nutritionItems: {},
    workouts: {},
    healthData: {}
};

const usersReducer = (state = initialState, action) => {
    const nextState = { ...state };
    
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            nextState.nutritionItems = action.currentUser?.nutritionData ? action.currentUser.nutritionData : {}
            nextState.healthData = action.currentUser?.healthData ? action.currentUser.healthData : {}
            return nextState
        case RECEIVE_USER_NUTRITION:
            nextState.nutritionItems = action.userNutrition.nutrition
            return nextState;
        case RECEIVE_USER_HEALTH:
            return { ...state, healthData: action.healthData };
        case RECEIVE_USER_LOGOUT:
            return initialState;
        default:
            return state;
    }
};

export default usersReducer;