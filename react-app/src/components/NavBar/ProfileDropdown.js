import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton.js'

const ProfileButton = () => {
    const [showMenu, setShowMenu] = useState(false);
   

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


    // const logout = (e) => {
    //     e.preventDefault();
    //     dispatch(logout());
    // };

    if (me) {
    return (
        <div>
            <div onClick={openMenu} className='post-btn'>
                <img src={me.avatar} style={{width: '40px', height: '40px', borderRadius: '50%'}}/>
            </div>
            {showMenu && (
                <div className="drop-down-profile">
                    <ul>
                        <li>
                            <NavLink to='/'>My Plants</NavLink>
                        </li>
                        <li>
                            <NavLink to='/plants/profile'>Find Plants</NavLink>
                        </li>

                        {/* <li>{me.username}</li> */}
                        <li>{me.email}</li>
                        <li>
                            <LogoutButton />
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