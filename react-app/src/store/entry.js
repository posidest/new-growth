const ADD_ENTRY = 'entry/ADD_ENTRY';
const GET_ENTRIES = 'entry/GET_ENTRIES'

const addEntry = (entry) => ({
   type: ADD_ENTRY,
   entry
})

const getEntries = (entries) => ({
   type: GET_ENTRIES,
   entries
})

export const showEntries = (id) => async (dispatch) => {
   const res = await fetch(`/api/plants/${id}/entries`)
   if (res.ok) {
      const data = await res.json()
      dispatch(getEntries(data.entries))
      console.log(data, 'entries from thunk')
      return data
   }
}





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
         console.log(data, 'data from entries form')
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
      case GET_ENTRIES:
         newState = {...state}
         newState['entries'] = action.entries;
         return newState;
      default: return state; 
   }
}