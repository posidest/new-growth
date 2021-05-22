import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import '../PlantProfiles/PlantProfiles.css'
import {getUsers} from '../../store/user'
import {useDispatch, useSelector} from 'react-redux';

function UsersList() {
  const [users, setUsers] = useState([])
   const [results, setResults] = useState([])
   const [zone, setZone] = useState('')
  const history = useHistory()
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.users)

  useEffect(() => {
    dispatch(getUsers())
  }, []);

    useEffect(() => {
      if (userData) {
        setUsers(userData)      
      }
    },[userData])
    
  const filter = (e) => {
      e.preventDefault()
      let filtered;
      filtered = userData.filter((user) => (
        user.zone === Number(zone)
      ))
        setUsers(filtered)
        return users
      }

  const userComponents = users.map((user) => {
    return (
      <div key={user.id} className='individual-profile' style={{paddingBottom:'40px'}}>
        <NavLink to={`/users/${user.id}`}>
          <h4>{user.username}</h4>
          <img 
          src={user.avatar} 
          style={{width:'200px', height:'200px', borderRadius:'50%'}}
          alt='avatar'/>
          <h5>{user.bio}</h5>
          <p>Zone: {user.zone}</p>
        </NavLink>
      </div>
    );
  });

  const updateZone = (e) => {
    setZone(e.target.value)
  }

     const goBack = (e) => {
      history.push('/')
   }
   
  if (users) {
    return (
    <div className='profiles-page'>
      <div className='profile-nav'>
        <button 
        type='button'
        style={{
          backgroundColor: 'transparent', 
          color: 'rgb(230, 233, 231', 
          border: 'none', 
          boxShadow: 'none', 
          // fontWeight: 'lighter'
        }}
        onClick={goBack}
        >Back
        </button>
        <div className='filter-by'>
          <form onSubmit={filter}>
              <select value={zone} onChange={updateZone}>
                <option value=''>Filter by Hardiness Zone</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
                <option value='6'>6</option>
                <option value='7'>7</option>
                <option value='8'>8</option>
                <option value='9'>9</option>
              </select> 
              <button type='submit'>
                Filter 
              {/* style={{
                backgroundColor: 'transparent', 
                border: 'none', 
                boxShadow: 'none'}}>
                <i className="fas fa-search"
                style={{color: 'rgb(230, 233, 231)'}}>
                </i> */}
              </button>
          </form>
        </div>
    </div>
      <div className='profiles-header'>
        <h1>New Growth Users</h1>
      </div>
      <div className='profiles'>{userComponents}</div>
    </div>
  )
} else {
  return (
    <h1>Loading...</h1>
  )
}
}

export default UsersList;
