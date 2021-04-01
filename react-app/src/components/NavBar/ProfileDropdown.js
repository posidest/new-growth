import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * from '../../store/session';
// import * as sessionActions from '../../store/session';
// import './DropDown.css'

function ProfileButton({authenticated}) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

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
        dispatch(sessionActions.logout());
    };

    return (
        <>
            <div onClick={openMenu} className='post-btn'>
                < i className="fas fa-user fa-lg" />
            </div>
            {showMenu && (
                <div className="drop-down-profile">
                    <ul>
                        <li>
                            <NavLink to='/likes'>Likes </NavLink>
                        </li>
                        <li>
                            <NavLink to='/following'>Following</NavLink>
                        </li>
                        <li>{user.blogName}</li>
                        <li>{user.email}</li>
                        <li onClick={logout} className='logout'>
                            Log Out
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
}

export default ProfileButton;