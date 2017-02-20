import request from 'axios'
import { setToken, unsetToken, reduceUsers } from './helpers'
import api from 'app/store/api'
import FBSDK from 'react-native-fbsdk'

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

export const getFriends = (token) => async dispatch => {
  let options = { parameters: {
    fields: { string: 'user_friends, read_custom_friendlists' }
  }}

  let infoRequest = new FBSDK.GraphRequest('/me/friendlist', options, (error, result) => {
    console.log(error, result)
    // this.props.loginFacebook(payload)
  })

  new FBSDK.GraphRequestManager().addRequest(infoRequest).start()
}
