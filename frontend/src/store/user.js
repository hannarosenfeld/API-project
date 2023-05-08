import { csrfFetch } from "./csrf";

const LOAD_USERS = "users/LOAD_USERS"
const RECEIVE_USER = "users/RECEIVE_USER"

const loadUsers = (users) => ({
    type: LOAD_USERS,
    users
})

export const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user,
  });

const initialState = {}

export const getAllUsers = () => async dispatch => {
    const response = await csrfFetch(`/api/users`);

    if (response.ok) {
      const users = await response.json();
      dispatch(loadUsers(users));
    }
}

export const getOneUser = (userId) => async dispatch => {
    const response = await csrfFetch(`/api/users/${userId}`)

    if (response.ok) {
      const user = await response.json();
      dispatch(receiveUser(user))
    }
  }

const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOAD_USERS:
        const usersState= {};
        const usersArr = Object.values(action.users.Users)
        usersArr.forEach(user => {
          usersState[user.id] = user;
        });
        return usersState;
        case RECEIVE_USER:
          return { ...state, [action.user.id]: action.user };
      default:
        return state;
    }
  };

  export default userReducer;
