import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {newPlant, showPlants} from '../../store/plant'
import {showProfiles} from '../../store/profile'
import './PlantForm.css'

const PlantForm = () => {
   const [plantPic, setPlantPic] = useState(null)
   const [name, setName] = useState('')
   const [nickname, setNickname] = useState(null)
   const [profileId, setProfileId] = useState(null)
   const [description, setDescription] = useState('')
   const [imageLoading, setImageLoading] = useState(false)
   const dispatch = useDispatch()
   const [profiles, setProfiles] = useState([])
   const history = useHistory()

   const me = useSelector((state) => state.session.user)
   
   const submitPlant = (e) => {
      e.preventDefault()
      const myPlant = {
         'name': name, 
         'nickname': nickname, 
         'plant_pic': plantPic, 
         'profile_id': profileId, 
         'description': description
      }
      dispatch(newPlant(myPlant))
      dispatch(showPlants(me.id))
      history.push('/')
   }
   
   const goBack = (e) => {
      history.push('/')
   }


   const getProfiles = async () => {
      const res = await fetch(`/api/profiles/`)
      if (res.ok) {
         const data = await res.json()
         return data;
      }
   }
   
   useEffect(async () => {
      const profileObject = await getProfiles()
      const plantProfiles = await Object.values(profileObject)
      await setProfiles(plantProfiles[0])     
      return profiles
   }, [])
 

  const updatePic = async (e) => {
    const image = e.target.files[0]
    const formData = new FormData();
    formData.append("image", image);
    setImageLoading(true);
    const res = await fetch('/api/images', {
        method: "POST",
        body: formData,
    });

    if (res.ok) {
        const json = await res.json();
        await setPlantPic(json.url)
        setImageLoading(false);
    }
    else {
        setImageLoading(false);
        console.log("Something went wrong");
        return (
            <p style={{color: 'red'}}>
                There was an error with your upload. Please try again.
            </p>
        )
      }
    };

    const updateName = (e) => {
       setName(e.target.value)
    }

    const updateNickname = (e) => {
      setNickname(e.target.value)
    }

   const updateDescription = (e) => {
      setDescription(e.target.value)
    }


    const updateProfile = (e) => {
      setProfileId(e.target.value)
      console.log(e.target.value, 'profileId in update profile handler')
    }

    if (profiles) {
       return (
          <div className = 'plant-form-page'>
               <form 
               className='plant-form' 
               onSubmit={submitPlant}>
                  <h1>New Plant</h1>
                  <input 
                  type='text'
                  onChange={updateName}
                  value={name}
                  placeholder='Plant Name' />
                  <input 
                  type='text'
                  onChange={updateNickname}
                  value={nickname}
                  placeholder='Add a Nickname' />
                  <label className='file-input'
                  style={{color: 'rgba(8, 32, 16, 0.8)'}}>
                     <input
                     type='file'
                     accept='image/*'
                     name='plant-pic'
                     onChange={updatePic}/>
                  Upload a Picture
                  </label>
                  {(imageLoading) && <p>Loading...</p>}
                  {plantPic && (
                  <div className='plant-pic'>
                     <img src={plantPic}
                     style={{width: '200px', marginBottom: '10px'}}
                     />
                  </div>
                  )}
                  <textarea
                  placeholder='Description'
                  value={description}
                  onChange={updateDescription}
                  />
                  <select value={profileId}
                  onChange={updateProfile}>
                     <option value='0'>Choose A Plant Profile</option>
                     {profiles.map((profile, i) => (
                        <option value={profile.id}>
                           {profile.common_names[0]}
                        </option>
                     ))}
                  </select>
                  <div className='plant-form-buttons'>
                     <button type='submit'>Add Plant</button>
                     <button type='button' onClick={goBack}>Cancel</button>
                  </div>
               </form>
             </div>
            )
         }
         else {
            return (
               <h2>...Loading</h2>
            )
         }
      }



export default PlantForm;