import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import { useHistory } from 'react-router-dom';
import HardinessZone from '../auth/HardinessZone'
import '../auth/Auth.css'
import {useSelector} from 'react-redux'

const customStyles = {
content : {
  top                   : '50%',
  left                  : '50%',
  right                 : 'auto',
  bottom                : 'auto',
  marginRight           : '-50%',
  transform             : 'translate(-50%, -50%)'
}
};

const EditProfile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [bio, setBio] = useState('');
  const [zone, setZone] = useState('');
  const [showZone, setShowZone] = useState(false)
  const [imageLoading, setImageLoading] = useState(false);
  const me = useSelector((state) => state.session.user)
   const history = useHistory()


  const editProfile = async (e) => {
     e.preventDefault();
      const res = await fetch(`/api/users/${me.id}/edit`, {
         method: 'POST',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify({
            username,
            email,
            avatar,
            bio,
            zone
         })
      })
      if (res.ok) {
         const data = await res.json()
         history.push('/')
         return data;
     }
  }

   useEffect(() => {
      if(me) {
         setEmail(me.email)
         setUsername(me.username)
         setAvatar(me.avatar)
         setBio(me.bio)
         setZone(me.zone)
      }
   },[me])

  const showMap = (e) => {
    setShowZone(!showZone)
  }

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateAvatar = async (e) => {
    const image = e.target.files[0]
    const formData = new FormData();
    formData.append("image", image);
    setImageLoading(true);
    const res = await fetch('/api/images/avatar', {
        method: "POST",
        body: formData,
    });

    if (res.ok) {
        const json = await res.json();
        setImageLoading(false);
        await setAvatar(json.url)
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

  const updateBio = (e) => {
    setBio(e.target.value);
  };

  const updateZone = (e) => {
    let { value, min, max } = e.target;
    value = Math.max(Number(min), Math.min(Number(max), Number(value)));
    setZone(value);
  };

  return (
    <div className='sign-up-page'>
      <form 
      className='sign-up-form'
      onSubmit={editProfile}>
        <h1>Edit Profile</h1>
          <input
            type="text"
            name="username"
            onChange={updateUsername}
            value={username}
            placeholder='User Name'
          ></input>
          <input
            type="text"
            name="email"
            onChange={updateEmail}
            value={email}
            placeholder='Email'
          ></input>
          <label 
          className='file-input'
          style={{color: 'rgba(8, 32, 16, 0.8)'}}>
            Upload an avatar
          <input
            type="file"
            name="avatar"
            accept="image/*"
            placeholder="Avatar"
            onChange={updateAvatar}
          ></input>
          </label>
          {(imageLoading)&& <p>Loading...</p>}
          {avatar && (
            <img 
            src={avatar}
            alt='avatar'
            style={{width: '200px', height: '200px', borderRadius: '50%', margin: '20px 30px 40px 30px'}}
            />
          )}
          <textarea
            name="bio"
            onChange={updateBio}
            placeholder='Biography'
            value={bio}
          ></textarea>
          <input
            type="number"
            name='zone'
            onChange={updateZone}
            value={zone}
            min='1'
            max='13'
            placeholder='Hardiness Zone'
          ></input>
                <p
                onClick={showMap}
                title='Show Map'>
                What's this?
                </p>
          {showZone && (
            <Modal
            isOpen={showZone}
            onRequestClose={showMap}
            style={customStyles}
            contentLabel='Hardiness Zones'
            >
              <HardinessZone />
            </Modal>
          )}
        <button type="submit">Submit Changes</button>
      </form>

    </div>
  );
};

export default EditProfile;
