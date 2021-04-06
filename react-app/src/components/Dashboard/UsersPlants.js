import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import './Dashboard.css';

const UsersPlants = () => {
   
   const dispatch = useDispatch()
   const me = useSelector((state) => state.session.user);
   const plants = Object.values(me.plants)
 
   if (plants) {

      return (
         <div>
            <h2 className='plant-header'>My Plants</h2>
            <div className='plants'>
               {plants.map((plant) => (
                  <div key={plant.id} className='single-plant'>
                     <Link to={`/plants/${plant.id}`}>
                        <h4>{plant.nickname}</h4>
                        <div>
                           <img src={plant.plant_pic}
                           style={{width: '250px'}}
                           alt='plant-pic'
                           />
                           <h4 
                           style={{color: 'rgba(8, 32, 16, 0.6)'}}>
                              {plant.name}
                           </h4>
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