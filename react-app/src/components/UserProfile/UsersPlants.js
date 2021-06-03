import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import '../Dashboard/Dashboard.css';

const UsersPlants = () => {
   const [plants, setPlants] = useState([])

   const user = useSelector((state) => state.user.user)
   

   const getPlants = async(id) => {
      const res = await fetch(`/api/users/${id}/plants`)
      if (res.ok) {
         const json = await res.json()
         await setPlants(json.plant)
         return plants
      }
   }

   useEffect(() => {
      getPlants(user.id)
   },[user])


   if (plants) {
      return (
         <div>
            <div className='plants'>
               {plants.map((plant) => (
                  <div key={plant.id} className='single-plant'>
                     <Link to={`/plants/${plant.id}`}>
                        <h4>{plant.nickname}</h4>
                        <div style={{width: '230px', height: '230px'}}>
                           <img src={plant.plant_pic}
                           style={{maxWidth: '230px', maxHeight: '230px'}}
                           alt='plant-pic'
                           />
                        </div>
                        <h4 
                        style={{color: 'rgba(8, 32, 16, 0.6)'}}>
                        {plant.name}
                        </h4>
                        <p>{plant.description}</p>
                     </Link>
                  </div>
               ))}
            </div>
          </div>
         )
      } else {
         return (
            <h1>Loading...</h1>
         )
      }
   }

export default UsersPlants