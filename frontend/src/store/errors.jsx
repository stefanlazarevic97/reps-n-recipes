import { combineReducers } from 'redux';
import { sessionErrorsReducer } from './session';
import { foodErrorsReducer } from './foods';
import { exerciseErrorsReducer } from './exercises';

export default combineReducers({
  session: sessionErrorsReducer,
  food: foodErrorsReducer,
  exercise: exerciseErrorsReducer,
});