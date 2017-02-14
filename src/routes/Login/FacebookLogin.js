import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import FBSDK from 'react-native-fbsdk'

const { LoginManager, AccessToken, GraphRequest, GraphRequestManager } = FBSDK

export default class FacebookLogin extends Component {
  getUserInfo (token) {
    let options = { parameters: {
      fields: { string: 'first_name, last_name, picture.width(800), email' }
    }}

    let infoRequest = new GraphRequest('/me', options, (error, result) => {
      if (error) {
        return this.props.addAlert('error', 'Facebook Authentication Failed')
      }

      let payload = {...result, fb_auth_token: token, image: result.picture.data.url}

      this.props.loginFacebook(payload)
    })

    new GraphRequestManager().addRequest(infoRequest).start()
  }

  onLogin () {
    let permissions = ['public_profile', 'email', 'user_about_me']

    if (this.props.agent && !this.props.licenseNumber) {
      return this.props.addAlert('error', 'License Number is required')
    }

    LoginManager.logInWithReadPermissions(permissions).then(result => {
      if (result.isCancelled) return console.log(result, 'Login cancelled')

      AccessToken.getCurrentAccessToken().then(data => {
        if (!data) return this.props.addAlert('error', 'Facebook Authentication Failed')

        this.getUserInfo(data.accessToken.toString())
      })
    }, () => {
      this.props.addAlert('error', 'Facebook Authentication Failed')
    })
  }

  goHome () {
    this.props.navigator.replace('houses', { fromLogin: true })
  }

  render () {
    return (
      <Icon.Button
        name='logo-facebook'
        onPress={this.onLogin.bind(this)}
        style={[styles.button, this.props.style]}
        borderRadius={10}
      >
        {this.props.children}
      </Icon.Button>
    )
  }
}

var styles = StyleSheet.create({
  button: {
    backgroundColor: '#005CB3',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
