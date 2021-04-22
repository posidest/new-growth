import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux'
import {authenticate} from '../../store/session'
import {NavLink, Link} from 'react-router-dom'
import './Dashboard.css'
import LogoutButton from '../auth/LogoutButton';

const DashNav = () => {
return (
<div className ='dash-nav'>
   <Link to='/plants/profile'>
      Discover Plants
   </Link>
   <Link to='/plants/new'>
      Add a Plant
   </Link>
   <Link to='/plants/search'>
      Find a Plant
   </Link>
   <Link to='/users'>
      Discover Users
   </Link>
</div>
)

}


export default DashNav;