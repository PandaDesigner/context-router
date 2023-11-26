import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export const Home = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handlerLogin = () => {
    setUser(true);
    navigate('/dashboard');
  };

  return (
    <>
      <div className="container my-5">
        <h1 className="fs-1">Home</h1>
        <button
          className="btn btn-primary"
          onClick={() => handlerLogin()}
          type="button"
        >
          Logins
        </button>{' '}
      </div>
    </>
  );
};
