import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/users/");
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  const userComponents = users.map((user) => {
    return (
      <div>
        <li key={user.id}>
          <NavLink to={`/users/${user.id}`}>{user.username}</NavLink>
        </li>
        <li key={user.name}>
          <img 
          src={user.avatar} 
          style={{width:'100px', height:'100px', borderRadius:'50%'}}
          alt='avatar'/>
        </li>
      </div>
    );
  });

  return (
    <>
      <h1>User List: </h1>
      <ul>{userComponents}</ul>
    </>
  );
}

export default UsersList;
