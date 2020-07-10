import React, { Component } from 'react'
import AppNavigation from './src/AppNavigation/AppNavigation'
import { Provider } from 'react-redux'
import Store from './src/Redux/Store'

export default class App extends Component {

  UNSAFE_componentWillMount() {
    console.disableYellowBox = true;
  }

  render() {
    return (
      <Provider store={Store}>
        <AppNavigation />
      </Provider>
    );
  }
}

