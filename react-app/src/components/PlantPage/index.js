import React, {useState, useEffect} from 'react';
// import {authenticate} from '../../store/session'
import {useDispatch} from 'react-redux'
import {useParams} from 'react-router-dom'
import PlantProfile from '../PlantProfile'

const PlantPage = () => {
    
   const [plant, setPlant] = useState(null)
   const [me, setMe] = useState(null)
   const dispatch = useDispatch()
   const [profile, setProfile] = useState(null)
   const [profileId, setProfileId] = useState(null)
   const {id} = useParams()

   
   const getPlant = async(id) => {
      const res = await fetch(`/api/users/plants/${id}`)
      if (res.ok) {
         const data = await res.json()
         await console.log(data, 'data from getplant')
         return data
      }
   }
   
   const showProfile = async (e) => {
      const thisProfile = getProfile(e.target.value)
      await setProfile(thisProfile)
      return profile
   }

   const getProfile = async (id) => {
      const res = await fetch(`/api/profiles/${id}`)
         if (res.ok) {
         const data = await res.json()
         await console.log(data, 'data')
         // setLoaded(true)
         return data;
   }
}
   useEffect(async() => {
      const selectedPlant = await getPlant(id)
      await console.log(selectedPlant)
      await setPlant(selectedPlant)
      await console.log(plant, 'plant in plantpage useeffect')
      await setProfileId(selectedPlant.profile_id)
      return plant
   }, [])


   useEffect(async() => {
      const oneProfile = await getProfile(profileId)
      await setProfile(oneProfile)       
      await console.log(profile, 'profile')
      return profile
   }, [plant])

   if (plant && profile) {
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
         </div>
      )}
   else {
      return (
      <h1>loading...</h1>
      )
   }
}

export default PlantPage;