import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import css from './ContactForm.module.css';

import { postContactsAction } from 'redux/contacts/operations';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const { items } = useSelector(state => state.contacts);
  const dispatch = useDispatch();

  const handleChange = event => {
    const { name, value } = event.target;
    if (name === 'name') {
      setName(value);
    }
    if (name === 'number') {
      setNumber(value);
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  const handleAddContact = contact => {
    if (items.find(cont => cont.name === contact.name)) {
      return toast.error(`"${contact.name}" is already in contacts.`, {
        autoClose: 2000,
        hideProgressBar: true,
      });
    }

    dispatch(postContactsAction(contact));
  };

  const handleSubmit = event => {
    event.preventDefault();

    const contact = {
      name,
      number,
    };

    handleAddContact(contact);

    reset();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css['form-label']}>
        Name
        <input
          className={css['form-input']}
          type="text"
          placeholder="Enter name"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleChange}
        />
      </label>

      <label className={css['form-label']}>
        Number
        <input
          className={css['form-input']}
          type="tel"
          placeholder="Enter phone number"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleChange}
        />
      </label>

      <button type="submit" className={css.button}>
        Add contact
      </button>
      {/* <button
        type="button"
        className={css.button}
        onClick={() => dispatch(getContactsAction())}
      >
        Get contact
      </button> */}
    </form>
  );
};
