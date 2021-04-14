import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import UsersPlants from './UsersPlants'
import {useDispatch, useSelector} from 'react-redux'
import {showUser} from '../../store/user'
import UserNav from './UserNav'
import '../Dashboard/Dashboard.css'

const UserProfile = () => {
   const {id} = useParams();
   // const[user, setUser] = useState(null)
   const dispatch = useDispatch()
   
   useEffect(() => {
      dispatch(showUser(id))
   },[])
   
   const me = useSelector((state) => state.session.user)
   const user = useSelector((state) => state.user.user)
   


//    const getUser = async(id) => {
//    const res = await fetch(`/api/users/${id}`)
//    if (res.ok) {
//       const data = await res.json()
//       // console.log(data, 'data from user thunk')
//       // dispatch(getUser(data))
//       await setUser(data)
//       return user
//    }
// }

   // useEffect(async() => {
   //    await getUser(id)
   // },[])

      if(user) {
         return (
         <div className='dashboard'>
            <div>
               <UserNav/>   
            </div>
            <div className='dash'>
               <div 
               className='user-info'
               >
                  <img src={user.avatar}
                  style={{width:'200px', height:'200px', borderRadius: '50%'}}
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