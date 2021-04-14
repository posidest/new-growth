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
            <div className='animation'>
               <Animation />
            </div>
         </div>
      </div>
   )
}


export default SplashPage;