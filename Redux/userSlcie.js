import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk("user/me", async (token , {rejectWithValue}) => {
  try {
    const res = await axios.get("http://192.168.1.17:5000/api/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue(err.message);
  }
});
export const updateUser = createAsyncThunk(
  "user/update",
  async (updatedData, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        "http://192.168.1.17:5000/api/users/update",
        updatedData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return res.data;
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue(err.message);
    }
  }
);
const userSlice = createSlice({
    name: "user",
    initialState: {
        user: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
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
  });
    },
});


const userReducer = userSlice.reducer;
export default userReducer ;
