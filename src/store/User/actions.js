import request from 'axios'
import { setToken, unsetToken, reduceUsers } from './helpers'
import api from 'app/store/api'

export const setCurrentUser = user => {
  setToken(user.auth_token)
  return { type: 'SET_CURRENT_USER', id: user.id }
}

export const logoutUser = () => {
  unsetToken()
  return { type: 'RESET_STATE' }
}

export const loginFacebook = payload => async dispatch => {
  let { data } = await request.post(api.loginFacebook(), { user: payload })

  reduceUsers([data], dispatch)
  dispatch(setCurrentUser(data))
}

export const getMe = () => async dispatch => {
  const { data } = await request.get(api.me())

  reduceUsers([data], dispatch)
  dispatch(setCurrentUser(data))
}
