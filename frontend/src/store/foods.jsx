import jwtFetch from './jwt'
import { RECEIVE_USER_LOGOUT } from './session';

// CONSTANTS

const apiKey = process.env.REACT_APP_SPOONACULAR_API_KEY;
const RECEIVE_FOODS = 'foods/RECEIVE_FOODS';
const RECEIVE_FOOD = 'foods/RECEIVE_FOOD';
const REMOVE_FOOD = 'foods/REMOVE_FOOD';
const RECEIVE_FOOD_ERRORS = 'foods/RECEIVE_FOOD_ERRORS';
const CLEAR_FOOD_ERRORS  = 'foods/CLEAR_FOOD_ERRORS';
export const RECEIVE_USER_NUTRITION = 'foods/RECEIVE_USER_NUTRITION';

// ACTION CREATORS

const receiveFoods = foods => ({ type: RECEIVE_FOODS, foods });
const receiveFood = food => ({ type: RECEIVE_FOOD, food });
const removeFood = foodId => ({ type: REMOVE_FOOD, foodId });

const receiveUserNutrition = userNutrition => ({ 
    type: RECEIVE_USER_NUTRITION, 
    userNutrition 
});

const receiveFoodErrors = errors => ({ type: RECEIVE_FOOD_ERRORS, errors });
const clearFoodErrors = () => ({ type: CLEAR_FOOD_ERRORS });

// SELECTORS

export const getFoods = state => Object.values(state.foods);
export const getFood = foodId => state => state.foods.results[foodId]
export const getFullFoodItem = selectedFood => state => state.foods[selectedFood.id]

// THUNK ACTION CREATORS

export const fetchFoods = (category, foodSearch) => async dispatch => {
    console.log(category, foodSearch)
    try {
        const endpointMap = {
            ingredients: 'food/ingredients/search',
            products: 'food/products/search',
            menuItems: 'food/menuItems/search',
            recipes: 'recipes/complexSearch'
        };
        
        const endpoint = endpointMap[category];
        const res = await jwtFetch(`https://api.spoonacular.com/${endpoint}?query=${foodSearch}&apiKey=${apiKey}`);
        const foods = await res.json();
        dispatch(receiveFoods(foods));
    } catch(err) {
        const errors = await err.json();
        dispatch(receiveFoodErrors(errors));
    }
}

export const fetchFood = (category, foodId, amount, unit) => async dispatch => {
    try {
        const endpointMap = {
            ingredients: `food/ingredients/${foodId}/information?amount=100&unit=g`,
            products: `food/products/${foodId}`,
            menuItems: `food/menuItems/${foodId}`,
            recipes: `recipes/${foodId}/information?includeNutrition=true`
        };

        const endpoint = endpointMap[category];
        console.log("endpoint: ", endpoint);
        const res = await jwtFetch(`https://api.spoonacular.com/${endpoint}&apiKey=${apiKey}`);
        const food = await res.json();
        dispatch(receiveFood(food));
        return food;
    } catch(err) {
        const errors = await err.json();
        dispatch(receiveFoodErrors(errors));
    }
}

export const addUserNutrition = (foodItem) => async dispatch => {
    try {
        console.log(foodItem)
        const res = await jwtFetch('/api/nutrition', {
            method: 'POST',
            body: JSON.stringify(foodItem)
        });

        const newUserNutrition = await res.json();
        dispatch(receiveUserNutrition(newUserNutrition));
        
    } catch(err) {
        const errors = await err.json();
        dispatch(receiveFoodErrors(errors));
    }
}

// 'https://api.spoonacular.com/food/ingredients/9266/information?amount=1?unit=grams'
// 'https://api.spoonacular.com/food/products/22347'
// 'https://api.spoonacular.com/food/menuItems/424571'
// 'https://api.spoonacular.com/recipes/716429/information?includeNutrition=false'

export const createFood = food => async dispatch => {
    try {
        const res = await jwtFetch('/api/foods', {
            method: 'POST',
            body: JSON.stringify(food)
        });
        
        const newFood = await res.json();
        dispatch(receiveFood(newFood));
    } catch(err) {
        const errors = await err.json();
        dispatch(receiveFoodErrors(errors));
    }
}

export const deleteFood = foodId => async dispatch => {
    try {
        await jwtFetch('/api/foods/${foodId}', {
            method: "DELETE"
        })
        dispatch(removeFood(foodId))
    } catch(err) {
        const errors = await err.json();
        dispatch(receiveFoodErrors(errors))
    }
}
// category would be food/category/search

// https://api.spoonacular.com/food/ingredients/search
// https://api.spoonacular.com/food/products/search
// https://api.spoonacular.com/food/menuItems/search
// https://api.spoonacular.com/recipes/complexSearch

const nullErrors = null;

export const foodErrorsReducer = (state=nullErrors, action) => {
    switch(action.type) {
        case RECEIVE_FOOD_ERRORS:
            return action.errors;
        case RECEIVE_FOOD:
            return nullErrors;
        case CLEAR_FOOD_ERRORS:
            return nullErrors;
        default:
            return state;
    }
}

const foodsReducer = (state = {}, action) => {
    const nextState = { ...state };
    
    switch(action.type) {
        case RECEIVE_FOODS:
            return { ...action.foods.results }
        case RECEIVE_FOOD:
            return { ...state, [action.food.id]: action.food };
        case REMOVE_FOOD:
            delete nextState[action.foodId];
            return nextState;
        case RECEIVE_USER_LOGOUT:
            return {};
        default:
            return state;
    }
}

export default foodsReducer;