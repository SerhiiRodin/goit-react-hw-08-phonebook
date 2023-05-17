import { TextField } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from 'redux/Phonebook/phonebookSlices';
import { selectFilter } from 'redux/Phonebook/selectors';

export const Filter = () => {
  const dispatch = useDispatch();
  const value = useSelector(selectFilter);

  return (
    <TextField
      value={value}
      onChange={({ target: { value } }) => dispatch(setFilter(value))}
      variant="outlined"
      placeholder="search"
      sx={{ width: '40%' }}
    />
  );
};

export default Filter;
