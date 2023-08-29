//CONSTANTS
const ACTIVATE_HEALTH_FORM = 'ACTIVATE_HEALTH_FORM';
const DEACTIVATE_HEALTH_FORM = 'DEACTIVATE_HEALTH_FORM';

//ACTION CREATORS
export const activateHealthForm = () => ({
    type: ACTIVATE_HEALTH_FORM
})

export const deactivateHealthForm = () => ({
    type: DEACTIVATE_HEALTH_FORM
})


// SELECTORS 
export const getHealthFormState = state => state.ui.healthForm

// REDUCER
const initialState = {
    healthForm: null
}

const uiReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTIVATE_HEALTH_FORM:
            return {...state, healthForm: true}
        case DEACTIVATE_HEALTH_FORM:
            return {...state, healthForm: false}
        default: 
            return state
    }
}

export default uiReducer