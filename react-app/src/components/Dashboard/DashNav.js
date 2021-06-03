import React from 'react';
import {Link} from 'react-router-dom'
import './Dashboard.css'

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