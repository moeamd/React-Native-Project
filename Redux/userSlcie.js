import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../config";

// جلب بيانات المستخدم الحالي
export const fetchUser = createAsyncThunk(
  "user/me",
  async (token, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Fetched user:", res.data);
      return res.data;
    } catch (err) {
      if (err.response && err.response.data) return rejectWithValue(err.response.data);
      return rejectWithValue(err.message);
    }
  }
);

// تحديث بيانات المستخدم
export const updateUser = createAsyncThunk(
  "user/update",
  async ({ updatedData, id }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${BASE_URL}/users/${id}`, updatedData, {
        headers: { "Content-Type": "application/json" },
      });
      return res.data;
    } catch (err) {
      if (err.response && err.response.data) return rejectWithValue(err.response.data);
      return rejectWithValue(err.message);
    }
  }
);

// جلب بيانات مستخدم آخر بالـ ID
export const fetchUserById = createAsyncThunk(
  "user/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/users/${id}`);
      console.log("Fetched user by ID:", res.data);
      return res.data;
    } catch (err) {
      if (err.response && err.response.data) return rejectWithValue(err.response.data);
      return rejectWithValue(err.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,          // بيانات المستخدم الحالي
    viewedUser: {},      // بيانات المستخدم اللي بتتشاف صفحته
    isLoggedIn: false,   // حالة تسجيل الدخول
    loading: false,
    error: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchUser
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // updateUser
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetchUserById
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.viewedUser = action.payload.user || action.payload;
        state.loading = false;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
