import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {showProfile} from '../../store/profile';
import {useParams} from 'react-router-dom';
import '../PlantProfile/PlantProfile.css';
import IndividualPlant from '../PlantPage/IndividualPlant'

const PlantProfilePage = () => {
   const dispatch = useDispatch();
   const {id} = useParams();
   const [loaded, setLoaded] = useState(false)
   const [profile, setProfile] = useState(null)
   const [showPlants, setShowPlants] = useState(false)
 
   console.log(id, 'id from plantprofile page')

   const getProfile = async (id) => {
      const res = await fetch(`/api/profiles/${id}`)
         if (res.ok) {
         const data = await res.json()
         await console.log(data, 'data')
         await setProfile(data)
   
         return profile;
   }
}

   useEffect(() => {
      getProfile(id)
   }, [])
   // const profileGetter = async (id) => {
   //    const oneProfile = await dispatch(showProfile(id))
   //    await setProfile(oneProfile)
   //    await console.log(profile)
   //    return profile;
   // }



   // useEffect(async() => {
   //    profileGetter(id)
   // },[])
   



   const displayPlants = (e) => {
      showPlants ? setShowPlants(false) :
      setShowPlants(true)
   }

   
   // const profile = useSelector((state) => state.profile);
      if(profile) {
         return (
            <div>
               <h1>Plant Profile</h1>
                  <div className='img'>
                     <img 
                     src={profile.picture}
                     alt='picture'
                     style={{width: '400px'}}
                     />
                  </div>
                  <div className='table'>
                     <table>
                        <tbody>
                           <tr>
                              <td>Common Names</td>
                              <td>{profile.common_names}</td>
                           </tr>
                           <tr>
                              <td>Genus Species</td>
                              <td>{profile.genus_species}</td>
                           </tr>
                           <tr>
                              <td>Family</td>
                              <td>{profile.family}</td>
                           </tr>
                           <tr>
                              <td>Native Range</td>
                              <td>{profile.native_range}</td>
                           </tr>
                           <tr>
                              <td>Temperature Range</td>
                              <td>{profile.temp_range}</td>
                           </tr>
                           <tr>
                              <td>Light</td>  
                              <td>{profile.light}</td>
                           </tr>
                           <tr>
                              <td>Soil Type</td>   
                              <td>{profile.soil_type}</td>
                           </tr>
                           <tr>
                              <td>Water</td>
                              <td>{profile.water_when}</td>
                           </tr>
                           <tr>
                              <td>Fertilization</td>
                              <td>{profile.fertilization}</td>
                           </tr>
                           <tr>
                              <td>Pests</td>
                              <td>{profile.pests}</td>
                           </tr>
                           <tr>
                              <td>Propogation Methods</td>
                              <td>{profile.propogation_methods}</td>
                           </tr>
                           <tr>
                              <td>Toxic to pets?</td>
                              <td>{profile.toxic_to_pets}</td>
                           </tr>
                        </tbody>
                     </table>
                  </div> 
                  <div>
                     <button type='button'
                     onClick={displayPlants}>
                        View Plants
                     </button>
                     {showPlants && profile.plants.map((plant) => (
                        <IndividualPlant plantId={plant.id}/>
                     ))}
                  </div>
               </div>
            )
          } else {
               return (
               <h1>loading...</h1>
               )
         }
      } 



export default PlantProfilePage