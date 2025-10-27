import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import RootNavigator from './src/router/rootNavigator';
import {Provider} from 'react-redux';
import {store} from './src/store';
import {StatusBar, View} from 'react-native';
import {Colors} from './src/theme/colors';

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.LIGHT_WHITE,
  },
};

const App = () => {
  return (
    <Provider store={store}>
      <View style={{flex: 1, backgroundColor: Colors.LIGHT_WHITE}}>
        <StatusBar
          translucent={false}
          backgroundColor={Colors.LIGHT_WHITE}
          barStyle="dark-content"
        />
        <NavigationContainer theme={AppTheme}>
          <RootNavigator />
        </NavigationContainer>
      </View>
    </Provider>
  );
};

export default App;
