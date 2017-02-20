import { fromJS } from 'immutable'
import request from 'axios'
import api from 'app/store/api'

export const createActivity = (payload) => async dispatch => {
  const { data } = request.post(api.activities(), { activity: payload })
}
