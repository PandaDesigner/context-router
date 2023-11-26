import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useEffect } from 'react';

export const LayoutPrivate = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user]);

  return (
    <>
      <Outlet />
    </>
  );
};
