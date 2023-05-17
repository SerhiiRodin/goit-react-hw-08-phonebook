import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

import { ContactsTable } from 'components/ContactsTable/ContactsTable';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { Filter } from 'components/Filter/Filter';
import { AddContactForm } from 'components/AddContactForm/AddContactForm';

export const ContactsPage = () => {
  const [isContactFormShown, setIsContactFormShown] = useState(false);

  return (
    <Box paddingY={2} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          disabled={isContactFormShown}
          onClick={() => setIsContactFormShown(true)}
        >
          <AddCircleOutlineIcon fontSize="medium" />
          <Typography variant="h5" ml={1}>
            Add contact
          </Typography>
        </Button>
        <Filter />
      </Box>
      {isContactFormShown && (
        <AddContactForm onClose={() => setIsContactFormShown(false)} />
      )}
      <ContactsTable />
    </Box>
  );
};

export default ContactsPage;
