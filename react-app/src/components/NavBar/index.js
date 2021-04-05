import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
// import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'
import ctenanthe from '../../images/Ctenanthe.jpg'
import ProfileButton from './ProfileDropdown'

const NavBar = ({ authenticated, setAuthenticated }) => {
  console.log(authenticated, 'authenticated')
  const [query, setQuery] = useState('')
  let buttons;


  const search = async (e) => {
    e.preventDefault()
    const res = await fetch(`/api/profiles/search`, {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({query})
    })
    if (res.ok) {
      const data = await res.json();
      await console.log(data, 'search results')
      return data;
    }
  }


  if (authenticated) {
    buttons = (
      <>
        <div className='home-btn'>
          <NavLink to="/" exact={true} activeClassName="active">
            <i className="fas fa-leaf fa-2x" style={{color: 'rgba(8, 32, 16, 0.6)'}}></i>
          </NavLink>
        </div>
        <div className='search'>
          <form onSubmit={search}>
            <input type='text'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='search common plant names'
            />
            <button type='submit'>
            <i className="fas fa-search"></i>
            </button>
          </form>
        </div>
        <div className='navatar'>
          <ProfileButton authenticated={authenticated} setAuthenticated={setAuthenticated}/>
        </div>
      </>
    )
  }

  if (!authenticated) {
    buttons = (
      <>
        <div className='home-btn'>
          <NavLink to="/" exact={true} activeClassName="active">
            <i className="fas fa-leaf fa-2x" style={{color: 'rgba(8, 32, 16, 0.6)'}}></i>
          </NavLink>
        </div>
        <div className='search'>
          <form onSubmit={search}>
            <input type='text'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='search common plant names'
            />
          </form>
        </div>
        <div className='login-btn'>
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </div>
        <div className='sign-up-btn'>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </div>
      </>
    )
  }
  return (
    <nav className='nav-bar'>
      {buttons}
        {/* <div className='home-btn'>
          <NavLink to="/" exact={true} activeClassName="active">
            <i className="fas fa-leaf fa-2x" style={{color: 'rgba(8, 32, 16, 0.6)'}}></i>
          </NavLink>
        </div>
        {/* <div className='login-btn'>
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </div>
        <div className='sign-up-btn'>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </div> */}
        {/* <div className='users-btn'>
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
        </div> */}
        {/* <div className='log-out-btn'>
          <LogoutButton setAuthenticated={setAuthenticated} />
        </div> */}
        {/* <div className='navatar'>
        <ProfileButton authenticated={authenticated} setAuthenticated={setAuthenticated}/>
        </div>  */}
    </nav>
  );
}

export default NavBar;