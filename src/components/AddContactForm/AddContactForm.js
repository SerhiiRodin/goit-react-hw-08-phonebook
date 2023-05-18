import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/Phonebook/operations';
import { selectContacts } from 'redux/Phonebook/selectors';
import { Box, Button, TextField } from '@mui/material';
import { AddCircleOutline, CloseOutlined } from '@mui/icons-material';
import Tooltip from '@mui/material/Tooltip';

export const AddContactForm = ({ onClose }) => {
  const dispatch = useDispatch();

  const { items } = useSelector(selectContacts);

  const handleSubmit = e => {
    e.preventDefault();

    const data = {
      name: e.target.elements.name.value,
      number: e.target.elements.number.value,
    };

    if (
      items.find(item => item.name.toLowerCase() === data.name.toLowerCase())
    ) {
      return alert(`${data.name} is already in contacts.`);
    }

    dispatch(addContact(data));

    e.target.reset();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        gap: 1,
        borderRadius: '10px',
      }}
    >
      <TextField
        name="name"
        type="text"
        label="Name"
        variant="outlined"
        autoComplete="true"
        sx={{ width: '100%' }}
      />
      <TextField
        name="number"
        type="tel"
        label="Number"
        variant="outlined"
        autoComplete="true"
        sx={{ width: '100%' }}
      />
      <Tooltip title="Add Contact">
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: '#26a69a',
            '&:hover': {
              backgroundColor: '#00796b',
            },
          }}
        >
          <AddCircleOutline />
        </Button>
      </Tooltip>

      <Tooltip title="Hide panel">
        <Button
          type="button"
          variant="contained"
          onClick={onClose}
          sx={{
            backgroundColor: '#26a69a',
            '&:hover': {
              backgroundColor: '#00796b',
            },
          }}
        >
          <CloseOutlined />
        </Button>
      </Tooltip>
    </Box>
  );
};

export default AddContactForm;
