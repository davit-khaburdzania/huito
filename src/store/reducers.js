import { combineReducers } from 'redux'

import User from './User/reducers'
import Alert from './Alert/reducers'

const appReducer = combineReducers({
  User,
  Alert
})

const rootReducer = (state, action) => {
  if (action.type === 'RESET_STATE') {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer
