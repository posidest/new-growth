import React, {useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'
import {showProfiles} from '../../store/profile'
import {login} from '../../store/session'
import ProfilePic from './ProfilePic'

const NavBar = () => {
  const dispatch = useDispatch()
  let buttons;

  useEffect(() => {
    dispatch(showProfiles())
    },[dispatch])

  
  const loginDemo = (e) => {
    e.preventDefault();
    const demoUser = dispatch(login('demo@aa.io', 'password'));
    return demoUser;
  }

  const me = useSelector((state) => state.session.user)


  if (me) {
    buttons = (
      <>
        <div className='home-btn'>
          <NavLink to="/" exact={true} activeClassName="active">
            <i className="fas fa-seedling fa-2x"
            style={{color: 'rgba(8, 32, 16, 0.7)'}}
            ></i>
          </NavLink>
        </div>
        <div className='navatar'>
          <ProfilePic />
        </div>
        <div className='logout-btn'>
          <LogoutButton />
        </div>
      </>
    )
  }

  if (!me) {
    buttons = (
      <>
        <div className='home-btn'>
          <NavLink to="/" exact={true} activeClassName="active">
            <i className="fas fa-seedling fa-2x"
            style={{color: 'rgba(8, 32, 16, 0.6)'}}
            ></i>
          </NavLink>
        </div>
        <div className='auth-btns'>
          <div className='demo-btn'>
            <button type='button' onClick= {loginDemo} style={{backgroundColor: 'white'}}>Demo</button>
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
        </div>
      </>
    )
  }
  return (
    <nav className='nav-bar'>
      {buttons}
    </nav>
  );
}

export default NavBar;