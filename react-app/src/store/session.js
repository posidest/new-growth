const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => ({
    type: SET_USER,
    payload: user
})

const removeUser = () => ({
    type: REMOVE_USER
})

export const authenticate = () => async(dispatch) => {
  const res = await fetch('/api/auth/',{
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (res.ok) {
      const data = await res.json()
      dispatch(setUser(data.user))
      return data;
  }
}

export const login = (email, password) => async (dispatch) => {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });
  if (res.ok) {
      const data = await res.json()
      dispatch(setUser(data.user))
      return data;
  }
}

export const logout = () => async (dispatch) => {
  const res = await fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    }
  });
  if (res.ok) {
      const data = await res.json()
      dispatch(removeUser(data.user))
      return data;
  }
};


export const signUp = (user) => async (dispatch) => {
  const { avatar, username, email, bio, zone, password } = user;
  const res = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      avatar,
      bio,
      zone,
      password,
    }),
  });
  if (res.ok) {
      const data = await res.json()
      dispatch(setUser(data.user))
      return data;
  }
}



export default function reducer(state = {}, action) {
    let newState;
    switch (action.type) {
        case SET_USER:
            newState = { ...state, ['user']: action.payload }
            return newState;
        case REMOVE_USER:
            delete state.user;
            newState = { ...state };
            newState.user = null;
            return newState;
        default: return state;
    }
}


