import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import './PlantProfiles.css'

const PlantProfiles = () => {

   const [profiles, setProfiles] = useState([])
   const history = useHistory()

   const getProfiles = async () => {
      const res = await fetch(`/api/profiles/`)
      if (res.ok) {
         const data = await res.json()
         await console.log(data, 'data')
         return data;
      }
   }

   const goBack = (e) => {
      history.push('/')
   }
   
   useEffect(async () => {
      const profileObject = await getProfiles()
      const plantProfiles = await Object.values(profileObject)
      await setProfiles(plantProfiles[0])    
      return profiles
   }, [])

   if (profiles) {
      return (
         <>
         <div className='profiles-header'>
            <h1>Plant Profiles</h1>
         </div>
         <div className='profiles-page'>
            {profiles.map((profile) => (
               <div key={profile.id} className='individual-profile'>
                  <Link to={`/plants/profile/${profile.id}`}>
                     <h4>{profile.genus_species}</h4>
                     <img src={profile.picture}
                     alt='picture' />
                     <h4>{profile.common_names[0]}</h4>
                  </Link>
               </div>
               ))}
               <button 
               type='button'
               onClick={goBack}
               >Back
               </button>
         </div>
      </>
      )
   } else {
      return <h1>loading...</h1>
   }
}



export default PlantProfiles