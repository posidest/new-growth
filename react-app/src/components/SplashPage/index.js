import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import './SplashPage.css'

const SplashPage = ({authenticated}) => {
   
   return (
      <div className='splash'>
         <div className='center'>
            <h1>new growth</h1>
            <p>how does your garden grow?</p>
         </div>
         <div className='auth-btns'>
            <div className='login'>
               <NavLink to="/login" exact={true} activeClassName="active">
                  Login
               </NavLink>
            </div>
            <div className='sign-up'>
               <NavLink to="/sign-up" exact={true} activeClassName="active">
                  Sign Up
               </NavLink>
            </div>
         </div>
      </div>
   )
}


export default SplashPage;