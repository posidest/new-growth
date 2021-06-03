import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux'
import {Link, useHistory} from 'react-router-dom';
import './PlantProfiles.css'

const PlantProfiles = () => {

   const history = useHistory()
   const [profiles, setProfiles] = useState([])
   const [type, setType] = useState('')


   const getProfiles = async () => {
      const res = await fetch(`/api/profiles/`)
      if (res.ok) {
            const data = await res.json()
            const plants = await Object.values(data)
            await setProfiles(plants[0])    
            return profiles
         }
      }
      
      useEffect(() => {
         getProfiles()
      }, [])
      
      
      let plantProfiles = useSelector((state) => state.profile.profile)
      
      const variegatedArr = ['Tradescantia zebrina', 'Hypoestes phyllostachya', 'Epipremnum aureum', 'Syngonium podophyllum', 'Maranta leuconeura var. erythroneura', 'Maranta leuconeura var. kerchoveana', 'Ctenanthe burle-marxii', 'Calathea ornata', 'Calathea zebrina', 'Calathea orbifolia', 'Calathea makoyana']
      
      const filter = (e) => {
         e.preventDefault()
         let filtered;
         if (type === 'non-toxic') {
            filtered = plantProfiles.filter((profile) => (
               profile.toxic_to_pets === false
            ))
         }
         if (type === 'all') {
            filtered = plantProfiles.filter((profile) => (
               profile.picture !== ''
            ))
         }
         if (type === 'low-light') {
            filtered = plantProfiles.filter((profile) => (
               profile.light.includes('Low') || profile.light.includes('Medium')
               ))
            }
            if (type === 'variegated') {
               filtered = plantProfiles.filter((profile) => (
                  variegatedArr.includes(profile.genus_species) 
                  ))
         }
         if (type === 'drought') {
            filtered = plantProfiles.filter((profile) => (
               profile.water_when.includes('completely dry')
               ))
            }
            setProfiles(filtered)
           return profiles
         }
         
   const updateType = (e) => {
      setType(e.target.value)
   }
      
   const goBack = (e) => {
      history.push('/')
   }
   

   if(profiles) {
      return (
         <div className='profiles-page'>
            <div className='profile-nav'>
               <button 
               type='button'
               style={{
                  backgroundColor: 'transparent', 
                  color: 'rgb(230, 233, 231', 
                  border: 'none', 
                  boxShadow: 'none'
               }}
               onClick={goBack}
               >Back
               </button>
               <div className='filter-by'>
                  <form onSubmit={filter}>
                     <select value={type} onChange={updateType}>
                        <option value=''>Filter Profiles</option>
                        <option value='non-toxic'>Safe For Pets</option>
                        <option value='low-light'>Low Light Tolerant</option>
                        <option value='variegated'>Variegated Plants</option>
                        <option value='drought'>Drought Tolerant Plants</option>
                     </select> 
                     <button type='submit' 
                     style={{
                        backgroundColor: 'transparent', 
                        border: 'none', 
                        boxShadow: 'none'}}>
                        <i className="fas fa-search"
                        style={{color: 'rgb(230, 233, 231)'}}>
                        </i>
                     </button>
                  </form>
               </div>
            </div>
         <div className='profiles-header'>
            <h1>Plant Profiles</h1>
         </div>
         <div className='profiles'>
            {profiles.map((profile) => (
            <div key={profile.id} className='individual-profile'>
               <Link to={`/plants/profile/${profile.id}`}>
                  <h5>{profile.genus_species}</h5>
                  <div className='container' style={{height: '200px', width: '200px'}}>
                     <img src={profile.picture}
                     alt='plant-profile' 
                     style={{maxHeight: '200px', maxWidth: '200px'}}/>
                  </div>
                  <h5 className='common-name'>{profile.common_names[0]}</h5>
               </Link>
            </div>
            ))}
         </div>
      </div>
      )
   } else {
      return <h1>loading...</h1>
   }
}



export default PlantProfiles