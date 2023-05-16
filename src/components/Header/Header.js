import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsLoggedIn, selectUser } from 'redux/Auth/selectors';
import { logoutUser } from 'redux/Auth/operations';

export const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            noWrap
            component={NavLink}
            to="/contacts"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Names&Numbers
          </Typography>
          {!isLoggedIn ? (
            <div>
              <Button component={NavLink} to="/login" color="inherit">
                Login
              </Button>
              <Button component={NavLink} to="/register" color="inherit">
                sign up
              </Button>
            </div>
          ) : (
            <div>
              <Typography component="span" mr={2}>
                Welcome, {user.name ?? user}!
              </Typography>
              <Button
                variant="outlined"
                type="button"
                color="inherit"
                onClick={() => dispatch(logoutUser())}
              >
                Logout
              </Button>
            </div>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
