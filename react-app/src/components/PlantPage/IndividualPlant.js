import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {useParams, Link} from 'react-router-dom'
import PlantProfile from '../PlantProfile'
import EntryForm from '../EntryForm'
import {showEntries} from '../../store/entry';
import './PlantPage.css'

const IndividualPlant = ({plantId}) => {
   
   const dispatch = useDispatch()
   const [plant, setPlant] = useState({})
   const [entries, setEntries] = useState([])
   const [profile, setProfile] = useState(null)
   const [profileId, setProfileId] = useState(null)
   // const {id} = useParams()
   const [showProfile, setShowProfile] = useState(false)
   

   const me = useSelector((state) => state.session.user)

   const getPlant = async(plantId) => {

      const res = await fetch(`/api/users/plants/${plantId}`)
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
         method: 'DELETE',
         headers: {'Content-Type': 'application/json'}
      })
      if (res.ok) {
         const data = await res.json()
         return data
      }
   }

   useEffect(async() => {
      await getPlant(plantId)
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
         <div className='individual-plant'>
            <div className='individual-plant-info'>
               <h1>{plant.nickname}</h1>
               <h2>{plant.name}</h2>
               <img 
               src={plant.plant_pic}
               style={{width: '400px'}}
               />
               <p>{plant.description}</p>
            </div>
            {me.id === plant.user_id && <div className='tend-btn'>
               <button type='button'>
               <Link to={`/plants/${plantId}/tend`}>
                  Tend to me
                  </Link>
               </button>   
               {/* <button type='button' onClick={tend}>Tend to me</button> */}
            </div>
            }
            {entries.map((entry) => (
               <div key={entry.id}>
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
                  <h4>{`Location: ${entry.location}`}</h4>
                  <p>{entry.details}</p>
                  {me.id === entry.user_id && (
                  <div 
                  onClick={deleteEntry} 
                  value={entry.id}>
                        <i 
                        className="far fa-trash-alt" style={{color: 'green'}}> 
                        </i>
                  </div>
                  )}
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

export default IndividualPlant;