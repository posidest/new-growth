import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {authenticate} from '../../store/session'; 
import LogoutButton from '../auth/LogoutButton.js'

const ProfileButton = ({authenticated, setAuthenticated}) => {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const [me, setMe] = useState(null)
   

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };


   useEffect(async() => {
      const user = await dispatch(authenticate())
      await setMe(user)
      return me
   }, [])


    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);


    const logout = (e) => {
        e.preventDefault();
        dispatch(logout());
    };

    if (me) {
    return (
        <div>
            <div onClick={openMenu} className='post-btn'>
                <img src={me.avatar} style={{width: '40px', height: '40px', borderRadius: '50%'}}/>
            </div>
            {showMenu && (
                <div className="drop-down-profile">
                    <ul>
                        {/* <li>
                            <NavLink to='/likes'>Likes </NavLink>
                        </li>
                        <li>
                            <NavLink to='/following'>Following</NavLink>
                        </li> */}

                        {/* <li>{me.username}</li> */}
                        <li>{me.email}</li>
                        <li>
                            <LogoutButton setAuthenticated={setAuthenticated} />
                        </li>
                    </ul>
                </div>
            )}
        </div>
    )} else {
        return (
            null
        )
    }
}

export default ProfileButton;