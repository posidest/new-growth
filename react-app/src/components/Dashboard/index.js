import React, {useState, useEffect} from 'react';
import {authenticate} from '../../store/session'
import {Link, Redirect} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import UsersPlants from './UsersPlants'
import './Dashboard.css'

const Dashboard = () => {
   const dispatch = useDispatch()
   const [me, setMe] = useState(null)

   useEffect(async() => {
      const user = await dispatch(authenticate())
      // await console.log(user)
      await setMe(user)
      return me
   }, [])


   const addPlant = (e) => {
      return <Redirect to='/plants/new'/>
   }


   if (me) {
      return (
      <>
         <div className='dash'>
            <div 
            className='dash-nav'>
               <h4 onClick={addPlant}>
               Add A Plant
               </h4>
            </div>
            <div 
            className='user-info'
            style={{marginTop: '100px'}}>
               <img src={me.avatar}
               style={{width:'200px', height:'200px', borderRadius: '50%'}}
               />
               <h4>{me.username}</h4>
               <p>{me.bio}</p>
               <p>{`USDA Zone: ${me.zone}`}</p>
            </div>
            <div className='plants'>
               <UsersPlants />
            </div>
         </div>
      </>
      )
   } else {
      return (
      <h1>Loading...</h1>
      )
   }

   }



export default Dashboard