import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import errorHandler from 'app/utils/middlewares/errorHandler'
import rootReducer from 'app/store/reducers'

const middlewares = [errorHandler, thunk]
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, {}, composeEnhancers(
  applyMiddleware(...middlewares)
))

export default store
