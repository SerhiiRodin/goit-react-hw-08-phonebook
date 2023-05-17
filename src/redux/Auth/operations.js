import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const userToken = {
  // Utility to add JWT
  set: token =>
    (axios.defaults.headers.common.Authorization = `Bearer ${token}`),
  // Utility to remove JWT
  unset: () => (axios.defaults.headers.common.Authorization = ''),
};

//  POST @ /users/signup
//  body: { name, email, password }

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userdata, thunkAPI) => {
    try {
      const { data } = await axios.post('/users/signup', userdata);

      userToken.set(data.token);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//  POST @ /users/login
//  body: { email, password }

export const loginUser = createAsyncThunk(
  'auth/login',
  async (userdata, thunkAPI) => {
    try {
      const { data } = await axios.post('/users/login', userdata);

      userToken.set(data.token);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//  POST @ /users/logout
//  headers: Authorization: Bearer token

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await axios.post('/users/logout');

      userToken.unset();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// GET @ /users/current
// headers: Authorization: Bearer token

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    // Reading the token from the state via getState()
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (!persistedToken) {
      // If there is no token, exit without performing any request
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      userToken.set(persistedToken);
      const { data } = await axios.get('/users/current');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
