import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton.js'
import {logout} from '../../store/session'
// import './NavBar.css'

const ProfileButton = () => {
    const [showMenu, setShowMenu] = useState(false);
    const dispatch = useDispatch()

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    const me = useSelector((state) => state.session.user)


    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);


    const logOut = (e) => {
        e.preventDefault();
        dispatch(logout());
    };

    if (me) {
    return (
        <div>
            <div onClick={openMenu}>
                <img src={me.avatar} style={{width: '40px', height: '40px', borderRadius: '50%'}}/>
            </div>
            {showMenu && (
                <div className="drop-down-profile">
                    <ul style={{listStyleType: 'none', padding: '5px'}}>
                        <li>
                            <NavLink to='/'>My Plants</NavLink>
                        </li>
                        <li>
                            <NavLink to='/plants/profile'>Find Plants</NavLink>
                        </li>
                        {/* <li>{me.username}</li> */}
                        <li>{me.email}</li>
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