import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {useParams, Link} from 'react-router-dom'
import PlantProfile from '../PlantProfile'
import EntryForm from '../EntryForm'
import {showEntries} from '../../store/entry';
import './PlantPage.css'

const PlantPage = () => {
   
   const dispatch = useDispatch()
   const [plant, setPlant] = useState({})
   const [entries, setEntries] = useState([])
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
         console.log(plant, 'plant')
         return plant
      }
   }

   const deleteEntry = async (e) => {
      const entryId = e.target.value;
      const res = await fetch(`/api/plants/entries/${entryId}`, {
         method: 'DELETE'
      })
      if (res.ok) {
         const data = await res.json()
         return data
      }
   }

   useEffect(async() => {
      await getPlant(id)
      // await dispatch(showEntries(id))
   }, [])

   const displayProfile = (e) => {
      if (showProfile) {
         setShowProfile(false)
      } else {
         setShowProfile(true)
      }
   }

   if (plant) {

      return (
         <div className='plant-page'>
            <div className='plant-info'>
               <h1>{plant.nickname}</h1>
               <h2>{plant.name}</h2>
               <img 
               src={plant.plant_pic}
               style={{width: '400px'}}
               />
               <p>{plant.description}</p>
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
                           {showProfile && (
                            <PlantProfile profileId={plant.profile_id}/> 
                           )}
                        </div>
                  
                  )}     
               {entries.map((entry) => (
                  <div key={entry.id} className='individual-entry'>
                     {entry.watered && (
                        <i className="fas fa-tint" style={{color: 'deepskyblue'}}></i>
                     )}
                     {entry.fertilized && (
                        <i className="fas fa-poo" style={{color: 'brown'}}></i>
                     )}
                     {entry.progress_pic && (
                        <img 
                        src={entry.progress_pic}
                        style={{width: '400px'}}
                        />
                     )}
                     <h4>{entry.date}</h4>
                  <p>{`Location: ${entry.location}`}</p>
                  <p>{entry.details}</p>
                  <div 
                  onClick={deleteEntry} 
                  value={entry.id}>
                     <i 
                     className="far fa-trash-alt" style={{color: 'green'}}> 
                     </i>
                  </div>
                  {/* <div onClick={editEntry}><i className="far fa-edit"></i></div> */}
               </div>
            ))}
         </div>
      )}
   else {
      return (
      <h1>loading...</h1>
      )
   }
}

export default PlantPage;