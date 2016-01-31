import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from './reducers/rootReducer'

const loggerMiddleware = createLogger()



const s7Store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
)

/*s7Store.dispatch({
  type : "LOG_STORE",
  username : null
});

s7Store.dispatch({
  type : "LOGIN_ACTION",
  username : null
});

s7Store.dispatch({
  type : "LOGIN_ACTION",
  username : "Spike"
});*/

module.exports = s7Store;
