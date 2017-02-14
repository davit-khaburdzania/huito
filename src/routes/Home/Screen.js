import React, { Component } from 'react'
import { connect } from 'react-redux'
import Home from './Home'
import { AlertActions, UserActions } from 'app/store/actions'
import { UserSelectors } from 'app/store/selectors'

let connectProps = { ...AlertActions, ...UserActions }
let connectState = state => ({
  currentUser: UserSelectors.current(state)
})

let enhancer = connect(connectState, connectProps)

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Welcome Yoo'
  }

  render () {
    return <Home {...this.props} />
  }
}

export default enhancer(HomeScreen)
