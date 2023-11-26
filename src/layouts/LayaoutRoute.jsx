import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';

export const LayaoutRoute = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <p className="text-center bg-dark text-white py-4 fw-light fs-3 ">
        footer
      </p>
    </>
  );
};
