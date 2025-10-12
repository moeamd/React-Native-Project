// Redux/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Login without api
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      // login 
      if (
        (credentials.email === "test@test.com" || credentials.email === "0123456789") &&
        credentials.password === "123456"
      ) {
        return {
          token: "fakeToken123",
          user: { name: "Test User", email: credentials.email },
        };
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (err) {
      return rejectWithValue(err.message || "Error in login");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
