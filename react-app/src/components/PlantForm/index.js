import React, {useState, useEffect} from 'react';
import {Redirect, useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {newPlant} from '../../store/plant'
import {showProfiles} from '../../store/profile'

const PlantForm = ({authenticated}) => {
   const [plantPic, setPlantPic] = useState(null)
   const [name, setName] = useState('')
   const [nickname, setNickname] = useState(null)
   const [profileId, setProfileId] = useState(null)
   const [description, setDescription] = useState('')
   const [imageLoading, setImageLoading] = useState(false)
   const dispatch = useDispatch()
   const [profiles, setProfiles] = useState([])
   const history = useHistory()

   // const me = useSelector((state) => state.session.user)
   
   const submitPlant = async (e) => {
      e.preventDefault()
      const myPlant = {
         'name': name, 
         'nickname': nickname, 
         'plant_pic': plantPic, 
         'profile_id': profileId, 
         'description': description
      }
      const res = await dispatch(newPlant(myPlant))
      await console.log(res, 'res in plantform')
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
   

   // useEffect(async() => {
   //    await dispatch(showProfiles())
   //    setLoaded(true)
   // },[dispatch])

   // useEffect(() => {
   //    console.log('hello')
   // }, [plant, plantPic, name, nickname, profileId])

   // const profiles = useSelector((state) => state.profile.profiles)
 

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
          <div className='plant-form'>
             <h1>New Plant</h1>
             <form onSubmit={submitPlant}>
                <div>
                   <input 
                   type='text'
                   onChange={updateName}
                   value={name}
                   placeholder='Plant Name' />
                </div>
               <div>
                  <input 
                  type='text'
                  onChange={updateNickname}
                  value={nickname}
                  placeholder='Add a Nickname' />
               </div>
                <div>
                   <label className='file-input'>
                      <input
                      type='file'
                      accept='image/*'
                      name='plant-pic'
                      onChange={updatePic}/>
                   Upload a Picture
                   </label>
                   {(imageLoading) && <p>Loading...</p>}
                   <div className='plant-pic'>
                      <img src={plantPic}
                      style={{width: '200px'}}
                      />
                   </div>
                </div>
                <div>
                   <textarea
                   placeholder='Description'
                   value={description}
                   onChange={updateDescription}
                   />
                </div>
                <div>
                   <select value={profileId}
                   onChange={updateProfile}>
                      <option value='0'>Choose A Plant Profile</option>
                      {profiles.map((profile, i) => (
                         <option value={profile.id}>
                            {profile.common_names[0]} {profile.id}
                        </option>
                      ))}
                   </select>
                </div>
                <>
                   <button type='submit'>Add Plant</button>
                </>
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