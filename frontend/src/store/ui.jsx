// CONSTANTS
const ACTIVATE_HEALTH_FORM = 'ACTIVATE_HEALTH_FORM';
const DEACTIVATE_HEALTH_FORM = 'DEACTIVATE_HEALTH_FORM';
const CHANGE_SELECTED_OPTION = 'CHANGE_SELECTED_OPTION';
const CHANGE_SELECTED_DATE = 'CHANGE_SELECTED_DATE';
const ACTIVATE_WORKOUT_FORM = 'ACTIVATE_WORKOUT_FORM'
const DEACTIVATE_WORKOUT_FORM = 'DEACTIVATE_WORKOUT_FORM'

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

export const activateWorkoutForm = () => ({
    type: ACTIVATE_WORKOUT_FORM
})

export const deactivateWorkoutForm = () => ({
    type: DEACTIVATE_WORKOUT_FORM
})

// SELECTORS 
export const getHealthFormState = state => state.ui.healthForm
export const getWorkoutFormState = state => state.ui.workoutForm

// REDUCER
const initialState = {
    healthForm: false,
    selectedOption: 'ingredients',
    workoutForm: false,
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
        case CHANGE_SELECTED_DATE:
            return {...state, selectedDate: action.selectedDate}
        case ACTIVATE_WORKOUT_FORM:
            return {...state, workoutForm: true}
        case DEACTIVATE_WORKOUT_FORM:
            return {...state, workoutForm: false}
        default: 
            return state
    }
}

export default uiReducer