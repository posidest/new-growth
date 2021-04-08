import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import {useSelector} from 'react-redux';
import './SplashPage.css'
import Dashboard from '../Dashboard'
import Animation from './Animation'

const SplashPage = () => {
   const me = useSelector((state) => state.session.user)
   
   if (me) {
      return <Dashboard />
   }
   
   return (
      <div className='splash'>
         <div className='center'>
            <h1>new growth</h1>
            {/* <p>how does your garden grow?</p> */}
            {/* <p>learn, share, tend, grow.</p> */}
            <div className='animation'>
               <Animation />
            </div>
            {/* <div className='auth-btns'>
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
            </div> */}
         </div>
      </div>
   )
}


export default SplashPage;