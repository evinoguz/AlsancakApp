import {createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {logout, setCredentials} from '../slices/authSlice';
import {getTodayDateString} from '../../utils/functions';

export const loadUser = createAsyncThunk('auth/loadUser', async () => {
  const userInfoJson = await AsyncStorage.getItem('userInfo');
  const kulAdi = await AsyncStorage.getItem('kulAdi');
  const lastLoginDate = await AsyncStorage.getItem('lastLoginDate');

  const userInfo = userInfoJson ? JSON.parse(userInfoJson) : null;
  const todayDate = getTodayDateString();
  let autoLoggedOut = false;

  // Otomatik Çıkış Kontrolü
  if (userInfo && lastLoginDate && lastLoginDate !== todayDate) {
    await AsyncStorage.removeItem('userInfo');
    await AsyncStorage.removeItem('lastLoginDate');
    autoLoggedOut = true;
    userInfo = null;
  }
  return {
    userInfo,
    kulAdi: kulAdi || null,
    lastLoginDate: lastLoginDate || null,
    autoLoggedOut: autoLoggedOut,
  };
});

export const saveCredentials = createAsyncThunk(
  'auth/saveCredentials',
  async (payload, {dispatch}) => {
    const todayDate = getTodayDateString();
    await AsyncStorage.setItem('userInfo', JSON.stringify(payload));
    await AsyncStorage.setItem('lastLoginDate', todayDate);
    const kulAdi = payload?.user?.kuladi;
    if (kulAdi) {
      await AsyncStorage.setItem('kulAdi', kulAdi);
    }
    dispatch(
      setCredentials({...payload, lastLoginDate: todayDate}),
    );
  },
);

export const performLogout = createAsyncThunk(
  'auth/performLogout',
  async (_, {dispatch}) => {
    await AsyncStorage.removeItem('userInfo');
    await AsyncStorage.removeItem('lastLoginDate');
    dispatch(logout());
  },
);
