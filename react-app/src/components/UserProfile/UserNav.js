import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux'
import {authenticate} from '../../store/session'
import {useParams, Link} from 'react-router-dom'
import '../Dashboard/Dashboard.css'
import LogoutButton from '../auth/LogoutButton';

const UserNav = () => {
   const me = useSelector((state) => state.session.user)
   const {id} = useParams()
   let links;
   if(!me) {
      links = (
         <>
            <Link to='/users'>Browse Other Users</Link>
            <Link to='/plants/profile'>Discover Plants</Link>
            <Link to='/plants/search'>Find a Plant</Link>
         </>
         )
   }

   if (me) {
      links = (
         <>
         <Link to='/'>My Dashboard</Link>
         <Link to='/users'>Browse Other Users</Link>
         {me.id !== id && (
         <Link to={`/users/${id}/friend`}>Add Friend</Link>
         )}
         </>
      )
   }

return (
<div className ='dash-nav'>
   {links}
</div>
)

}


export default UserNav;