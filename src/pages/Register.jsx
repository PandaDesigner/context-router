import { useState } from 'react';
import { register } from '../config/firebase';
import { useRedirectActiveUser } from '../hooks/useRedirectActiveUser';
import { useUser } from '../context/UserContext';

export const Register = () => {
  const [userLog, setUserLog] = useState({ email: '', password: '' });
  const { user } = useUser();

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
        <form
          onSubmit={handleSubmit}
          className="form-group my-5 w-50 d-flex flex-column p-5  gap-3 bg-body-secondary rounded-4 shadow-lg  "
        >
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="form-control "
              type="text"
              placeholder="Ingrese Email"
              value={userLog.email}
              onChange={(e) =>
                setUserLog({ ...userLog, email: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              className="form-control "
              type="password"
              placeholder="Ingrese Password"
              value={userLog.password}
              onChange={(e) =>
                setUserLog({ ...userLog, password: e.target.value })
              }
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Registrate
          </button>
        </form>
      </div>
    </>
  );
};
