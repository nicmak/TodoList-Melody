import { combineReducers } from 'redux'
import { todoReducer } from './todoReducer.js'
import { featureReducer } from './featureReducer.js'

export default combineReducers({
  todoReducer,
  featureReducer
})
