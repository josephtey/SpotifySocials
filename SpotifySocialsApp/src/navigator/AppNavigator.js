import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from '../screens/LoginScreen'
import InitialiseScreen from '../screens/InitialiseScreen'
import HomeScreen from '../screens/HomeScreen'

const navigator = createStackNavigator({
  Login: LoginScreen,
  Initialise: InitialiseScreen,
  Home: HomeScreen
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
