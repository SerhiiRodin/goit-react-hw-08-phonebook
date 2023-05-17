import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchContacts } from 'redux/Phonebook/operations';
import { selectContacts, selectFilter } from 'redux/Phonebook/selectors';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
} from '@mui/material';
import PacmanLoader from 'react-spinners/PacmanLoader';
import { ContactRow } from 'components/ContactRow/ContactRow';

export const ContactsTable = () => {
  const dispatch = useDispatch();
  const { items: contacts, isLoading, error } = useSelector(selectContacts);
  const filter = useSelector(selectFilter);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const visibleContacts = contacts
    .filter(contact =>
      contact?.name?.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((p, n) => p.name.localeCompare(n.name));

  if (isLoading) {
    return <PacmanLoader color="#29b6f6" />;
  }

  if (error) {
    return (
      <Alert variant="filled" severity="error">
        Sorry, something went wrong...
      </Alert>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#efefef' }}>
            <TableCell> Name </TableCell>
            <TableCell align="center"> Number </TableCell>
            <TableCell align="center"> Actions </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {visibleContacts.map(contact => (
            <ContactRow key={contact.id} contact={contact} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ContactsTable;
