const GET_USER = 'user/GET_USER'

const getUser = (user) => ({
   type: GET_USER,
   user
})

export const showUser = (id) => async(dispatch) => {
   const res = await fetch(`/api/users/${id}`)
   if (res.ok) {
      const data = await res.json()
      console.log(data, 'data from user thunk')
      dispatch(getUser(data))
      return data
   }
}


export default function reducer(state={}, action) {
   let newState;
   switch(action.type) {
      case GET_USER:
         newState= {...state}
         newState['user'] = action.user;
         return newState;
      default: return state;
   }
}