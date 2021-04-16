const GET_USER = 'user/GET_USER'
const GET_FOLLOWS  = 'user/GET_FOLLOWS'
const ADD_FOLLOW = 'user/ADD_FOLLOW'

const getUser = (user) => ({
   type: GET_USER,
   user
})

const getFollows = (follows) => ({
   type: GET_FOLLOWS,
   follows
})

const addFollow = (follow) => ({
   type: ADD_FOLLOW,
   follow
})

export const showFollows = (id) => async(dispatch) => {
   const res = await fetch(`/api/users/${id}/follows`)
   if (res.ok) {
      const data = await res.json()
      dispatch(getFollows(data))
      return data
   }
} 

export const newFollow = (follow) => async(dispatch) => {
   const {user_id, friend_id} = follow;
   const res = await fetch(`/api/users/${user_id}/follows`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
         user_id,
         friend_id
      })
   });
   if (res.ok) {
      const data = await res.json()
      dispatch(addFollow(data))
      return data
   }
}


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
      case ADD_FOLLOW:
         newState = {...state}
         newState['follow'] = action.follow;
         return newState;
      case GET_FOLLOWS:
         newState = {...state}
         newState['follows'] = action.follows;
         return newState;
      default: return state;
   }
}