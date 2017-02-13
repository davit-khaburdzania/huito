import React, { Component } from 'react'
import { Text } from 'react-native'
import { Provider } from 'react-redux'
import store from 'app/store'

class Root extends Component {
  render () {
    return (
      <Provider store={store}>
        <Text>Huito</Text>
      </Provider>
    )
  }
}

export default Root
