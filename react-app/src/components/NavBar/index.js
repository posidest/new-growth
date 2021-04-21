import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'
import {showProfiles} from '../../store/profile'
import ctenanthe from '../../images/Ctenanthe.jpg'
import ProfilePic from './ProfilePic'
import SearchBar from '../SearchBar'

const NavBar = () => {
  const dispatch = useDispatch()
  let buttons;

  useEffect(() => {
    dispatch(showProfiles())
    },[])

  
  const me = useSelector((state) => state.session.user)


  if (me) {
    buttons = (
      <>
        <div className='home-btn'>
          <NavLink to="/" exact={true} activeClassName="active">
            {/* <i className="fas fa-leaf fa-2x" */}
            <i className="fas fa-seedling fa-2x"
            style={{color: 'rgba(8, 32, 16, 0.7)'}}
            // style={{color: 'rgb(230, 233, 231)'}}
            // style={{color: 'rgb(156, 166, 159)'}}
            // style={{color: 'white'}}
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
            {/* <i className="fas fa-leaf fa-2x" 
            style={{color: 'rgba(8, 32, 16, 0.6)'}} */}
            {/* // style={{color: 'white'}} */}
            <i className="fas fa-seedling fa-2x"
            style={{color: 'rgba(8, 32, 16, 0.6)'}}
            // style={{color: 'white'}}
            ></i>
          </NavLink>
        </div>
        <div className='auth-btns'>
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