import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux'
import {authenticate} from '../../store/session'
import {NavLink, Link} from 'react-router-dom'
import './Dashboard.css'

const DashNav = ({authenticated}) => {
   // const me = useSelector((state) => state.session.user)
return (
<div className ='dash-nav'>
   <Link to='/plants/profile'>
      Discover Plants
   </Link>
   <Link to='/plants/new'>
      Add a Plant
   </Link>
   <Link to='/plants/find'>
      Find a Plant
   </Link>
</div>
)

}


export default DashNav;