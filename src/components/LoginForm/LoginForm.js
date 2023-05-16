import { useDispatch } from 'react-redux';

import { loginUser } from 'redux/Auth/operations';

import { Box } from '@mui/material';
import { FormBase } from 'components/FormBase/FormBase';

const loginFormFields = [
  { name: 'email', type: 'email', label: 'Email Address' },
  { name: 'password', type: 'password', label: 'Password' },
];

export const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = data => {
    dispatch(loginUser(data));
  };

  return (
    <Box
      sx={{
        paddingTop: '20px',
        marginX: 'auto',
        width: '500px',
      }}
    >
      <FormBase
        fields={loginFormFields}
        title="Please, enter your details."
        onSubmit={handleSubmit}
        btnLabel="Login"
      />
    </Box>
  );
};

export default LoginForm;
