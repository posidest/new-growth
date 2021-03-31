import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'

const NavBar = ({ setAuthenticated }) => {
  return (
    <nav className='nav-bar'>
        <div>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </div>
        <div>
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </div>
        <div>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </div>
        <div>
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
        </div>
        <div className='log-out'>
          <LogoutButton setAuthenticated={setAuthenticated} />
        </div>
    </nav>
  );
}

export default NavBar;