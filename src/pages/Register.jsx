import { useState } from 'react';
import { register } from '../config/firebase';
import { useRedirectActiveUser } from '../hooks/useRedirectActiveUser';
import { useUser } from '../context/UserContext';
import { Formik } from 'formik';
import * as Yup from 'yup';

export const Register = () => {
  const [userLog, setUserLog] = useState({ email: '', password: '' });
  const { user } = useUser();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email no válido').required('Email Requerido'),
    password: Yup.string()
      .trim()
      .min(6, 'MInimo 6 Carácteres')
      .required('Password Requerido')
  });

  useRedirectActiveUser(user, '/dashboard');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const credentialUser = await register(userLog);
      console.log(credentialUser);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (values, { setSubmitting, setErrors, restForm }) => {
    try {
      const credentialUser = await register(values);
      console.log(credentialUser);
      restForm();
    } catch (error) {
      console.log(error);
      if (error.code === 'auth/email-already-in-use') {
        setErrors({
          email: 'Email ya registrado'
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div
        className="container my-5  "
        style={{
          height: '70vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }}
      >
        <h1 className="fs-1">Registro</h1>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            isSubmitting,
            errors,
            touched,
            handleBlur
          }) => {
            return (
              <form
                onSubmit={handleSubmit}
                className="form-group my-5 w-50 d-flex flex-column p-5  gap-3 bg-body-secondary rounded-4 shadow-lg  "
              >
                <div>
                  <label htmlFor="email">Email</label>
                  <input
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
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  Registrate
                </button>
              </form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};
