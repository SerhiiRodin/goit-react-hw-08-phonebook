import css from './Container/Container.module.css';

import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContactsAction } from 'redux/contacts/operations';
import { ToastContainer } from 'react-toastify';


export const App = () => {
  const dispatch = useDispatch();
  const { items, isLoading, error } = useSelector(state => state.contacts);

  useEffect(() => {
    dispatch(getContactsAction());
  }, [dispatch]);

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      {isLoading && <h2>Loading...</h2>}
      {items.length === 0 && !error && !isLoading && <h2>No contacts.</h2>}
      {error && <h2>Server problems, try later</h2>}
      {items.length !== 0 && (
        <>
          <Filter />
          <ContactList />
        </>
      )}
      
      <ToastContainer />
    </div>
  );
};
