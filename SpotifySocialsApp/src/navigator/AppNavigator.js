import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from '../screens/LoginScreen'
import InitialiseScreen from '../screens/InitialiseScreen'
import HomeScreen from '../screens/HomeScreen'
import UserScreen from '../screens/UserScreen'
import NotificationsScreen from '../screens/NotificationsScreen'

const navigator = createStackNavigator({
  Login: LoginScreen,
  Initialise: InitialiseScreen,
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      gesturesEnabled: false
    }
  },
  User: UserScreen,
  Notifications: NotificationsScreen
},
  {
    initialRouteName: 'Login',
    mode: 'screen',
    defaultNavigationOptions: {
      headerShown: false,
    }
  }
);

export default createAppContainer(navigator)
