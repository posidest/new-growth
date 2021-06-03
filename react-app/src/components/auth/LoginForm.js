import React, { useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import './Auth.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([])
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()

  const onLogin = async(e) => {
    e.preventDefault();
    const user = await dispatch(login(email, password));
    if (!user.errors) {
      return user;
  } else {
    setErrors(user.errors)
  }
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
    <div className='login-page'>
      <form 
      className='login-form'
      onSubmit={onLogin}>
        <h1>Login</h1>  
        <div>
          {errors.map((error) => (
            <div>{error}</div>
            ))}
        </div>
        <div className='auth'>
          <input
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={updatePassword}
          />
          <div>
            <button type="submit">Login</button>
          </div>
        </div>
      </form>

    </div>
  );
};

export default LoginForm;
