import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {showPlants} from '../../store/plant'
import {Link} from 'react-router-dom'
import './Dashboard.css';

const MyPlants = () => {
   const [plants, setPlants] = useState([])
   const dispatch = useDispatch()
   const me = useSelector((state) => state.session.user);
   // const plants = useSelector((state) => state.plant.plants)
   // const plant = useSelector((state) => state.plant.plant)
   // const plants = useSelector((state) => Object.values(state.session.user.plants))
   // if (userPlants) {
   //    setPlants(userPlants)
   // }
   // useEffect(() => {
   //    dispatch(showPlants(me.id))      
   //    // console.log(plants)
   // }, [])

   const getPlants = async(id) => {
      const res = await fetch(`/api/users/${id}/plants`)
      if (res.ok) {
         const json = await res.json()
         await console.log(json)
         await setPlants(json.plant)
         return plants
      }
   }

   useEffect(async() => {
      await getPlants(me.id)
   },[])



   if (plants) {
      return (
         <div>
            {/* <h2 className='plant-header'>My Plants</h2> */}
            <div className='plants'>
               {plants.map((plant) => (
                  <div key={plant.id} className='single-plant'>
                     <Link to={`/plants/${plant.id}`}>
                        <h4>{plant.nickname}</h4>
                        <div style={{width: '250px', height: '250px'}}>
                           <img src={plant.plant_pic}
                           style={{maxWidth: '250px', maxHeight: '250px'}}
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

export default MyPlants