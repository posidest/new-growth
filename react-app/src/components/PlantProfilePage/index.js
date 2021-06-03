import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import '../PlantProfile/PlantProfile.css';

const PlantProfilePage = () => {
   const {id} = useParams();
   const [profile, setProfile] = useState(null)
   const [showPlants, setShowPlants] = useState(false)
   
   const stringifier = (arr) => {
      let str = '';
      arr.forEach((el) => {
         if (el === arr[arr.length - 1]) {
            str+= el
            return str
         }
         str+= el + ', '
      })
      return str;
   }

   const getProfile = async (id) => {
      const res = await fetch(`/api/profiles/${id}`)
         if (res.ok) {
         const data = await res.json()
         await setProfile(data)
   
         return profile;
   }
}
   useEffect(() => {
      getProfile(id)
   },[id])


   const displayPlants = (e) => {
      showPlants ? setShowPlants(false) :
      setShowPlants(true)
   }

      if(profile) {
         const names = stringifier(profile.common_names)
         const pests = stringifier(profile.pests)
         const propogations = stringifier(profile.propogation_methods)

         return (
            <div className='profile-component' style={{background: 'rgba(8,32,16,0.4'}}>
               <div className='profile-info'>
                  <h1 style={{border: 'none'}}>{profile.genus_species}</h1>
                  <div className='img'>
                     <img 
                     src={profile.picture}
                     alt='plant-profile'
                     style={{width: '400px'}}
                     />
                  </div>
               </div>
               <div className='table'>
                  <table>
                     <tbody>
                        <tr>
                           <td>Common Names</td>
                           <td>{names}</td>
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
                           <td>{pests}</td>
                        </tr>
                        <tr>
                           <td>Propagation Methods</td>
                           <td>{propogations}</td>
                        </tr>
                        <tr>
                           <td>Toxic to pets?</td>
                           <td>{profile.toxic_to_pets}</td>
                        </tr>
                     </tbody>
                  </table>
               </div>
                  <button type='button'
                  onClick={displayPlants}>
                     View Plants
                  </button>
                  {showPlants && profile.plants.map((plant) => (
                     <div className='profile-plants'>
                        <Link to={`/plants/${plant.id}`}>
                           <h4>{plant.name}</h4>
                           <div className='img-container' style={{height: '250px', width: '250px'}}>
                              <img src={plant.plant_pic} alt='plant-pic' style={{maxWidth:'250px', maxHeight: '250px'}}/>
                           </div>
                           <h4>{plant.nickname}</h4>
                        </Link>
                     </div>   
                     ))}
            </div>
            )
          } else {
               return (
               <h1>loading...</h1>
               )
         }
      } 



export default PlantProfilePage