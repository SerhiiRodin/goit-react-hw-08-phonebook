import { useDispatch } from 'react-redux';

import { registerUser } from 'redux/Auth/operations';

import { FormBase } from 'components/FormBase/FormBase';

import { Box } from '@mui/material';

const registerFormFields = [
  { name: 'name', type: 'text', label: 'Name' },
  { name: 'email', type: 'email', label: 'Email Address' },
  { name: 'password', type: 'password', label: 'Password' },
];

export const RegisterForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = data => {
    dispatch(registerUser(data));
  };

  return (
    <Box
      sx={{
        paddingTop: '20px',
        marginX: 'auto',
        width: '500px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <FormBase
        fields={registerFormFields}
        title="Join our service!"
        onSubmit={handleSubmit}
        btnLabel="Register"
      />
    </Box>
  );
};

export default RegisterForm;
