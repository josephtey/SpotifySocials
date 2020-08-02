import React from 'react'
import { Provider } from 'react-redux';
import store from './store'
import AppNavigator from './src/navigator/AppNavigator'

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  )
}

export default App