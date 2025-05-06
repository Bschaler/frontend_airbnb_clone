// frontend/src/store/session.js
import { csrfFetch } from './csrf';

const SET_SESSION_USER = 'session/SET_USER';
const REMOVE_SESSION_USER = 'session/REMOVE_USER';

const setSessionUser = (user) => ({
  type: SET_SESSION_USER,
  payload: user
});

const removeSessionUser = () => ({
  type: REMOVE_SESSION_USER
});

export const login = (credentials) => async (dispatch) => {
  const { credential, password } = credentials;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({ credential, password })
  });
  
  if (response.ok) {
    const userData = await response.json();
    dispatch(setSessionUser(userData.user));
    return userData;
  }
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SESSION_USER:
      return { ...state, user: action.payload };
    case REMOVE_SESSION_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default sessionReducer;