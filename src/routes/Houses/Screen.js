import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import Houses from './Houses'
import { AlertActions, HouseActions, HouseSwipeActions, UserActions, UserSwipeActions } from 'app/store/actions'
import { NavigationBar, NavigationIcon, TabNavigation, TabNavigationAgent } from 'app/components'
import { UserSelectors, HouseSelectors } from 'app/store/selectors'
import { NavigationStyles } from '@exponent/ex-navigation'
import leftIcon from 'assets/img/settings-icon.png'
import rightIcon from 'assets/img/lightning-icon.png'

let connectProps = { ...AlertActions, ...HouseActions, ...HouseSwipeActions, ...UserActions, ...UserSwipeActions }
let connectState = state => ({
  currentUser: UserSelectors.current(state),
  houses: HouseSelectors.unswiped(state),
  agents: UserSelectors.unswipedAgents(state)
})

let enhancer = connect(connectState, connectProps)

class HousesScreen extends Component {
  static route = {
    styles: {
      ...NavigationStyles.Fade
    },
    navigationBar: {
      tintColor: '#fff',
      renderTitle: () => <NavigationBar />,
      backgroundColor: '#fff',
      borderBottomWidth: 0,
      renderLeft: () => <NavigationIcon image={leftIcon} screen='update_house' />,
      renderRight: () => <NavigationIcon image={rightIcon} screen='house_matches' />
    }
  }

  componentWillMount () {
    if (this.props.fromSignUp) {
      this.props.addAlert('success', 'Successfully Signed up')
    }

    if (this.props.fromLogin) {
      this.props.addAlert('success', 'Successfully Signed in')
    }

    if (!this.props.houses.size || this.props.houses.size < 3) {
      setTimeout(() => this.props.getHouses(), 500)
    }

    if (!this.props.agents.size || this.props.agents.size < 3) {
      setTimeout(() => this.props.getAgents(), 500)
    }
  }

  componentWillReceiveProps (nextProps) {
    // if (this.props.houses.size === 0) nextProps.getHouses()
  }

  render () {
    return (
      <View style={{ flex: 1 }}>
        <Houses {...this.props} />
        {
          this.props.currentUser.user_type === 'agent'
          ? <TabNavigationAgent active='houses' />
          : <TabNavigation active='houses' />
        }
      </View>
    )
  }
}

export default enhancer(HousesScreen)
