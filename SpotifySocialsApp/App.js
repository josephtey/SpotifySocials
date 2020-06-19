import React from 'react'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './src/screens/LoginScreen'
import FriendsScreen from './src/screens/FriendsScreen'
import CompareScreen from './src/screens/CompareScreen'
import CurrentUserScreen from './src/screens/CurrentUserScreen'
import InitialiseScreen from './src/screens/InitialiseScreen'
import { DBProvider } from './src/context/dbContext'

const navigator = createStackNavigator({
  Login: LoginScreen,
  Friends: FriendsScreen,
  Compare: CompareScreen,
  CurrentUser: CurrentUserScreen,
  Initialise: InitialiseScreen
},
  {
    initialRouteName: 'Login',
    mode: 'modal',
    defaultNavigationOptions: {
      headerShown: false,
      cardStyle: {
          backgroundColor: '#191414'
      }
    }
  }
);

const App = createAppContainer(navigator)

export default () => {
  return (
    <DBProvider>
      <App />
    </DBProvider>
  )
}