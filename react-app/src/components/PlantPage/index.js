import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {useParams, Link, useHistory} from 'react-router-dom'
import PlantProfile from '../PlantProfile'
import './PlantPage.css'
import PlantNav from './PlantNav'

const PlantPage = () => {
   const history = useHistory()
   const dispatch = useDispatch()
   const [plant, setPlant] = useState({})
   const [entries, setEntries] = useState([])
   const [user, setUser] = useState(null)
   const [profile, setProfile] = useState(null)
   const [profileId, setProfileId] = useState(null)
   const {id} = useParams()
   const [showProfile, setShowProfile] = useState(false)
   
   const me = useSelector((state) => state.session.user)


   const getPlant = async(id) => {
      const res = await fetch(`/api/users/plants/${id}`)
      if (res.ok) {
         const data = await res.json()
         await setPlant(data)
         await setEntries(data.entries)
         return plant
      }
   }

     const getUser = async(id) => {
      const res = await fetch(`/api/users/${id}`)
      if (res.ok) {
         const data = await res.json()
         await setUser(data)
         return user;
      }
   }

   const deleteEntry = async(e) => {
      const entryId = e.target.id;
      // console.log(entryId)
      const res = await fetch(`/api/plants/entries/${entryId}`, {
         method: 'DELETE',
         headers: {'Content-Type': 'application/json'}
      })
      if (res.ok) {
         const data = await res.json()
         return data
      }
   }

   const deletePlant = async(e) => {
      const res = await fetch(`/api/users/plants/${plant.id}`, {
         method: 'DELETE',
         headers: {'Content-Type': 'application/json'}
      })
      if (res.ok) {
         const data = await res.json()
         return
      }
   }

   const editPlant = (e) => {
      history.push(`/plants/${id}/edit`)
   }

   useEffect(async() => {
      await getPlant(id)
   }, [])
   
    useEffect(async() => {
       if(plant) {
         await getUser(plant.user_id)
       }
    },[plant])

   const displayProfile = (e) => {
      setShowProfile(!showProfile)
   }

   if (plant && user) {
      return (
          <>
          <div className='plant-nav'>
               <PlantNav plant={plant} user={user}/>
            </div>
         <div className='plant-page'>
            <div className='plant-info'>
               <Link to={`/users/${user.id}`}>
                  <img 
                  style={{height: '50px', width: '50px', borderRadius: '50%'}}
                  src={user.avatar} alt='avatar'/>
               </Link>
               <h2>{plant.nickname}</h2>
               <h3>{plant.name}</h3>
               <img 
               src={plant.plant_pic}
               style={{width: '400px'}}
               />
               <p>{plant.description}</p>
               {me.id === plant.user_id && (
                  <>
                  <i className="far fa-edit" onClick={editPlant} style={{color: 'rgba(8,32,16,0.6'}}></i>
                  <i className="far fa-trash-alt" onClick={deletePlant} style={{color: 'rgba(8,32,16,0.6'}}></i>
                  </>
               )}
               </div>
            <div className='buttons'>
               {plant.profile_id && (
                     <>
                     <button onClick={displayProfile} type='button'>Show Profile Details </button>
                     </>
                  )}
               {plant.user_id === me.id && (
                  <>
                  <button type='button'>
                  <Link to={`/plants/${id}/tend`}>
                     Tend to me
                     </Link>
                  </button> 
                  </>
               )}
            </div>
               {showProfile && (
                  <div className='plant-profile'>
                     <PlantProfile profileId={plant.profile_id}/> 
                  </div>
               )}     
               {entries.map((entry) => (
                  <div key={entry.id} className='individual-entry'>
                     <div className='top'>
                        <h4>{entry.date}</h4>
                        <div className='is'>
                           {entry.watered && (
                              <i className="fas fa-tint fa-lg" style={{color: 'rgba(8,32,16,0.4', paddingBottom: '10px'}}></i>
                           )}
                           {entry.fertilized && (
                              <i className="fas fa-poo" style={{color: 'rgba(8,32,16,0.6'}}></i>
                           )}
                        </div>
                     </div>
                     {entry.progress_pic && (
                        <div style={{width: '400px', height: '400px'}}>
                           <img 
                           src={entry.progress_pic}
                           style={{maxWidth: '400px', maxHeight: '400px'}}
                           />
                        </div>
                     )}
                  <h5>{`Location: ${entry.location}`}</h5>
                  <p>{entry.details}</p>
                  {(entry.user_id === me.id) && (
                     <div> 
                        <i 
                        onClick={deleteEntry}
                        id={entry.id}
                        className="far fa-trash-alt" style={{color: 'rgba(8,32,16,0.6'}}> 
                        </i>
                     </div>
                  )}
               </div>
            ))}
         </div>
         </>
      )}
   else {
      return (
      <h1>loading...</h1>
      )
   }
}

export default PlantPage;