/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import {  useDispatch } from 'react-redux';
import { setLogin } from '../redux/loginForm';

const UseLocalStorageLogin = () => {
  const dispatch = useDispatch();

  // Retrieve the login state from local storage
  const isLogin = localStorage.getItem('isLogin') === 'true';

  useEffect(() => {
    // Dispatch the login action to update the Redux state
    dispatch(setLogin(isLogin));
  }, [dispatch, isLogin]);

  return isLogin;
};

export default UseLocalStorageLogin