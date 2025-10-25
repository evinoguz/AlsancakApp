import {createSlice} from '@reduxjs/toolkit';
import {loadUser} from '../actions/authActions';

const initialState = {
  userInfo: null,
  kulAdi: null,
  lastLoginDate: null,
  pending: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      state.kulAdi = action.payload.user.kuladi;
      state.lastLoginDate = action.payload.lastLoginDate;
    },
    logout: state => {
      state.userInfo = null;
      state.lastLoginDate = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadUser.pending, state => {
        state.pending = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.kulAdi = action.payload.kulAdi;
        state.lastLoginDate = action.payload.lastLoginDate;
        if (action.payload.autoLoggedOut) {
          state.userInfo = null;
        } else {
          state.userInfo = action.payload.userInfo;
        }
        state.pending = false;
      })
      .addCase(loadUser.rejected, state => {
        state.pending = false;

      });
  },
});

export const {setCredentials, logout} = authSlice.actions;

export default authSlice.reducer;
