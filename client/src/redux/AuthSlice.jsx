import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
    },

    clearUser: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },
})

export const { setLoading, setUser, clearUser, setError } = authSlice.actions;
export default authSlice.reducer;