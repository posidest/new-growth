const GET_PROFILES = 'profile/getProfiles';
const GET_PROFILE = 'profile/getProfile';

const getProfiles = (profiles) => ({
   type: GET_PROFILES,
   profiles
})

const getProfile = (profile) => ({
   type: GET_PROFILE,
   profile
})


export const showProfiles = () => async (dispatch) => {
   const res = await fetch('/api/profiles/')
   if (res.ok) {
      const data = await res.json()
      console.log(data, 'data from thunk')
      dispatch(getProfiles(data.profiles))
      return data;
   }
}

export const showProfile = (id) => async(dispatch) => {
   const res = await fetch(`/api/profiles/${id}`)
   if (res.ok) {
      const data = await res.json()
      dispatch(getProfile(data.profile))
      return data;
   }
}


export default function reducer(state={}, action) {
   let newState;
   switch(action.type) {
      case GET_PROFILES:
         newState={...state, ['profiles']: action.profiles};
         return newState;
      case GET_PROFILE:
         newState={...state, ['profile']: action.profile}
         return newState;
      default:
         return state;
   }
}