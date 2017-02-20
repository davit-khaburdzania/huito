import { API_URL } from 'app/constants'

export default {
  loginFacebook: () => `${API_URL}/login/facebook`,
  me: () => `${API_URL}/users/me`,
  activities: () => `${API_URL}/activities`
}
