import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLogin: false,
    updated: 0,
    passcodeValue: false
  },
  reducers: {
    setLogin: (state, action) => {
      state.isLogin = action.payload;
      window.localStorage.setItem('globasity_Login_Form', state.isLogin)
    },
    setPassCodeValue: (state, action) => {
      state.passcodeValue = action.payload;
    },
    handleLogin: (state, action) => {
      window.localStorage.setItem('globasity_user_data', JSON.stringify(action.payload))
    },
    handleUserData: (state, action) => {
      state.updated = action.payload
    },
  },
});

export const { setLogin, handleLogin, handleUserData, setPassCodeValue } = authSlice.actions;

export default authSlice.reducer;