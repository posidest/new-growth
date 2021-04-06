const ADD_PLANT = 'plant/addPlant';



const addPlant = (plant) => ({
   type: ADD_PLANT,
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


export default function reducer(state={}, action) {
   let newState;
   switch(action.type) {
      case ADD_PLANT:
         newState={...state};
         newState['plant'] = action.plant;
         return newState;
      default: return state; 
   }
}