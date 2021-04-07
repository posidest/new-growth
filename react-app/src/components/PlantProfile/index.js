import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {showProfile} from '../../store/profile';
import {useParams} from 'react-router-dom';
import './PlantProfile.css';

const PlantProfile = ({profileId}) => {

   let profiles = useSelector((state) => state.profile.profiles);
   if (profiles) {
      profiles = profiles['profile']
   }

   let profile = profiles.filter((profile) => (
      profile.id === profileId
   ))
   profile = profile[0]

   
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

      if(profile) {
         const names = stringifier(profile.common_names)
         const pests = stringifier(profile.pests)
         const propogations = stringifier(profile.propogation_methods)

         return (
            <div className='profile-component'>
               <h2>{profile.genus_species}</h2>
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
                              <td>Propogation Methods</td>
                              <td>{propogations}</td>
                           </tr>
                           <tr>
                              <td>Toxic to pets?</td>
                              <td>{profile.toxic_to_pets}</td>
                           </tr>
                        </tbody>
                     </table>
                  </div> 
               </div>
            )
          } else {
               return (
               <h1>loading...</h1>
               )
         }
      } 



export default PlantProfile