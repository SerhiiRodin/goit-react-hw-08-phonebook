import { Box, TextField, Button, Typography } from '@mui/material';

export const FormBase = ({ fields, title, onSubmit, btnLabel = 'Submit' }) => {
  const handleSubmit = e => {
    e.preventDefault();
    const formEls = e.target.elements;
    const dataFields = fields.map(field => field.name);

    let data = {};

    dataFields.map(fieldname => (data[fieldname] = formEls[fieldname].value));

    onSubmit(data);

    e.target.reset();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        padding: '15px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      {title && <Typography variant="h5">{title}</Typography>}
      {fields.map(({ name, type, label }) => (
        <TextField
          key={name}
          name={name}
          type={type}
          label={label}
          variant="outlined"
          autoComplete="true"
          sx={{ width: '100%' }}
        />
      ))}
      <Button type="submit" variant="contained" sx={{ minWidth: '150px' }}>
        {btnLabel}
      </Button>
    </Box>
  );
};
