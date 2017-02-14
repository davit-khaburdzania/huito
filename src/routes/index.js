import HomeScreen from './Home/Screen'
import LoginScreen from './Login/Screen'
import Activity from './Activity/Screen'

const routes = {
  Home: { screen: HomeScreen },
  Login: { screen: LoginScreen },
  Activity: {
    screen: Activity,
    navigationOptions: { title: 'Activity' }
  }
}

export default routes
