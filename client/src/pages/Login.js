import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { Box, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlobalContext from '../utils/context/GlobalContext';
import FormLogin from '../components/form/form-login';
import { authApi } from '../utils/requests/requests';

export const Login = () => {
  const { status, setStatus, userInfo, setUserInfo } = useContext(GlobalContext);
  let navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onFormSubmit = async (values) => {
    authApi('login', { ...values })
      .then(res => {
        localStorage.setItem('token', res.token);
        setStatus({ ...status, isAuth: true });
        setUserInfo({...userInfo, firstName: res.firstName, lastName: res.lastName, userId: res._id});
        if (res.role === 'ADMIN') {
          setStatus({ ...status, isAdmin: true });
        }
        navigate('/');
      }).catch(error => {
        toast.error(error.message, { position: 'top-right' });
      })
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      my={10}
    >
      <ToastContainer />
      <Typography variant="h6" my={2}>Welcome Back!</Typography>
      <FormLogin
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        onFormSubmit={onFormSubmit}
      />
      <Typography my={2} fontSize={13}>Don't have an account ? <Link to="/register">Sign Up</Link></Typography>
    </Box>
  );
}