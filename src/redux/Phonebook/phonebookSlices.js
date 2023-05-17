import { combineReducers, createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';

const contactsInitialState = {
  items: [],
  isLoading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  extraReducers: {
    [fetchContacts.pending]: state => {
      state.isLoading = true;
    },
    [fetchContacts.fulfilled]: (state, { payload }) => {
      state.items = payload;
      state.isLoading = false;
      state.error = null;
    },
    [fetchContacts.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    [addContact.fulfilled]: (state, { payload }) => {
      state.items.push(payload);
    },
    [deleteContact.fulfilled]: (state, { payload }) => {
      state.items = state.items.filter(item => item.id !== payload.id);
    },
  },
});

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: { setFilter: (state, action) => (state = action.payload) },
});

export const phonebookReducer = combineReducers({
  contacts: contactsSlice.reducer,
  filter: filterSlice.reducer,
});

export const { setFilter } = filterSlice.actions;
