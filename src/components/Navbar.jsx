import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export const Navbar = () => {
  const [toggle, setToggle] = useState(true);

  console.log(useUser());

  const { user, setUser } = useUser();

  return (
    <nav className="navbar navbar-expand-lg bg-dark bg-gradiente text-white">
      <div className="container-fluid justify-content-between  ">
        <NavLink className="navbar-brand link-light fw-bold " to={'/'}>
          Navbar
        </NavLink>
        <button
          className="navbar-toggler border border-info-subtle "
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="true"
          aria-label="Toggle navigation"
          onClick={() => setToggle(!toggle)}
        >
          <span className="navbar-toggler-icon "></span>
        </button>
        <div
          className={`${toggle && 'collapse'} navbar-collapse`}
          id="navbarNav"
        >
          <ul className="navbar-nav nav-pills gap-4">
            <li className="nav-item">
              <NavLink
                className="nav-link link-light fw-lighter "
                aria-current="page"
                to={'/'}
              >
                Home
              </NavLink>
            </li>
            {user && (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link link-light fw-lighter "
                    to={'/dashboard'}
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button
                    onClick={() => {
                      setUser(false);
                    }}
                    className="btn btn-outline-warning "
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
