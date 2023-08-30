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
export const REMOVE_USER_NUTRITION = 'foods/REMOVE_USER_NUTRITION';

// ACTION CREATORS

const receiveFoods = foods => ({ type: RECEIVE_FOODS, foods });
const receiveFood = food => ({ type: RECEIVE_FOOD, food });
const removeFood = foodId => ({ type: REMOVE_FOOD, foodId });

const receiveUserNutrition = userNutrition => ({ 
    type: RECEIVE_USER_NUTRITION, 
    userNutrition 
});

const removeUserNutrition = userNutritionId => ({
    type: REMOVE_USER_NUTRITION,
    userNutritionId
});

const receiveFoodErrors = errors => ({ type: RECEIVE_FOOD_ERRORS, errors });
const clearFoodErrors = () => ({ type: CLEAR_FOOD_ERRORS });

// SELECTORS

export const getFoods = state => Object.values(state.foods);
export const getFood = foodId => state => state.foods.results[foodId]
export const getFullFoodItem = selectedFood => state => state.foods[selectedFood.id]

// THUNK ACTION CREATORS

export const fetchIngredients = (ingredientSearch) => async dispatch => {
    try {
        const res = await jwtFetch(`https://api.spoonacular.com/food/ingredients/search?query=${ingredientSearch}&apiKey=${apiKey}`);
        const ingredients = await res.json();

        const data = ingredients.results.reduce((acc, ingredient) => 
            Object.assign(acc, { [ingredient.id]: ingredient }), {}
        )
        
        dispatch(receiveFoods(data));
        return data;
    } catch(err) {
        const errors = await err.json();
        dispatch(receiveFoodErrors(errors));
    }
}

export const fetchIngredient = (ingredientId) => async dispatch => {
    try {
        const res = await jwtFetch(`https://api.spoonacular.com/food/ingredients/${ingredientId}/information?amount=100&unit=g&apiKey=${apiKey}`);
        const ingredient = await res.json();
        dispatch(receiveFood(ingredient));
        return ingredient;
    } catch(err) {
        const errors = await err.json();
        dispatch(receiveFoodErrors(errors));
    }
}

export const fetchProducts = (productSearch) => async dispatch => {
    try {
        const res = await jwtFetch(`https://api.spoonacular.com/food/products/search?query=${productSearch}&apiKey=${apiKey}`)
        const products = await res.json();
        const data = products.products.reduce((acc, product) => 
            Object.assign(acc, { [product.id]: product }), {}
        )
        dispatch(receiveFoods(data));
        return data;
    } catch(err) {
        const errors = await err.json();
        dispatch(receiveFoodErrors(errors));
    }
}

export const fetchProduct = (productId) => async dispatch => {
    try {
        const res = await jwtFetch(`https://api.spoonacular.com/food/products/${productId}?apiKey=${apiKey}`);
        const product = await res.json();
        dispatch(receiveFood(product));
        return product;
    } catch(err) {
        const errors = await err.json();
        dispatch(receiveFoodErrors(errors));
    }
}

export const fetchMenuItems = (menuItemSearch) => async dispatch => {
    try { 
        const res = await jwtFetch(`https://api.spoonacular.com/food/menuItems/search?query=${menuItemSearch}&apiKey=${apiKey}`)
        const menuItems = await res.json();
        const data = menuItems.menuItems.reduce((acc, menuItem) => 
            Object.assign(acc, { [menuItem.id]: menuItem }), {}
        )
        dispatch(receiveFoods(data));
        return data;
    } catch (err) {
        const errors = await err.json();
        dispatch(receiveFoodErrors(errors));
    }
}

export const fetchMenuItem = (menuItemId) => async dispatch => {
    try {
        const res = await jwtFetch(`https://api.spoonacular.com/food/menuItems/${menuItemId}?apiKey=${apiKey}`);
        const menuItem = await res.json();
        dispatch(receiveFood(menuItem));
        return menuItem;
    } catch(err) {
        const errors = await err.json();
        dispatch(receiveFoodErrors(errors));
    }
}

export const fetchRecipes = (recipeSearch) => async dispatch => {
    try {
        const res = await jwtFetch(`https://api.spoonacular.com/recipes/complexSearch?query=${recipeSearch}&apiKey=${apiKey}`)
        const recipes = await res.json();
        
        const data = recipes.results.reduce((acc, recipe) =>
            Object.assign(acc, { [recipe.id]: recipe }), {}
        );

        dispatch(receiveFoods(data))
        return data
    } catch (err) {
        const errors = await err.json();
        dispatch(receiveFoodErrors(errors));
    }
}

export const fetchRecipe = (recipeId) => async dispatch => {
    try {
        const res = await jwtFetch(`https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=true&apiKey=${apiKey}`);
        const recipe = await res.json();
        dispatch(receiveFood(recipe));
        return recipe;
    } catch(err) {
        const errors = await err.json();
        dispatch(receiveFoodErrors(errors));
    }
}

export const addUserNutrition = (foodItem) => async dispatch => {
    try {
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

export const updateUserNutrition = (foodItem) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/nutrition/${foodItem._id}`, {
            method: 'PATCH',
            body: JSON.stringify(foodItem)
        });
        const updatedUserNutrition = await res.json();
        dispatch(receiveUserNutrition(updatedUserNutrition));
    } catch (err) {
        const errors = await err.json();
        dispatch(receiveFoodErrors(errors));
    }
}

export const deleteUserNutrition = (foodItemId) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/nutrition/${foodItemId}`, {
            method: 'DELETE'
        });
        dispatch(removeUserNutrition(foodItemId));
    } catch (err) {
        const errors = await err.json();
        dispatch(receiveFoodErrors(errors));
    }
}

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
            return { ...action.foods };
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