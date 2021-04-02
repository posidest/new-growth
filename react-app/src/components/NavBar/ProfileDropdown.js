import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {login, logout, signUp, authenticate} from '../../store/session'; 

const ProfileButton = () => {
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
                <img src={me.avatar} style={{width: '30px', height: '30px'}}/>
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
                        <li onClick={logout} className='logout'>
                            Log Out
                        </li>
                    </ul>
                </div>
            )}
        </div>
    )} else {
        return (
            <div>
                <h1>loading...</h1>
            </div>
        )
    }
}

export default ProfileButton;