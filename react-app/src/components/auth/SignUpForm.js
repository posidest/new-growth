import React, { useState } from "react";
import Modal from 'react-modal';
import { Redirect } from 'react-router-dom';
import { signUp } from '../../services/auth';
import HardinessZone from './HardinessZone'
import './Auth.css'
import {useDispatch, useSelector} from 'react-redux'

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

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [bio, setBio] = useState('');
  const [zone, setZone] = useState('');
  const [showZone, setShowZone] = useState(false)
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const dispatch = useDispatch()
  


  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      await dispatch(signUp({username, email, avatar, bio, zone, password}));
      // if (!user.errors) {
      //   setAuthenticated(true);
      // }
    }
  };

  const me = useSelector((state) => state.session.user)


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


  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (me) {
    return <Redirect to="/" />;
  }

  return (
    <div className='sign-up-page'>
      <form 
      className='sign-up-form'
      onSubmit={onSignUp}>
        <h1>Sign Up</h1>
        <div className='auth'>
          {/* <label>User Name</label> */}
          <input
            type="text"
            name="username"
            onChange={updateUsername}
            value={username}
            placeholder='User Name'
          ></input>
        </div>
        <div>
          {/* <label>Email</label> */}
          <input
            type="text"
            name="email"
            onChange={updateEmail}
            value={email}
            placeholder='Email'
          ></input>
        </div>
        <div>
          <label 
          className='file-input'
          style={{color: 'black', marginTop: '20px'}}>
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
            <div className='avatar'>
              <img 
              src={avatar}
              style={{width: '200px', height: '200px', borderRadius: '50%'}}
              />
            </div>
        </div>
        <div>
          <textarea
            name="bio"
            onChange={updateBio}
            placeholder="Biography"
            value={bio}
          ></textarea>
        </div>
        <div className='zone'>
          {/* <label>Hardiness Zone</label> */}
          <input
            type="number"
            name='zone'
            onChange={updateZone}
            value={zone}
            min='1'
            max='13'
            placeholder='Hardiness Zone'
          ></input>
              <div
              className='zone'>
              <p
              onClick={showMap}
              style={{color: 'white'}}
              title='Show Map'>
                What's this?
                </p>
              </div>
          </div>
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
        <div>
          {/* <label>Password</label> */}
          <input
            type="password"
            name="password"
            onChange={updatePassword}
            value={password}
            placeholder='Password'
          ></input>
        </div>
        <div>
          {/* <label>Repeat Password</label> */}
          <input
            type="password"
            name="repeat_password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
            placeholder='Repeat Password'
          ></input>
        </div>
        <button type="submit">Sign Up</button>
      </form>

    </div>
  );
};

export default SignUpForm;
