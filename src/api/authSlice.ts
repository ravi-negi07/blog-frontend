import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  role?: string;
  email?: string | number;
}

interface AuthState {
  isAuthenticated: boolean;
  user: any;
  token: string | null;
  role: string;
  email: string | number;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  email: "",
  role: "reader",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: any; token: string }>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("tokem", state.token);
      const decodedToken: DecodedToken = jwtDecode(action.payload.token);
      state.role = decodedToken?.role || "reader";
      state.email = decodedToken?.email || "ravi";
      localStorage.setItem("authToken", action.payload.token);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.role = "reader";
      localStorage.removeItem("authToken");
    },
    updateUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
  },
});

export const { login, logout, updateUser } = authSlice.actions;

export default authSlice.reducer;
