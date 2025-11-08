// import { createSlice } from "@reduxjs/toolkit";


// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     user: null,
//     token: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     setLoading: (state, action) => {
//       state.loading = action.payload;
//     },

//     setUser: (state, action) => {
//       state.user = action.payload.user;
//       state.token = action.payload.token;
//       localStorage.setItem('token', action.payload.token);
//       localStorage.setItem('token', action.payload.token);
//     },

//     clearUser: (state) => {
//       state.user = null;
//       state.token = null;
//       localStorage.removeItem("token");
//     },

//     setError: (state, action) => {
//       state.error = action.payload;
//     },
//   },
// })

// export const { setLoading, setUser, clearUser, setError } = authSlice.actions;
// export default authSlice.reducer;


// redux/AuthSlice.jsx
import { createSlice } from "@reduxjs/toolkit";

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: user ? JSON.parse(user) : null,  
    token: token || null,
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

      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },

    clearUser: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setUser, clearUser, setError } = authSlice.actions;
export default authSlice.reducer;
