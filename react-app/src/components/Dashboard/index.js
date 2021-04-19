import React, {useState, useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import MyPlants from './MyPlants'
import {showProfiles} from '../../store/profile'
import {showFollows} from '../../store/user'
import DashNav from './DashNav'
import './Dashboard.css'

const Dashboard = () => {
   const [loaded, setLoaded] = useState(false)
   const [following, setFollowing] = useState([]);
   const me = useSelector((state) => state.session.user)
   const dispatch = useDispatch()
   let follows = useSelector((state) => state.user.follows)
   
   if (follows) { 
      follows = follows['follow']
   }
      
   const getUser = async(id) => {
         const res = await fetch(`/api/users/${id}`)
         if (res.ok) {
            const data = await res.json()
            return data;
         }
      }

   useEffect(() => {
      dispatch(showProfiles())
   },[])
   
   useEffect(() => {
      dispatch(showFollows(me.id))
      },[me])


   const findFollowing = async (follows) => {
      let followed = [];
      if (follows) {
         for (let i = 0; i < follows.length; i++) {
            let f = follows[i].friend_id;
            let friend = await getUser(f)
            followed.push(friend)
         }
         setFollowing(followed)
         setLoaded(true)
      // await console.log(following, 'following from findFollowing helper')
         return following
      } 
      return
   }

   useEffect(() => {
      findFollowing(follows)
   },[follows])

   if (me && loaded && following) { 
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
            <div className='following'>
               {/* {following.length > 0 && ( */}
               {following.map((follow) => (
                  <div key={follow.id} className='follow'>
                     {console.log('friend')}
                     <Link to={`/users/${follow.id}`}>
                        <img src={follow.avatar} 
                        alt='avatar' 
                        style={{height: '50px', width: '50px', borderRadius: '50%'}}/>
                        <p 
                        // style={{color: 'white'}}
                        >{follow.username}</p>
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