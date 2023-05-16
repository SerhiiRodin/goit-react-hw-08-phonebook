import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const userToken = {
  set: token =>
    (axios.defaults.headers.common.Authorization = `Bearer ${token}`),
  unset: () => (axios.defaults.headers.common.Authorization = ''),
};

//  POST @ /users/signup
//  body: { name, email, password }
//  После успешной регистрации добавляем токен в HTTP-заголовок

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
