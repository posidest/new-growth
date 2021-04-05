import React, {useState, useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux'
import UsersPlants from './UsersPlants'
import DashNav from './DashNav'
import './Dashboard.css'

const Dashboard = () => {
 
   const me = useSelector((state) => state.session.user)

   const addPlant = (e) => {  
      return <Redirect to='/plants/new'/>
   }

   if (me) {
      return (
      <>
         <div>
            <DashNav me={me}/>   
         </div>
         <div className='dash'>
            <div 
            className='user-info'
            // style={{marginTop: '100px'}}
            >
               <img src={me.avatar}
               style={{width:'250px', height:'250px', borderRadius: '50%'}}
               />
               <h4>{me.username}</h4>
               <p>{me.bio}</p>
               <p>{`USDA Zone: ${me.zone}`}</p>
            </div>
            <div className='users-plants-container'>
               <UsersPlants />
            </div>
         </div>
      </>
      )
   } else {
      return (
      <h1>Loading...</h1>
      )
   }}



export default Dashboard