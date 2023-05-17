import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { refreshUser } from 'redux/Auth/operations';
import { selectIsRefreshing } from 'redux/Auth/selectors';

import { Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from 'pages/LoginPage';
import RegisterPage from 'pages/RegisterPage';
import ContactsPage from 'pages/ContactsPage';
import Header from 'components/Header';

import { PrivateRoute } from 'components/PrivateRoute';
import { RestrictedRoute } from 'components/RestrictedRoute';

import { Container } from '@mui/material';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// const LoginPage = lazy(() => import('pages/LoginPage'));
// const RegisterPage = lazy(() => import('pages/RegisterPage'));
// const ContactsPage = lazy(() => import('pages/ContactsPage'));
// const Header = lazy(() => import('components/Header'));

export const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route
            path="/login"
            element={
              <RestrictedRoute
                redirectTo="/contacts"
                component={<LoginPage />}
              />
            }
          />
          <Route
            path="/register"
            element={
              <RestrictedRoute
                redirectTo="/contacts"
                component={<RegisterPage />}
              />
            }
          />
          <Route
            path="/contacts"
            element={
              <PrivateRoute redirectTo="/login" component={<ContactsPage />} />
            }
          />
          <Route path="*" element={<h1>Wrong URL</h1>} />
        </Routes>
        <ToastContainer />
      </Container>
    </>
  );
};
