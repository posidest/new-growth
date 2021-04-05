import React, { useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import './Auth.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()

  const onLogin = async(e) => {
    e.preventDefault();
    const user = await dispatch(login(email, password));
    await console.log(user)
    return user;
    // if (!user.errors) {
    //   setAuthenticated(true);
    // } else {
    //   setErrors(user.errors);
    // }
  };

  const me = useSelector((state) => state.session.user)

  if (me) {
    return <Redirect to="/" />;
  }
  
  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };


  return (
    <form onSubmit={onLogin}>
      <div>
        {errors.map((error) => (
          <div>{error}</div>
          ))}
      </div>
      <div className='auth'>
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={updatePassword}
        />
        <button type="submit">Login</button>
      </div>
    </form>
  );
};

export default LoginForm;
