import request from 'axios'
import { AsyncStorage } from 'react-native'
import { normalize, arrayOf } from 'normalizr-immutable'
import Schemas from 'app/store/schemas'

export const reduceUsers = (data, dispatch) => {
  let normalized = normalize(data, arrayOf(Schemas.user), {})
  let users = normalized.entities.users

  dispatch({ type: 'RECEIVE_USERS', users })
}

export const setToken = async token => {
  request.defaults.headers.common['AUTH-TOKEN'] = token

  try {
    await AsyncStorage.setItem('auth_token', token)
  } catch (error) {}
}

export const unsetToken = async () => {
  request.defaults.headers.common['AUTH-TOKEN'] = null

  try {
    await AsyncStorage.removeItem('auth_token')
  } catch (error) {}
}
