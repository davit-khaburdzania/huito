import { Record } from 'immutable'

const UserRecord = Record({
  id: null,
  first_name: '',
  last_name: '',
  email: '',
  image: '',
  auth_token: '',
  fb_auth_token: ''
})

export default class User extends UserRecord {
  firstImage () {
    console.log('first image')
  }
}
