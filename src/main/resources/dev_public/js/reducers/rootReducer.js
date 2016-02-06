import { combineReducers } from 'redux'
import loginData from './loginData'
import appData from './appData'
import data from './data'

export default combineReducers({
  loginData,
  appData,
  data
})
