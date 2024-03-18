import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import IUserState from '../interfaces/IUserState';
import ILoginPayload from '../interfaces/ILoginPayload';
import IRegisterPayload from '../interfaces/IRegisterPayload';
import IForgotPasswordPayload from '../interfaces/IForgotPasswordPayload';
import IResetPasswordPayload from '../interfaces/IResetPasswordPayload';
import IUpdateUserPayload from '../interfaces/IUpdateUserPayload';
import IUserDataResponse from '../interfaces/IUserDataResponse';
import IVerify2FAPayload from '../interfaces/IVerify2FAPayload';

const initialState: IUserState = {
  isLogged: false,
  success: false,
  isLoading: false,
  message: '',
  twoStep: false,
  twoFactorChecked: false,
  token: '',
  twoStepQRCodeUrl: '',
  imageUrl: '',
  csrfToken: '',
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Login
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    loginRequest: (state, _action: PayloadAction<ILoginPayload>) => {
      state.isLoading = true;
    },
    loginFailure: (state, action: PayloadAction<Partial<IUserState>>) => {
      state.isLoading = false;
      state.message = action.payload.message ?? 'Error';
      state.success = false;
    },
    loginSuccess: (
      state,
      action: PayloadAction<Partial<IUserDataResponse>>,
    ) => {
      state.isLoading = false;
      state.message = action.payload.message ?? 'Success';
      state.success = true;
      state.isLogged = true;
      state.twoStep = action.payload.user?.twoStep ?? false;
      state.twoStepQRCodeUrl = action.payload.twoStepQRCodeUrl ?? '';
      state.token = action.payload.token ?? '';
      state.imageUrl = action.payload.imageUrl ?? '';
    },

    // Register
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    registerRequest: (state, _action: PayloadAction<IRegisterPayload>) => {
      state.isLoading = true;
    },
    registerFailure: (state, action: PayloadAction<Partial<IUserState>>) => {
      state.isLoading = false;
      state.message = action.payload.message ?? 'Error';
      state.success = false;
    },
    registerSuccess: (state, action: PayloadAction<Partial<IUserState>>) => {
      state.isLoading = false;
      state.success = true;
      state.message = action.payload.message ?? 'Success';
    },

    // forgotPassword
    forgotPasswordRequest: (
      state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _action: PayloadAction<IForgotPasswordPayload>,
    ) => {
      state.isLoading = true;
    },
    forgotPasswordFailure: (
      state,
      action: PayloadAction<Partial<IUserState>>,
    ) => {
      state.isLoading = false;
      state.success = false;
      state.message = action.payload.message ?? 'Error';
    },
    forgotPasswordSuccess: (
      state,
      action: PayloadAction<Partial<IUserState>>,
    ) => {
      state.isLoading = false;
      state.success = true;
      state.message = action.payload.message ?? 'Success';
    },

    // resetPassword
    resetPasswordRequest: (
      state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _action: PayloadAction<IResetPasswordPayload>,
    ) => {
      state.isLoading = true;
    },
    resetPasswordFailure: (
      state,
      action: PayloadAction<Partial<IUserState>>,
    ) => {
      state.isLoading = false;
      state.message = action.payload.message ?? 'Error';
      state.success = false;
    },
    resetPasswordSuccess: (
      state,
      action: PayloadAction<Partial<IUserState>>,
    ) => {
      state.isLoading = false;
      state.message = action.payload.message ?? 'Success';
      state.success = true;
    },

    // active2FA
    active2FARequest: (state) => {
      state.isLoading = true;
    },
    active2FAFailure: (state, action: PayloadAction<Partial<IUserState>>) => {
      state.isLoading = false;
      state.message = action.payload.message ?? 'Error';
      state.success = false;
    },
    active2FASuccess: (state, action: PayloadAction<Partial<IUserState>>) => {
      state.isLoading = false;
      state.message = action.payload.message ?? 'Success';
      state.twoStep = true;
      state.success = true;
      state.twoStepQRCodeUrl = action.payload.twoStepQRCodeUrl ?? 'default';
    },

    // desactive2FA
    desactive2FARequest: (
      state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _action: PayloadAction<IVerify2FAPayload>,
    ) => {
      state.isLoading = true;
    },
    desactive2FAFailure: (
      state,
      action: PayloadAction<Partial<IUserState>>,
    ) => {
      state.isLoading = false;
      state.message = action.payload.message ?? 'Error';
      state.success = false;
    },
    desactive2FASuccess: (
      state,
      action: PayloadAction<Partial<IUserState>>,
    ) => {
      state.isLoading = false;
      state.message = action.payload.message ?? 'Success';
      state.twoStep = false;
      state.success = true;
      state.twoFactorChecked = false;
      state.twoStepQRCodeUrl = '';
    },

    // verify2FA
    verify2FARequest: (
      state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _action: PayloadAction<IVerify2FAPayload>,
    ) => {
      state.isLoading = true;
    },
    verify2FAFailure: (state, action: PayloadAction<Partial<IUserState>>) => {
      state.isLoading = false;
      state.message = action.payload.message ?? 'Error';
      state.twoFactorChecked = false;
      state.success = false;
    },
    verify2FASuccess: (
      state,
      action: PayloadAction<Partial<IUserDataResponse>>,
    ) => {
      state.isLoading = false;
      state.message = action.payload.message ?? 'Success';
      state.twoFactorChecked = true;
      state.success = true;
    },

    // updateUser
    updateUserRequest: (
      state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _action: PayloadAction<IUpdateUserPayload>,
    ) => {
      state.isLoading = true;
    },
    updateUserFailure: (state, action: PayloadAction<Partial<IUserState>>) => {
      state.isLoading = false;
      state.message = action.payload.message ?? 'Error';
      state.success = false;
    },
    updateUserSuccess: (state, action: PayloadAction<Partial<IUserState>>) => {
      state.isLoading = false;
      state.message = action.payload.message ?? 'Success';
      state.token = action.payload.token ?? '';
      state.success = true;
    },
    // logoutUser
    logoutRequest: (
      state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ) => {
      state.isLoading = true;
    },
    logoutFailure: (state, action: PayloadAction<Partial<IUserState>>) => {
      state.isLoading = false;
      state.message = action.payload.message ?? 'Error';
      state.success = false;
    },
    logoutSuccess: (state, action: PayloadAction<Partial<IUserState>>) => {
      Object.assign(state, initialState);
      state.message = action.payload.message ?? 'Success';
      state.success = true;
    },
    // deleteUser
    deleteRequest: (
      state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ) => {
      state.isLoading = true;
    },
    deleteFailure: (state, action: PayloadAction<Partial<IUserState>>) => {
      state.isLoading = false;
      state.message = action.payload.message ?? 'Error';
      state.success = false;
    },
    deleteSuccess: (state, action: PayloadAction<Partial<IUserState>>) => {
      Object.assign(state, initialState);
      state.message = action.payload.message ?? 'Success';
      state.success = true;
    },

    // uploadImage
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    uploadImageRequest: (state, action: PayloadAction<FormData>) => {
      state.isLoading = true;
    },
    uploadImageFailure: (state, action: PayloadAction<Partial<IUserState>>) => {
      state.isLoading = false;
      state.message = action.payload.message ?? 'Error';
      state.success = false;
    },
    uploadImageSuccess: (state, action: PayloadAction<Partial<IUserState>>) => {
      state.isLoading = false;
      state.imageUrl = action.payload.imageUrl ?? '';
      state.message = action.payload.message ?? 'Success';
      state.success = true;
    },

    // csrfToken
    setCsrfToken: (state, action: PayloadAction<Partial<IUserState>>) => {
      state.csrfToken = action.payload.csrfToken ?? '';
      state.message = action.payload.message ?? 'Success';
      state.success = true;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    clearCsrfToken: (state) => {
      state.isLoading = false;
      state.csrfToken = '';
      state.success = true;
    },
  },
});

export default UserSlice.reducer;
export const {
  active2FAFailure,
  active2FARequest,
  active2FASuccess,
  desactive2FAFailure,
  desactive2FARequest,
  desactive2FASuccess,
  forgotPasswordFailure,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  loginFailure,
  loginRequest,
  loginSuccess,
  registerFailure,
  registerRequest,
  registerSuccess,
  resetPasswordFailure,
  resetPasswordRequest,
  resetPasswordSuccess,
  verify2FAFailure,
  verify2FARequest,
  verify2FASuccess,
  updateUserFailure,
  updateUserRequest,
  updateUserSuccess,
  logoutFailure,
  logoutRequest,
  logoutSuccess,
  deleteFailure,
  deleteRequest,
  deleteSuccess,
  uploadImageFailure,
  uploadImageRequest,
  uploadImageSuccess,
  clearCsrfToken,
  setCsrfToken,
} = UserSlice.actions;
