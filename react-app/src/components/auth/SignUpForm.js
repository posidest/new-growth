import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import { signUp } from '../../services/auth';
import './Auth.css'
import {useDispatch, useSelector} from 'react-redux'


const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [bio, setBio] = useState('');
  const [zone, setZone] = useState('');
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const dispatch = useDispatch()
  
  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await dispatch(signUp({username, email, avatar, bio, zone, password}));
      // if (!user.errors) {
      //   setAuthenticated(true);
      // }
    }
  };

  const me = useSelector((state) => state.session.user)

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
    setZone(e.target.value);
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
    <form onSubmit={onSignUp}>
      <div className='auth'>
        <label>User Name</label>
        <input
          type="text"
          name="username"
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div>
        <label>Email</label>
        <input
          type="text"
          name="email"
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div className='uploadDiv'>
        <label>Upload an avatar:</label>
        <input
          type="file"
          name="avatar"
          accept="image/*"
          placeholder="Avatar"
          onChange={updateAvatar}
        ></input>
        {(imageLoading)&& <p>Loading...</p>}
          <div className='avatar'>
            <img 
            src={avatar}
            style={{width: '200px', borderRadius: '50%'}}
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
      <div>
        <label>Hardiness Zone</label>
        <input
          type="number"
          name='zone'
          onChange={updateZone}
          value={zone}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          type="password"
          name="repeat_password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
