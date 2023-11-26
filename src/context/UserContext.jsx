import { createContext, useContext, useEffect, useState } from 'react';

/*SECTION - firebase config */
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (users) => {
      console.log(users);
      setUser(users);
    });

    return unsuscribe;
  }, []);

  if (user === false)
    return (
      <div className="vh-100 w-100 d-flex justify-content-center align-items-center  ">
        <h1>Loading...</h1>
      </div>
    );

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export const useUser = () => useContext(UserContext);
