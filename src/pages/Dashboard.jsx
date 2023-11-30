import { Button } from '@mui/material';
import { logout } from '../config/firebase';

export const Dashboard = () => {
  const handlerLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container my-5 h-75 ">
        <h1>Dashboard</h1>
        <Button variant="contained" color="warning" onClick={handlerLogout}>
          Logout
        </Button>
      </div>
    </>
  );
};
