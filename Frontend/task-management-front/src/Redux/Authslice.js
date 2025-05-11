import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, setAuthHeader, api } from "../api/api";

// LOGIN
export const login = createAsyncThunk("auth/login", async (userData) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/api/login`, userData);
    localStorage.setItem("token", data.jwt);
    return data;
  } catch (error) {
    throw Error(error.response?.data?.error || "Login failed");
  }
});

// SIGNUP
export const signup = createAsyncThunk("auth/signup", async (userData) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/api/signup`, userData);
    return data;
  } catch (error) {
    throw Error(error.response?.data?.error || "Signup failed");
  }
});

// LOGOUT
export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    localStorage.removeItem("token");
    api.defaults.headers.common["Authorization"] = null;
  } catch (error) {
    throw Error(error.message);
  }
});

// GET USER PROFILE
export const getUserProfile = createAsyncThunk(
  "auth/getUserProfile",
  async (token) => {
    setAuthHeader(token, api);
    try {
      const { data } = await api.get(`/auth/getProfile`);

      return data;
    } catch (error) {
      throw Error(error.response?.data?.error || "Failed to fetch profile");
    }
  }
);

// GET ALL USERS
export const getUsersList = createAsyncThunk(
  "auth/getUsersList",
  async (token) => {
    setAuthHeader(token, api);
    try {
      const { data } = await api.get(`/auth/users`);

      return data;
    } catch (error) {
      throw Error(error.response?.data?.error || "Failed to fetch users");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    users: [],
    token: localStorage.getItem("token") || null,
    loggedIn: !!localStorage.getItem("token"),
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.jwt;
        state.loggedIn = true;
        state.user = action.payload.user || null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.loggedIn = false;
      })

      // SIGNUP
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.loggedIn = false;
      })

      // PROFILE
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.loggedIn = true;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.loggedIn = false;
      })

      // USERS LIST
      .addCase(getUsersList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsersList.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.loggedIn = true;
      })
      .addCase(getUsersList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.loggedIn = false;
      })

      // LOGOUT
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.loggedIn = false;
        state.user = null;
        state.users = [];
        state.error = null;
      });
  },
});

export default authSlice.reducer;
