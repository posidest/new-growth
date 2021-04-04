import React, {useState, useEffect} from 'react';
import {authenticate} from '../../store/session'
import {useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import './Dashboard.css';

const UsersPlants = () => {
   
   const [plants, setPlants] = useState(null)
   const [me, setMe] = useState(null)
   const dispatch = useDispatch()

   useEffect(async() => {
      const user = await dispatch(authenticate())
      await console.log(user)
      await setMe(user)
      const myPlants = await Object.values(user.plants)
      // await console.log(myPlants, 'my plants')
      await setPlants(myPlants)
      return plants;
   }, [])

   if (plants) {

      return (
         <div>
            <h2 className='plant-header'>My Plants</h2>
            <div className='plants'>
               {plants.map((plant) => (
                  <div key={plant.id} className='single-plant'>
                     <Link to={`/plants/${plant.id}`}>
                        <h4 style={{color: 'green'}}>{plant.nickname}</h4>
                        <div>
                           <img src={plant.plant_pic}
                           style={{width: '250px'}}
                           alt='plant-pic'
                           />
                           <h4>{plant.name}</h4>
                        </div>
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