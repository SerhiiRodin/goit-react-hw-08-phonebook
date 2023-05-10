import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  deleteContactsAction,
  getContactsAction,
  postContactsAction,
} from './operations';

const arrActions = [
  deleteContactsAction,
  getContactsAction,
  postContactsAction,
];

const getActionWithType = type => {
  return arrActions.map(el => el[type]);
};

const handlePending = (state, action) => {
  state.isLoading = true;
};

const handleFulfilledGet = (state, action) => {
  state.isLoading = false;
  state.items = action.payload;
  state.error = null;
};

const handleFulfilledPost = (state, action) => {
  state.isLoading = false;
  state.items.push(action.payload);
  state.error = null;
};

const handleFulfilledDelete = (state, action) => {
  state.isLoading = false;
  state.items = state.items.filter(contact => contact.id !== action.payload.id);
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = 'action.payload';
};

const initialState = {
  filter: '',
  items: [],
  isLoading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialState,
  reducers: {
    setStatusFilter: (state, action) => {
      state.filter = action.payload;
    },

    ////Когда не было createAsyncThunk мы создавали Экшены,
    // когда он появился, то он сам создает экшены и мы их обр. с помощью extraReducers
    // fetching: (state, action) => {
    //   state.isLoading = true;
    // },
    // fetchSuccess: (state, action) => {
    //   state.isLoading = false;
    //   state.items = action.payload;
    //   state.error = null;
    // },
    // fetchError: (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
  },

  // extraReducers: {
  //   [getContactsAction.pending]: (state, action) => {
  //     state.isLoading = true;
  //   },
  //   [getContactsAction.fulfilled]: (state, action) => {
  //     state.isLoading = false;
  //     state.items = action.payload;
  //     state.error = null;
  //   },
  //   [getContactsAction.rejected]: (state, action) => {
  //     state.isLoading = false;
  //     state.error = action.payload;
  //   },
  // },

  // Переписуем extraReducers передавая в него не {}, а ()=>
  extraReducers: builder => {
    builder
      // .addCase(getContactsAction.pending, handlePending)
      .addCase(getContactsAction.fulfilled, handleFulfilledGet)
      // .addCase(getContactsAction.rejected, handleRejected)

      // .addCase(postContactsAction.pending, handlePending)
      .addCase(postContactsAction.fulfilled, handleFulfilledPost)
      // .addCase(postContactsAction.rejected, handleRejected)

      // .addCase(deleteContactsAction.pending, handlePending)
      .addCase(deleteContactsAction.fulfilled, handleFulfilledDelete)
      // .addCase(deleteContactsAction.rejected, handleRejected)
      // Избавляемся от дубляжа кода
      .addMatcher(
        isAnyOf(
          // getContactsAction.pending,
          // postContactsAction.pending,
          // deleteContactsAction.pending
          // Избавляемся от дубляжа кода массив распыливаем, чтоб были эл
          ...getActionWithType('pending')
        ),
        handlePending
      )
      .addMatcher(
        isAnyOf(
          // getContactsAction.rejected,
          // postContactsAction.rejected,
          // deleteContactsAction.rejected
          ...getActionWithType('rejected')
        ),
        handleRejected
      );
  },
});

export const { addContact, deleteContact, setStatusFilter } =
  contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;
