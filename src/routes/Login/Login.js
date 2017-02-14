import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Alertable from 'app/HOC/Alert.js'
import FacebookLogin from './FacebookLogin'

class Login extends Component {
  render () {
    let { loginFacebook, navigator } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.buttonsContainer}>
          <FacebookLogin
            loginFacebook={loginFacebook}
            navigator={navigator}
            addAlert={this.props.addAlert}
            style={styles.fbButton}>

            <Text style={styles.fbText}>Sign In With Facebook</Text>
          </FacebookLogin>
        </View>
      </View>
    )
  }
}

Login.propTypes = {
  loginUser: React.PropTypes.func.isRequired
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 30
  },
  fbButton: {
    width: 250
  },
  fbText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFF'
  }
})

export default Alertable(Login)
