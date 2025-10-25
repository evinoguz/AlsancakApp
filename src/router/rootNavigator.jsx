import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './tabNavigator';
import {LoginScreen, Splash} from '../screens';
import {LOGIN, TABNAVIGATOR} from '../utils/route';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();
const RootNavigator = () => {
  const {userInfo, pending} = useSelector(state => state.auth);

  if (pending) {
    return <Splash />;
  }
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {userInfo ? (
        <Stack.Screen name={TABNAVIGATOR.TAB} component={TabNavigator} />
      ) : (
        <Stack.Screen name={LOGIN} component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
