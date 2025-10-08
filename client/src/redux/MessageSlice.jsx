import { createSlice } from '@reduxjs/toolkit';


const MessageSlice = createSlice({
  name: 'chat',
  initialState: {
    users: [],
    selectedUser: null,
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },

    selectUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
});

export const {setUsers, selectUser } = MessageSlice.actions;
export default MessageSlice.reducer;