import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {authenticate} from '../../store/session'
import {useParams, Link} from 'react-router-dom'
import {showFollows} from '../../store/user'
import '../Dashboard/Dashboard.css'
import LogoutButton from '../auth/LogoutButton';

const UserNav = () => {
   const me = useSelector((state) => state.session.user)
   const user = useSelector((state) => state.user.user)
   const {id} = useParams()
   let follows = useSelector((state) => state.user.follows)
   if (follows) {
      follows = follows['follow']
   }
   const dispatch = useDispatch()
   
   useEffect(() => {
      dispatch(showFollows(me.id))
   },[])

   const followThem = async(e) => {
   const user_id = me.id;
   const friend_id = user.id;
   if (user_id === friend_id) {
      return {'errors': 'you cannot follow yourself'}
   }
   const res = await fetch(`/api/users/follows`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
         user_id,
         friend_id
      })
   });
   if (res.ok) {
      const data = await res.json()
      console.log(data, 'data from follow request')
      return data
   }
}

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

   if (me && follows) {
      const followed = follows.filter((follow) => (
         follow.friend_id === user.id 
      ))
      console.log(followed, 'followed')
      links = (
         <>
         <Link to='/'>My Dashboard</Link>
         <Link to='/users'>Browse Other Users</Link>
         {me.id !== user.id && !followed.length && (
         <button type='button' onClick={followThem}>{`Follow ${user.username}`}</button>
         )}
         {followed.length && (
            <Link to={`/users/${user.id}/follows`}>Following</Link>
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