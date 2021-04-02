const ADD_ENTRY = entries/ADD_ENTRY;

const addEntry = (entry) = ({
   type: ADD_ENTRY,
   entry
})


export const createEntry = (entry) => async (dispatch) => {
   const {plant_id, watered, fertilized, location, details, progress_pic} = entry;
   const res = await fetch(`/api/plants/${plant_id}/entries`, {
         method: 'POST',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify({
            plant_id, 
            watered, 
            fertilized, 
            location,
            details,
            progress_pic
         })
      });
      if (res.ok) {
         const data = await res.json()
         dispatch(addEntry(data.entry))
         return data;
      }
   }

export default function reducer(state={}, action) {
   let newState;
   switch(action.type) {
      case ADD_ENTRY:
         newState={...state};
         newState['entry'] = action.entry;
         return newState;
      default: return state; 
   }
}