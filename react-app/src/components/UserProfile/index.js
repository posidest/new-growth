import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import UsersPlants from '../Dashboard/UsersPlants'

const UserProfile = () => {
 
      return (
      <div className='dashboard'>
         <div>
            <DashNav me={me}/>   
         </div>
         <div className='dash'>
            <div 
            className='user-info'
            >
               <img src={me.avatar}
               style={{width:'200px', height:'200px', borderRadius: '50%'}}
               />
               <h4>{me.username}</h4>
               <p>{me.bio}</p>
               <p className='zone-info'>{`USDA Zone: ${me.zone}`}</p>
            </div>
            <div className='users-plants-container'>
               <UsersPlants />
            </div>
         </div>
      </div>
      )
   } else {
      return (
      <h1>Loading...</h1>
      )
   }}
   )
}



export default UserProfile