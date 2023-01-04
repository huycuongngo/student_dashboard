import { User } from './../../model/model';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LoginPayload {
  username?: string;
  password?: string;
  onSuccess(): void;
  onError(): void;
}

export interface LogoutPayload {
  onSuccess(): void;
}

export interface AuthState {
  isLoggedIn: boolean;
  logging: boolean;
  currentUser?: User;
}

const initialState: AuthState = {
  isLoggedIn: false,
  logging: false, 
  currentUser: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginPayload>) {
      state.logging = true;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.logging = false;
      state.currentUser = action.payload;
    },
    loginFailed(state, action: PayloadAction<string>) {
      state.logging = false;
    },
    logout(state, action: PayloadAction<LogoutPayload>) {
      state.isLoggedIn = false;
      state.currentUser = undefined;
    },
  },
});

//action
export const authAction = authSlice.actions;

//selector
export const selectIsLoggedIn = (state: any) => state.auth.isLoggedIn;
export const selectIsLogging = (state: any) => state.auth.logging;

//reducer
const authReducer = authSlice.reducer
export default authReducer