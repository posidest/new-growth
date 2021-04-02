import React, {useState, useEffect} from 'react';
// import {authenticate} from '../../store/session'
import {useDispatch, useSelector} from 'react-redux'
import {useParams, Link} from 'react-router-dom'
import PlantProfile from '../PlantProfile'
import EntryForm from '../EntryForm'
import {showEntries} from '../../store/entry';

const PlantPage = () => {
   
   const dispatch = useDispatch()
   const [plant, setPlant] = useState({})
   const [entries, setEntries] = useState([])
   const [me, setMe] = useState(null)
   const [profile, setProfile] = useState(null)
   const [profileId, setProfileId] = useState(null)
   const {id} = useParams()
   
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


   if (plant) {

      return (
         <div>
            <h1>{plant.nickname}</h1>
            <h2>{plant.name}</h2>
            <img 
            src={plant.plant_pic}
            style={{width: '400px'}}
            />
            {plant.profile_id && (
               <div>
                  <PlantProfile /> 
               </div>
            )}
            <div>
               <Link to={`/plants/${id}/tend`}>
                  Tend to me
                  </Link>
               {/* <button type='button' onClick={tend}>Tend to me</button> */}
            </div>
            {entries.map((entry) => (
               <div key={entry.id}>
                  {entry.watered && (
                     <i className="fas fa-tint"></i>
                  )}
                  {entry.fertilized && (
                     <i className="fas fa-poo"></i>
                  )}
                  {entry.progress_pic && (
                  <img 
                  src={entry.progress_pic}
                  style={{width: '400px'}}
                  />
                  )}
                  <h4>{`Location: ${entry.location}`}</h4>
                  <p>{entry.details}</p>
                  <div 
                  onClick={deleteEntry} 
                  value={entry.id}>
                     <i 
                     className="far fa-trash-alt">
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