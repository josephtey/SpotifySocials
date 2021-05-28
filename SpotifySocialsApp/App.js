import React, { useEffect, useState } from 'react'
import { Provider, connect } from 'react-redux';
import store from './store'
import AppNavigator from './src/navigator/AppNavigator'
import * as font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { ScrollView, Text } from "react-native"

const fetchFonts = () => {
  return font.loadAsync({
    'TTCommons-DemiBold': require('./assets/fonts/TTCommons-DemiBold.ttf'),
    'TTCommons-Regular': require('./assets/fonts/TTCommons-Regular.ttf'),
    'TTCommons-Medium': require('./assets/fonts/TTCommons-Medium.ttf'),
    'TTCommons-Bold': require('./assets/fonts/TTCommons-Bold.ttf'),
    'TTCommons-Light': require('./assets/fonts/TTCommons-Light.ttf')
  })
}

const AppNav = (props) => {
  const [isLoading, setLoading] = useState(true)

  if (isLoading) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setLoading(false)}
        onError={console.warn}
      />
    )
  } else {
    return (
      <AppNavigator />
    );
  }


}

const mapStateToProps = (state) => {
  return state
}

const AppWithInternalState = connect(mapStateToProps)(AppNav);


const App = () => {
  return (
    <Provider store={store}>
      <AppWithInternalState />
    </Provider>
  )
}

export default App