import React from 'react';
import {useSelector} from 'react-redux'
import {Link, useParams, useHistory} from 'react-router-dom'
import '../Dashboard/Dashboard.css'

const PlantNav = ({plant, user}) => {
   const me = useSelector((state) => state.session.user)
   const {id} = useParams()
   const history = useHistory()
   let links;

   const deletePlant = async(id) => {
      const res = await fetch(`/api/users/plants/${id}`, {
         method: 'DELETE',
         headers: {'Content-Type': 'application/json'}
      })
      if (res.ok) {
         const data = await res.json()
         return data
      }
   }

   const deleteEvent = async(e) => {
      await deletePlant(id)
      await history.push('/')
   }

   if (me && user && plant) {
      if (me.id === user.id) {
         links = (
            <>
               <Link to={`/plants/${plant.id}/tend`}>
                  Tend to me
               </Link>
               <Link to={`/plants/${id}/edit`}>
                  Edit Plant
               </Link>
               <button type='button' 
               onClick={deleteEvent}
               style={{color: 'white', background: 'transparent', border: 'none', fontWeight: 'lighter', boxShadow: 'none'}}>
                  Delete Plant
               </button>
               </>
            )} else {
               links = (
                  <>
                  {plant.profile_id && (
                     <>
                        <Link to={`/plants/profile/${plant.profile_id}`}>
                        Plant Profile
                     </Link>
                     </>
                     )}
                  <Link to={`/users/${plant.user_id}`}>
                     My Parent
                  </Link>
                  </>
               )
               }
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



export default PlantNav;