import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk("user/me", async (token , {rejectWithValue}) => {
  try {
    const res = await axios.get("http://localhost:5000/api/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Fetched user:", res.data);
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
  async ({updatedData,id}, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/users/${id}`,
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
export const fetchUserById = createAsyncThunk(
  "user/fetchById",
  async (id, { rejectWithValue }) => {
    try {
<<<<<<< Updated upstream
      const res = await axios.get(`http://localhost:5000/api/users/${id}`);
=======
      const res = await axios.get(`${BASE_URL}/users/${id}`);
      console.log("Fetched user by ID:", res.data);
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
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
  })
  .addCase(fetchUserById.pending, (state) => {
    state.loading = true;
    state.error = null;
  })
  .addCase(fetchUserById.fulfilled, (state, action) => {
    state.user = action.payload;
    state.loading = false;
  })
  .addCase(fetchUserById.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });
    },
=======
  name: "user",
  initialState: {
    user: null,
    viewedUser: {},
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
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
       state.viewedUser = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
>>>>>>> Stashed changes
});


const userReducer = userSlice.reducer;
export default userReducer ;
