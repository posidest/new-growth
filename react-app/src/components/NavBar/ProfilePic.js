import React, { useState, useEffect } from "react";
import {useSelector} from 'react-redux'
import {NavLink} from 'react-router-dom'
const ProfilePic = () => {

    const me = useSelector((state) => state.session.user)
    if (me) {
    return (
        <>
        <NavLink to={`/users/${me.id}`}>
            <img src={me.avatar} style={{width: '40px', height: '40px', borderRadius: '50%'}}/>   
        </NavLink> 
    </>
    )} else {
        return (
            null
        )
    }
}

export default ProfilePic;