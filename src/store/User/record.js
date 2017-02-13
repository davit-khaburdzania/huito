import { Record } from 'immutable'

const UserRecord = Record({
  id: null,
  first_name: '',
  last_name: '',
  email: '',
  images: [],
  auth_token: '',
  fb_auth_token: ''
})

export default class User extends UserRecord {
  firstImage () {
    let image = this.images[0] || (this.images.get && this.images.get(0))

    if (image) return image.url

    return 'https://i.imgur.com/rCmHRNM.png'
  }
}
