import css from './Filter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setStatusFilter } from 'redux/contacts/contactsSlice';

export function Filter() {
  const { filter } = useSelector(state => state.contacts);
  const dispatch = useDispatch();

  const updateFilter = date => {
    dispatch(setStatusFilter(date));
  };

  return (
    <label className={css['form-label']}>
      Find contacts by name
      <input
        className={css['form-input']}
        type="text"
        name="name"
        value={filter}
        onChange={e => {
          updateFilter(e.currentTarget.value.trim());
        }}
      />
    </label>
  );
}
