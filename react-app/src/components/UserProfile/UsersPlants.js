import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {showPlants} from '../../store/plant'
import {showUser} from '../../store/user'
import {Link, useParams} from 'react-router-dom'
import '../Dashboard/Dashboard.css';

const UsersPlants = () => {
   const [plants, setPlants] = useState([])
   const dispatch = useDispatch()

   const me = useSelector((state) => state.session.user);
   const user = useSelector((state) => state.user.user)
   

   const getPlants = async(id) => {
      const res = await fetch(`/api/users/${id}/plants`)
      if (res.ok) {
         const json = await res.json()
         // await console.log(json, 'data from usersplants')
         await setPlants(json.plant)
         return plants
      }
   }

   useEffect(async() => {
      await getPlants(user.id)
   },[])


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