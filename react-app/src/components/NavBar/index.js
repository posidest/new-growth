import React from 'react';
import { NavLink } from 'react-router-dom';
// import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'
import ctenanthe from '../../images/Ctenanthe.jpg'
import ProfileButton from './ProfileDropdown'

const NavBar = ({ authenticated, setAuthenticated }) => {
  return (
    <nav className='nav-bar'>
        <div className='home-btn'>
          <NavLink to="/" exact={true} activeClassName="active">
            <i className="fas fa-leaf fa-2x" style={{color: 'rgba(8, 32, 16, 0.6)'}}></i>
          </NavLink>
        </div>
        {/* <div className='login-btn'>
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </div>
        <div className='sign-up-btn'>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </div> */}
        {/* <div className='users-btn'>
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
        </div> */}
        {/* <div className='log-out-btn'>
          <LogoutButton setAuthenticated={setAuthenticated} />
        </div> */}
        <div className='navatar'>
        <ProfileButton authenticated={authenticated} setAuthenticated={setAuthenticated}/>
        </div>
    </nav>
  );
}

export default NavBar;