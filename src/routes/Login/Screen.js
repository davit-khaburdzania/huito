import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { AlertActions, UserActions } from 'app/store/actions'
import { UserSelectors } from 'app/store/selectors'
import Login from './Login'

let connectProps = { ...UserActions, ...AlertActions }
let connectState = state => ({ currentUser: UserSelectors.current(state) })
let enhancer = connect(connectState, connectProps)

class LoginScreen extends Component {
  static route = {
    navigationBar: {

    }
  }

  render () {
    return (
      <View style={{ flex: 1 }}>
        <Login {...this.props} />
      </View>
    )
  }
}

export default enhancer(LoginScreen)
