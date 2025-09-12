
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { showMessage } from '../../utils/uiSlice';

// Register thunk
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ name, email, password, role }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/auth/signup', { name, email, password, role });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Registration failed');
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  }
);

// Fetch all users
export const fetchUsers = createAsyncThunk(
  "admin/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/auth/users");
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch users"
      );
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async ({ name, email, phone, location, token }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        "/api/auth/user/update",
        { name, email, phone, location },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "User Profile Update failed"
      );
    }
  }
);

export const uploadProfilePic = createAsyncThunk(
  "auth/uploadProfilePic",
  async ({ file, token }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("profilePic", file);

      const response = await axios.put("/api/auth/profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Profile Picture Upload failed"
      );
    }
  }
);

export const addAchievement = createAsyncThunk(
  "auth/addAcheivement",
  async ({ image, description, token }, { dispatch, rejectWithValue }) => {

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("description", description);

      const response = await axios.post("/api/auth/achievements", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })

      dispatch(showMessage({ message: "Achievement Uploaded Successfully", type: 'success' }));

      console.log("response from slice : ", response.data.achievements)

      return response.data.achievements;
    } catch (error) {
      dispatch(
        showMessage({
          message: error.response?.data?.message || "Achievement upload failed",
          type: "error",
        })
      );
      return rejectWithValue(
        error.response?.data?.message || "Achievement upload failed"
      )
    }
  }
)

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  usersData: [],
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
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
        state.user = action.payload;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        // localStorage.setItem('user', JSON.stringify(state.user));
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(uploadProfilePic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadProfilePic.fulfilled, (state, action) => {
        state.loading = false;
        state.user.profilePic = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(uploadProfilePic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.usersData = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addAchievement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAchievement.fulfilled, (state, action) => {
        state.loading = false;
        state.user.achievements = action.payload;  // poora user replace hoga
        localStorage.setItem("user", JSON.stringify(action.payload)); // localStorage bhi update karo
      })
      .addCase(addAchievement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
