import { VscCircleSmallFilled } from 'react-icons/vsc';
import css from './ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContactsAction } from 'redux/contacts/operations';

export function ContactList() {
  const { filter, items } = useSelector(state => state.contacts);

  const dispatch = useDispatch();

  const filterByName = () => {
    const arr = items.filter(el =>
      el.name.toLowerCase().includes(filter.trim().toLowerCase())
    );
    return arr;
  };

  let currentContacts = [];

  if (filter === '') {
    currentContacts = items;
  } else currentContacts = filterByName();

  const handleDeleteContact = contactId => {
    dispatch(deleteContactsAction(contactId));
  };

  return (
    <ul className={css['list-wraper']}>
      {currentContacts.map(({ id, name, number }) => {
        return (
          <li key={id} className={css['list-item']}>
            <VscCircleSmallFilled />
            <p>
              {name}: {number}
            </p>
            <button
              type="button"
              className={css['list-button']}
              onClick={() => handleDeleteContact(id)}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
}
