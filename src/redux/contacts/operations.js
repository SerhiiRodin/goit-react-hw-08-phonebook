import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.baseURL = 'https://64520ce4a2860c9ed400a177.mockapi.io';

export const getContactsAction = createAsyncThunk(
  'contacts/getContacts',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (error) {
      console.log(error);
      console.log(error.message);
      toast.error(`Error!!! Something went wrong. Use the service over time.`, {
        autoClose: 2000,
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const postContactsAction = createAsyncThunk(
  'contacts/postContacts',
  async (contact, thunkAPI) => {
    try {
      const response = await axios.post('/contacts', contact);

      //   console.log(response);
      toast.success(`Add contact.`, {
        autoClose: 1000,
        hideProgressBar: true,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContactsAction = createAsyncThunk(
  'contacts/deleteContacts',
  async (contactId, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${contactId}`);

      toast.success(`Delete contact.`, {
        autoClose: 1000,
        hideProgressBar: true,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
