import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { login } from '../config/firebase';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Box, Typography } from '@mui/material';

export const Logins = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user]);

  const onSubmit = async (
    { email, password },
    { setSubmitting, setErrors, resetForm }
  ) => {
    console.log({ email, password });
    try {
      const credentialUser = await login({ email, password });
      console.log(credentialUser);
      resetForm();
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
      if (error.code === 'auth/invalid-login-credentials') {
        return setErrors({
          email: 'Usuario no Registrado'
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email no válido').required('Email Requerido'),
    password: Yup.string()
      .trim()
      .min(6, 'MInimo 6 Carácteres')
      .required('Password Requerido')
  });

  return (
    <>
      <Box
        className="container"
        sx={{
          height: '70vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }}
      >
        <Typography variant="h2" fontWeight={500}>
          Login
        </Typography>

        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({
            values,
            handleSubmit,
            handleChange,
            errors,
            touched,
            handleBlur,
            isSubmitting
          }) => {
            return (
              <form
                onSubmit={handleSubmit}
                className="form-group my-5 w-50 d-flex flex-column p-5  gap-3 bg-body-secondary rounded-4 shadow-lg  "
              >
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    className="form-control "
                    type="text"
                    placeholder="Ingrese Email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  {errors.email && touched.email && (
                    <div className="alert alert-danger mt-2 p-2" role="alert">
                      {errors.email}
                    </div>
                  )}
                </div>
                <div>
                  <label htmlFor="password">Password</label>
                  <input
                    name="password"
                    className="form-control "
                    type="password"
                    placeholder="Ingrese Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password && (
                    <div className="alert alert-danger mt-2 p-2" role="alert">
                      {errors.password}
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                >
                  Login
                </button>
              </form>
            );
          }}
        </Formik>
      </Box>
    </>
  );
};
