import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Colors} from '../theme/colors';
import TabIcon from '../components/router/tabIcon';
import {TABNAVIGATOR} from '../utils/route';
import {
  CariEkstre,
  CariList,
  CheckBook,
  Mizan,
  MyCheckBook,
  Profile,
} from '../screens';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: Colors.PRIMARY,
        tabBarInactiveTintColor: Colors.BLACK,
        headerTitleAlign: 'center',
        tabBarStyle: {
          paddingVertical: 4,
          paddingBottom: 6,
          height: 50,
        },
        headerShown: false,
        safeAreaInsets: {bottom: 0},
        tabBarIcon: ({size, color, focused}) => {
          return (
            <TabIcon
              focused={focused}
              color={color}
              size={size}
              route={route}
            />
          );
        },
      })}>
      <Tab.Screen name={TABNAVIGATOR.MIZAN} component={Mizan} />
      <Tab.Screen name={TABNAVIGATOR.CARI_EKTRE} component={CariEkstre} />
      <Tab.Screen name={TABNAVIGATOR.CHECK_BOOK} component={CheckBook} />
      <Tab.Screen name={TABNAVIGATOR.MY_CHECK_BOOK} component={MyCheckBook} />
      <Tab.Screen name={TABNAVIGATOR.CARI_LIST} component={CariList} />
      <Tab.Screen name={TABNAVIGATOR.PROFILE} component={Profile} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
