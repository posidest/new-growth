import React from "react";
import { logout } from "../../store/session";
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'

const LogoutButton = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const onLogout = (e) => {
    dispatch(logout());
    history.push('/')
  };

  return (
  <button 
  style={{
    // backgroundColor: 'rgba(8, 32, 16, 0.1)',
    color: 'rgba(8, 32, 16, 0.6)',
    borderRadius: '4px',
    boxShadow: '1px 1px 1px rgba(8, 32, 16, 0.2)',
  padding: '5px 9px 6px 9px'}}
  onClick={onLogout}
  >Logout
  </button>
  )
};

export default LogoutButton;
