import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from '../screens/LoginScreen'
import InitialiseScreen from '../screens/InitialiseScreen'
import HomeScreen from '../screens/HomeScreen'
import UserScreen from '../screens/UserScreen'

const navigator = createStackNavigator({
  Login: LoginScreen,
  Initialise: InitialiseScreen,
  Home: HomeScreen,
  User: UserScreen
},
  {
    initialRouteName: 'Login',
    mode: 'screen',
    defaultNavigationOptions: {
      headerShown: false
    }
  }
);

export default createAppContainer(navigator)
