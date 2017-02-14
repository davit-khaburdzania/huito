import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import request from 'axios'
// import { NavigationProvider, StackNavigation } from '@exponent/ex-navigation'
import { StackNavigator } from 'react-navigation'
import { connect } from 'react-redux'
import Router from 'app/routes'
import { UserActions } from 'app/store/actions'
import { UserSelectors } from 'app/store/selectors'

let connectProps = {...UserActions}
let connectState = state => ({ currentUser: UserSelectors.current(state) })
let enhancer = connect(connectState, connectProps)

class App extends Component {
  // componentWillMount () {
  //   this.reAuthenticateUser()
  // }
  //
  // async reAuthenticateUser () {
  //   try {
  //     let token = await AsyncStorage.getItem('auth_token')
  //
  //     if (!this.props.currentUser && token) {
  //       request.defaults.headers.common['AUTH-TOKEN'] = token
  //       this.props.getMe()
  //     }
  //   } catch (error) {}
  // }

  render () {
    const Navigation = StackNavigator(Router)

    // let initialRoute = this.props.currentUser ? 'houses' : 'login'

    return (
      <Navigation />
    )
  }
}

export default enhancer(App)
