import React from 'react'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './src/screens/LoginScreen'
import { DBProvider } from './src/context/dbContext'

const navigator = createStackNavigator({
  Login: LoginScreen
},
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      title: 'Spotify Socials',
      cardStyle: {
        backgroundColor: 'white'
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