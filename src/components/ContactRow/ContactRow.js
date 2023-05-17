import { Button, TableCell, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/Phonebook/operations';

export const ContactRow = ({ contact: { id, name, number } }) => {
  const dispatch = useDispatch();

  return (
    <TableRow
      hover={true}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell>{name}</TableCell>
      <TableCell align="center">{number}</TableCell>
      <TableCell align="right">
        <Button onClick={() => dispatch(deleteContact(id))}>
          <div>
            <DeleteIcon fontSize="medium" />
          </div>
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default ContactRow;
