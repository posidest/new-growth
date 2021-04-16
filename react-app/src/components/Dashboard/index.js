import React, {useState, useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import MyPlants from './MyPlants'
import {showProfiles} from '../../store/profile'
import {showFollows} from '../../store/user'
import DashNav from './DashNav'
import './Dashboard.css'

const Dashboard = () => {
   // const [loaded, setLoaded] = useState(false)
   const me = useSelector((state) => state.session.user)
   const dispatch = useDispatch()
   let follows = useSelector((state) => state.user.follows)
   if (follows) {
      follows = follows['follow']
      // setLoaded(true)
   }

   useEffect(() => {
      dispatch(showProfiles())
      // setLoaded(true)
   },[])
   
   // useEffect(() => {
      dispatch(showFollows(me.id))
      // },[])

   const getUser = async(id) => {
      const res = await fetch(`/api/users/${id}`)
      if (res.ok) {
         const data = await res.json()
         return data;
      }
   }

   let following = [];
 
   if (follows) {
          follows.forEach(async(follow) => {
         let friend = await getUser(follow.friend_id)
         await following.push(friend) 
      })
      console.log(following, 'following')
   }
   if (me) { return (
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
            <div className='following'>
               {following && following.map((friend) => (
                  <div key={friend.id}>
                     {console.log('friend')}
                     <Link to={`/users/${friend.id}`}>
                        <img src={friend.avatar} 
                        alt='avatar' 
                        style={{height: '100px', width: '100px', borderRadius: '50%'}}/>
                        <h5>{friend.name}</h5>
                     </Link>
                  </div>
               ))}
            </div>
            <div className='users-plants-container'>
               <MyPlants />
            </div>
         </div>
      </div>
      ) 
   } else {
      return <h1>...loading</h1>
   }
}



export default Dashboard