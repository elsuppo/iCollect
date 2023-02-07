import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { Box, Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlobalContext from '../utils/context/GlobalContext';
import { FieldFirstName, FieldLastName, FieldEmail, FieldPassword } from '../components/form/TextFields';
import { authApi } from '../utils/requests/requests';

function Registration() {
  const { status, setStatus } = useContext(GlobalContext);
  let navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onFormSubmit = async (values) => {
    authApi('register', { ...values })
      .then(res => {
        localStorage.setItem('token', JSON.stringify(res.token));
        setStatus({ ...status, isAuth: true, id: res._id });
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
      <Box my={2}>
        <p className="h5">Create An Account</p>
      </Box>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Box my={2}>
          <FieldFirstName
            register={register}
            errors={errors}
          />
        </Box>
        <Box my={2}>
          <FieldLastName
            register={register}
            errors={errors}
          />
        </Box>
        <Box my={2}>
          <FieldEmail
            register={register}
            errors={errors}
          />
        </Box>
        <Box my={2}>
          <FieldPassword
            register={register}
            errors={errors}
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          fullWidth>Create an Account</Button>
      </form>
      <Box my={2}>
        Already have an account? <Link to="/login"> Log In </Link>
      </Box>
    </Box>
  );
}

export default Registration;