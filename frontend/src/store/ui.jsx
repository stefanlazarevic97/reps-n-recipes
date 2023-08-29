// CONSTANTS
const ACTIVATE_HEALTH_FORM = 'ACTIVATE_HEALTH_FORM';
const DEACTIVATE_HEALTH_FORM = 'DEACTIVATE_HEALTH_FORM';
const CHANGE_SELECTED_OPTION = 'CHANGE_SELECTED_OPTION';

// ACTION CREATORS

export const activateHealthForm = () => ({
    type: ACTIVATE_HEALTH_FORM
})

export const deactivateHealthForm = () => ({
    type: DEACTIVATE_HEALTH_FORM
})

export const changeSelectedOption = selectedOption => ({ 
    type: CHANGE_SELECTED_OPTION,
    selectedOption
})

// SELECTORS 
export const getHealthFormState = state => state.ui.healthForm

// REDUCER
const initialState = {
<<<<<<< HEAD
    healthForm: false
=======
    healthForm: null,
    selectedOption: 'ingredients'
>>>>>>> main
}

const uiReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTIVATE_HEALTH_FORM:
            return {...state, healthForm: true}
        case DEACTIVATE_HEALTH_FORM:
            return {...state, healthForm: false}
        case CHANGE_SELECTED_OPTION:
            return {...state, selectedOption: action.selectedOption}
        default: 
            return state
    }
}

export default uiReducer