import { createSlice } from '@reduxjs/toolkit';

const MessageSlice = createSlice({
  name: 'chat',
  initialState: {
    users: [],
    selectedUser: null,
    messages: {}, 
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },

    selectUser: (state, action) => {
      state.selectedUser = action.payload;
    },

    setMessages: (state, action) => {
      const { userId, messages } = action.payload;
      state.messages[userId] = messages;
    },

    
    addMessage: (state, action) => {
      const { userId, message } = action.payload;
      if (!state.messages[userId]) {
        state.messages[userId] = [];
      }
      state.messages[userId].push(message);
    },
  },
});

export const { setUsers, selectUser, setMessages, addMessage } =
  MessageSlice.actions;
export default MessageSlice.reducer;
