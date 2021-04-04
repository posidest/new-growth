import React, {useState, useEffect} from 'react';
import {authenticate} from '../../store/session'
import {NavLink, Link} from 'react-router-dom'
import './Dashboard.css'

const DashNav = ({authenticated, setAuthenticated}) => {
return (
<div className ='dash-nav'>
   <Link to='/plants/profile'>
      Discover Plants
   </Link>
   <Link exact to='/plants/new'>
      Add a Plant
   </Link>
   <Link exact to='/plants/find'>
      Find a Plant
   </Link>
</div>
)

}


export default DashNav;