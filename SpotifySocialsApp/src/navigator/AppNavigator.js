import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './src/screens/LoginScreen'
import FriendsScreen from './src/screens/FriendsScreen'
import FriendScreen from './src/screens/FriendScreen'
import CurrentUserScreen from './src/screens/CurrentUserScreen'
import NotificationsScreen from './src/screens/NotificationsScreen'
import InitialiseScreen from './src/screens/InitialiseScreen'
import SearchScreen from './src/screens/SearchScreen'

const navigator = createStackNavigator({
  Login: LoginScreen,
  Friends: FriendsScreen,
  Friend: FriendScreen,
  CurrentUser: CurrentUserScreen,
  Initialise: InitialiseScreen,
  Notifications: NotificationsScreen,
  Search: SearchScreen
},
  {
    initialRouteName: 'Login',
    mode: 'screen',
    defaultNavigationOptions: {
      headerShown: false,
      cardStyle: {
        backgroundColor: '#191414'
      }
    }
  }
);

export const App = createAppContainer(navigator)
