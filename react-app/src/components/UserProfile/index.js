import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import UsersPlants from './UsersPlants'
import {useDispatch, useSelector} from 'react-redux'
import {showUser, showFollows} from '../../store/user'
import UserNav from './UserNav'
import '../Dashboard/Dashboard.css'

const UserProfile = () => {
   const {id} = useParams();
   // const[user, setUser] = useState(null)
   const dispatch = useDispatch()
   const me = useSelector((state) => state.session.user)
   const user = useSelector((state) => state.user.user)
   let follows = useSelector((state) => state.user.follows) 
   if (follows) {
      follows = follows['follow']
   }
   
   useEffect(() => {
      dispatch(showUser(id))
   },[])

   useEffect(() => {
      dispatch(showFollows(me.id))
   },[])
   
      if(user) {
         return (
         <div className='dashboard'>
            <div>
               <UserNav />   
            </div>
            <div className='dash'>
               <div className='user-info'>
                  <img src={user.avatar}
                  style={{width:'200px', height:'200px', borderRadius:'50%'}}
                  />
                  <h4>{user.username}</h4>
                  <p>{user.bio}</p>
                  <p className='zone-info'>{`USDA Zone: ${user.zone}`}</p>
               </div>
               <div className='users-plants-container'>
                  <UsersPlants userId={id}/>
               </div>
            </div>
         </div>
         )
      } else {
         return (
         <h1>Loading...</h1>
         )
      }
   }

export default UserProfile