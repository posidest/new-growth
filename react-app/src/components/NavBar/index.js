import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'
import ctenanthe from '../../images/Ctenanthe.jpg'
import ProfileButton from './ProfileDropdown'

const NavBar = ({ setAuthenticated }) => {
  return (
    <nav className='nav-bar'>
        <div className='home-btn'>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </div>
        <div className='login-btn'>
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </div>
        <div className='sign-up-btn'>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </div>
        <div className='users-btn'>
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
        </div>
        {/* <div className='log-out-btn'>
          <LogoutButton setAuthenticated={setAuthenticated} />
        </div> */}
        <div className='navatar'>
        <ProfileButton />
        </div>
    </nav>
  );
}

export default NavBar;