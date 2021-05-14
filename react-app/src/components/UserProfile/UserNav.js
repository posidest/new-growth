import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {useParams, Link} from 'react-router-dom'
import {showFollows, unfollow, newFollow} from '../../store/user'
import '../Dashboard/Dashboard.css'


const UserNav = () => {
   const [following, setFollowing] = useState(false)
   const [loaded, setLoaded] = useState(false)

   const dispatch = useDispatch()
   const {id} = useParams()
   const me = useSelector((state) => state.session.user)
   const user = useSelector((state) => state.user.user)
   let followed = null;

   let follows = useSelector((state) => state.user.follows)
   // if (follows) {
   //    followed = follows.filter((follow) => (
   //       follow.friend_id === user.id 
   //    ))
   //    if (followed) {
   //       followed = followed[0]
   //     }
   //    }

   if (follows) {
   followed = follows.filter((follow) => (
      follow.friend_id === user.id 
   ))
   if (followed.length > 0) {
      followed = followed[0]
      // setFollowing(true)
    }
   }
   // useEffect(() => {
   // }, [dispatch, following, follows])


   useEffect(() => {
      dispatch(showFollows(me.id))
   },[following, me])

   const followThem = async(e) => {
      // e.preventDefault()
      const user_id = me.id;
      const friend_id = user.id;
      dispatch(newFollow({user_id, friend_id}))
      // if (user_id === friend_id) {
      //    return {'errors': 'you cannot follow yourself'}
      // }
      // const res = await fetch(`/api/users/follows`, {
      //    method: 'POST',
      //    headers: {'Content-Type': 'application/json'},
      //    body: JSON.stringify({
      //       user_id,
      //       friend_id
      //    })
      // });
      // if (res.ok) {
      //    const data = await res.json()
      //    console.log(data, 'data from follow request')
         setFollowing(true)
         // return data
      }

   const unFollow = async(e) => {
      // e.preventDefault()
      dispatch(unfollow(followed.id))
      // const selectedId = e.target.id;
      // const user_id = me.id;
      // const friend_id = user.id;
      // const res = await fetch(`/api/users/follows/${followed.id}`, {
      //    method: 'DELETE',
      //    headers: {'Content-Type': 'application/json'}
      // })
      // if (res.ok) {
      //    const data = await res.json()
      //    await setFollowing(false)
      //    return data
      // }
      setFollowing(false)
   }

   let links;
   if(!me) {
      links = (
         <>
            <Link to='/users'>Browse Other Users</Link>
            <Link to='/plants/profile'>Discover Plants</Link>
            <Link to='/plants/search'>Find a Plant</Link>
            <Link to={`/plants/zone/${user.zone}`}>Other Users in this Zone</Link>
         </>
         )
   }

   if (me && follows) {
      links = (
         <>
         <Link to='/'>My Dashboard</Link>
         <Link to='/users'>Browse Other Users</Link>
         {me.id !== user.id && !followed && (
         <button 
         type='button' 
         onClick={followThem}
            style={{
               color: 'white', 
               background: 'transparent', 
               border: 'none', 
               // fontWeight: 'lighter', 
               boxShadow: 'none'
               }}
               >{`Follow ${user.username}`}
               </button>
         )}
         {followed && (
            <>
            <Link to={`/users/${user.id}/follows`}>Following</Link>
            <button 
            type='button' 
            onClick={unFollow} 
            id={followed.id}
            style={{
               color: 'white', 
               background: 'transparent', 
               border: 'none', 
               // fontWeight: 'lighter', 
               boxShadow: 'none'
               }}>
               {`Unfollow ${user.username}`}
               </button>
            </>
         )}
         </>
      )
   }
   if (user) {
      return (
      <div className ='dash-nav'>
         {links}
      </div>
      )
   } else {
      return (
      <h1>Loading...</h1>
      )
   }
}



export default UserNav;