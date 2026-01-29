import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const tokenFromStorage =
  typeof window !== "undefined" ? localStorage.getItem("token") : null;

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password, remember }, thunkAPI) => {
    const res = await fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      throw new Error("Login failed");
    }

    const data = await res.json(); // { token }

    if (remember) {
      localStorage.setItem("token", data.token);
    }

    return data;
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: tokenFromStorage,
    isAuthenticated: !!tokenFromStorage,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
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
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
        state.error = "Invalid username or password";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
