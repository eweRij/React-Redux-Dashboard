import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getUsersList,
  postNewUser,
  putEditedUser,
  deleteUser,
} from "../../utils/api";

export const fetchUsers = createAsyncThunk("users/setUsersData", async () => {
  return await getUsersList()
    .then((resp) => resp.data)
    .catch((err) => err);
});

export const addUserReq = createAsyncThunk("users/addUserReq", async (user) => {
  return await postNewUser(user)
    .then((resp) => resp.data)
    .catch((err) => err);
});

export const editUserReq = createAsyncThunk(
  "users/editUserReq",
  async (data) => {
    const { id, user } = data;
    return await putEditedUser(id, user)
      .then((resp) => resp.data)
      .catch((err) => err);
  }
);

export const removeUserReq = createAsyncThunk(
  "users/removeUserReq",
  async (id) => {
    return await deleteUser(id)
      .then((resp) => resp.data)
      .catch((err) => err);
  }
);

const initialState = [];

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      return [
        ...state,
        {
          id: action.payload.newUser.id,
          name: action.payload.newUser.name,
          username: action.payload.newUser.username,
          email: action.payload.newUser.email,
          address: { city: action.payload.newUser.city },
        },
      ];
    },
    editUser: (state, action) => {
      state.forEach((user, index) => {
        if (user.id === action.payload.newUser.id) {
          state[index] = {
            id: action.payload.newUser.id,
            name: action.payload.newUser.name,
            username: action.payload.newUser.username,
            email: action.payload.newUser.email,
            address: { ...state.address, city: action.payload.newUser.city },
          };
        }
        return state;
      });
    },
    removeUser: (state, action) => {
      return state.filter((user, index) => {
        return user.id !== action.payload.id;
      });
    },
    sortUsersAsc: (state, action) => {
      return state.sort((a, b) =>
        a.username > b.username ? 1 : b.username > a.username ? -1 : 0
      );
    },
    sortUsersDesc: (state, action) => {
      return state.sort((a, b) =>
        a.username > b.username ? -1 : b.username > a.username ? 1 : 0
      );
    },
  },
  extraReducers: {
    [fetchUsers.fulfilled.type]: (state, action) => {
      return action.payload;
    },
    [addUserReq.fulfilled.type]: (state, action) => {
      console.log(`New user fake posted : ${action.payload.name}`);
    },
    [editUserReq.fulfilled.type]: (state, action) => {
      console.log(`Edited user fake put with id: ${action.payload.id}`);
    },
    [removeUserReq.fulfilled.type]: (state, action) => {
      console.log(`User was fake deleted.`);
    },
  },
});
export const {
  actions: { addUser, editUser, removeUser, sortUsersAsc, sortUsersDesc },
} = usersSlice;

export const selectUsersData = (state) => state.users;

export default usersSlice.reducer;
