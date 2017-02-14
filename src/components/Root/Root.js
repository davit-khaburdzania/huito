import React, { Component } from 'react'
import { Text } from 'react-native'
import { Provider } from 'react-redux'
import store from 'app/store'
import { App } from '..'

class Root extends Component {
  render () {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

export default Root
