const ADD_PLANT = 'plant/addPlant';
const GET_PLANT = 'plant/getPlant';


const addPlant = (plant) => ({
   type: ADD_PLANT,
   plant
})

const getPlant = (plant) => ({
   type: GET_PLANT,
   plant
})

export const newPlant = (plant) => async (dispatch) => {
   const {plant_pic, name, nickname, profile_id, description} = plant;
   const res = await fetch(`/api/users/plants`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
         plant_pic, 
         name, 
         nickname, 
         profile_id,
         description
      })
   });
   if (res.ok) {
      const data = await res.json()
      console.log(data)
      dispatch(addPlant(data))
      return data;
   }
}

export const showPlant = (id) => async (dispatch) => {
   const res =  await fetch(`/api/users/plants/${id}`)
   if (res.ok) {
      const data = await res.json()
      dispatch(getPlant(data))
      return data;
   }
}


export default function reducer(state={}, action) {
   let newState;
   switch(action.type) {
      case ADD_PLANT:
         newState={...state};
         newState['plant'] = action.plant;
         return newState;
         case GET_PLANT:
            newState={...state};
            newState['currentPlant'] = action.plant;
            return newState;
      default: return state; 
   }
}