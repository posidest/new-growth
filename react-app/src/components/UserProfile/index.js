import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import UsersPlants from './UsersPlants'
import {useDispatch, useSelector} from 'react-redux'
import {showUser} from '../../store/user'
import UserNav from './UserNav'
import '../Dashboard/Dashboard.css'

const UserProfile = () => {
   const {id} = useParams();
   const dispatch = useDispatch()
   const user = useSelector((state) => state.user.user)
 
   
   useEffect(() => {
      dispatch(showUser(id))
   },[dispatch, id])
   
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
                  alt='user-avatar'
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