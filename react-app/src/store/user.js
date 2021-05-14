const GET_USER = 'user/GET_USER'
const GET_FOLLOWS  = 'user/GET_FOLLOWS'
const ADD_FOLLOW = 'user/ADD_FOLLOW'
const SHOW_USERS = 'user/SHOW_USERS'
const REMOVE_FOLLOW = 'user/REMOVE_FOLLOW'

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

const showUsers = (users) => ({
   type: SHOW_USERS,
   users
})

const removeFollow = (follow) => ({
   type: REMOVE_FOLLOW,
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
   if (user_id === friend_id) return {errors: 'you cannot follow yourself'}
   const res = await fetch(`/api/users/follows`, {
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


export const unfollow = (followId) => async(dispatch) => {
        const res = await fetch(`/api/users/follows/${followId}`, {
         method: 'DELETE',
         headers: {'Content-Type': 'application/json'}
      })
      if (res.ok) {
         const data = await res.json()
         dispatch(removeFollow(data))
         // await setFollowing(false)
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

export const getUsers = () => async(dispatch) => {
   const res = await fetch(`/api/users/`)
   if(res.ok) {
      const data = await res.json();
      console.log(data, 'data from getUsers thunk')
      dispatch(showUsers(data))
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
         newState = {...state, ...action.follow}
         return newState;
      case GET_FOLLOWS:
         newState = {...state, ...action.follows}
         return newState;
      case SHOW_USERS:
         newState = {...state, ...action.users}
         return newState;
      case REMOVE_FOLLOW:
         const updatedFollows = state.follows.filter((follow) => follow.id !== action.deleted) 
         newState = {...state, ...updatedFollows}
         return newState;
      default: return state;
   }
}