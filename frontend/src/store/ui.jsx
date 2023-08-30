// CONSTANTS
const ACTIVATE_HEALTH_FORM = 'ACTIVATE_HEALTH_FORM';
const DEACTIVATE_HEALTH_FORM = 'DEACTIVATE_HEALTH_FORM';
const CHANGE_SELECTED_OPTION = 'CHANGE_SELECTED_OPTION';
const CHANGE_SELECTED_DATE = 'CHANGE_SELECTED_DATE'

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

export const changeSelectedDate = selectedDate => ({
    type: CHANGE_SELECTED_DATE,
    selectedDate
})

// SELECTORS 
export const getHealthFormState = state => state.ui.healthForm

// REDUCER
const initialState = {
    healthForm: false,
    selectedOption: 'ingredients',
    selectedDate: new Date().toLocaleDateString('en-CA')
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