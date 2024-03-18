/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';

import * as actions from './UserSlice';
import * as userApi from '../api/userApi';
import ILoginPayload from '../interfaces/ILoginPayload';
import IUserDataResponse from '../interfaces/IUserDataResponse';
import IRegisterPayload from '../interfaces/IRegisterPayload';
import IForgotPasswordPayload from '../interfaces/IForgotPasswordPayload';
import IResetPasswordPayload from '../interfaces/IResetPasswordPayload';
import IActive2FAResponse from '../interfaces/IActive2FAResponse';
import IVerify2FAPayload from '../interfaces/IVerify2FAPayload';
import IUpdateUserPayload from '../interfaces/IUpdateUserPayload';
import ICsrfTokenDataResponse from '../interfaces/ICsrfTokenDataResponse';

function* login(
  action: PayloadAction<ILoginPayload>,
): Generator<any, any, IUserDataResponse> {
  try {
    const { loginContent, password } = action.payload;
    const data = yield call(userApi.authenticate, loginContent, password);
    yield put(actions.loginSuccess(data));
    console.log('chamando a função de getCsrfToken');
    yield call(getCsrfToken);

    toast.success(data.message);
    return true;
  } catch (error) {
    if (error instanceof AxiosError) {
      yield put(
        actions.loginFailure({ message: error.response?.data.message }),
      );
      toast.error(error.response?.data.message);
    }
    return false;
  }
}

function* register(
  action: PayloadAction<IRegisterPayload>,
): Generator<any, any, Partial<IUserDataResponse>> {
  try {
    const { username, email, password } = action.payload;
    const data = yield call(userApi.register, username, email, password);
    yield put(actions.registerSuccess(data));
    toast.success(data.message);
    return true;
  } catch (error) {
    if (error instanceof AxiosError) {
      yield put(
        actions.registerFailure({ message: error.response?.data.message }),
      );
      toast.error(error.response?.data.message);
    }
    return false;
  }
}

function* forgotPassword(
  action: PayloadAction<IForgotPasswordPayload>,
): Generator<any, any, Partial<IUserDataResponse>> {
  try {
    const { email } = action.payload;
    const data = yield call(userApi.forgotPassword, email);
    yield put(actions.forgotPasswordSuccess(data));
    toast.success(data.message);
    return true;
  } catch (error) {
    if (error instanceof AxiosError) {
      yield put(
        actions.forgotPasswordFailure({
          message: error.response?.data.message,
        }),
      );
      toast.error(error.response?.data.message);
    }
    return false;
  }
}

function* resetPassword(
  action: PayloadAction<IResetPasswordPayload>,
): Generator<any, any, Partial<IUserDataResponse>> {
  try {
    const { password, confirmPassword, token } = action.payload;
    const data = yield call(
      userApi.resetPassword,
      password,
      confirmPassword,
      token,
    );
    yield put(actions.resetPasswordSuccess(data));
    toast.success(data.message);
    return true;
  } catch (error) {
    if (error instanceof AxiosError) {
      yield put(
        actions.resetPasswordFailure({ message: error.response?.data.message }),
      );
      toast.error(error.response?.data.message);
    }
    return false;
  }
}

function* active2FA(): Generator<any, any, Partial<IActive2FAResponse>> {
  try {
    const data = yield call(userApi.activate2FA);
    yield put(actions.active2FASuccess(data));
    toast.success(data.message);
    return true;
  } catch (error) {
    if (error instanceof Error) {
      yield put(actions.active2FAFailure({ message: error.message }));
    }
    return false;
  }
}

function* verify2FA(
  action: PayloadAction<IVerify2FAPayload>,
): Generator<any, any, Partial<IUserDataResponse>> {
  try {
    const { verifyCode } = action.payload;
    const data = yield call(userApi.verify2FA, verifyCode);
    yield put(actions.verify2FASuccess(data));
    toast.success(data.message);
    return true;
  } catch (error) {
    if (error instanceof AxiosError) {
      yield put(
        actions.verify2FAFailure({ message: error.response?.data.message }),
      );
      toast.error(error.response?.data.message);
    }
    return false;
  }
}

function* desactive2FA(
  action: PayloadAction<IVerify2FAPayload>,
): Generator<any, any, Partial<IUserDataResponse>> {
  try {
    const { verifyCode } = action.payload;
    const data = yield call(userApi.desactivate2FA, verifyCode);
    yield put(actions.desactive2FASuccess(data));
    toast.success(data.message);
    return true;
  } catch (error) {
    if (error instanceof AxiosError) {
      yield put(
        actions.desactive2FAFailure({ message: error.response?.data.message }),
      );
      toast.error(error.response?.data.message);
    }
    return false;
  }
}

function* updateUser(
  action: PayloadAction<IUpdateUserPayload>,
): Generator<any, any, Partial<IUserDataResponse>> {
  try {
    const { username, email, password } = action.payload;
    const data = yield call(userApi.update, username, email, password);
    yield put(actions.updateUserSuccess(data));
    toast.success(data.message);
    return true;
  } catch (error) {
    if (error instanceof AxiosError) {
      yield put(
        actions.updateUserFailure({ message: error.response?.data.message }),
      );
      toast.error(error.response?.data.message);
    }
    return false;
  }
}

function* logoutUser(): Generator<any, any, Partial<IUserDataResponse>> {
  try {
    const data = yield call(userApi.logout);
    yield put(actions.logoutSuccess(data));
    yield put(actions.clearCsrfToken);
    toast.success(data.message);
    return true;
  } catch (error) {
    if (error instanceof AxiosError) {
      yield put(
        actions.logoutFailure({ message: error.response?.data.message }),
      );
      toast.error(error.response?.data.message);
    }
    return false;
  }
}
function* deleteUser(): Generator<any, any, Partial<IUserDataResponse>> {
  try {
    const data = yield call(userApi.deleteUser);
    yield put(actions.deleteSuccess(data));
    toast.success(data.message);
    return true;
  } catch (error) {
    if (error instanceof AxiosError) {
      yield put(
        actions.deleteFailure({ message: error.response?.data.message }),
      );
      toast.error(error.response?.data.message);
    }
    return false;
  }
}

function* uploadImage(
  action: PayloadAction<FormData>,
): Generator<any, any, Partial<IUserDataResponse>> {
  try {
    const data = yield call(userApi.uploadImage, action.payload);
    yield put(actions.uploadImageSuccess(data));
    toast.success(data.message);
    return true;
  } catch (error) {
    if (error instanceof AxiosError) {
      yield put(
        actions.uploadImageFailure({ message: error.response?.data.message }),
      );
      toast.error(error.response?.data.message);
    }
    return false;
  }
}

function* getCsrfToken(): Generator<any, any, Partial<ICsrfTokenDataResponse>> {
  try {
    const { csrfToken } = yield call(userApi.getCsrfToken);
    console.log(
      'Na função getCsrfToken, despachando ação setCsrfToken com token:',
    );
    if (csrfToken) yield put(actions.setCsrfToken({ csrfToken }));
    return true;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error('Internal Server Error');
    }
    return false;
  }
}

function* clearCsrfToken(): Generator<any, any, Partial<IUserDataResponse>> {
  try {
    yield put(actions.clearCsrfToken);
    return true;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error('Internal Server Error');
    }
    return false;
  }
}

export function* watchFetchData() {
  yield takeEvery(actions.active2FARequest.type, active2FA);
  yield takeEvery(actions.desactive2FARequest.type, desactive2FA);
  yield takeEvery(actions.verify2FARequest.type, verify2FA);
  yield takeEvery(actions.loginRequest.type, login);
  yield takeEvery(actions.registerRequest.type, register);
  yield takeEvery(actions.forgotPasswordRequest.type, forgotPassword);
  yield takeEvery(actions.resetPasswordRequest.type, resetPassword);
  yield takeEvery(actions.updateUserRequest.type, updateUser);
  yield takeEvery(actions.logoutRequest.type, logoutUser);
  yield takeEvery(actions.deleteRequest.type, deleteUser);
  yield takeEvery(actions.uploadImageRequest.type, uploadImage);
  yield takeEvery(actions.clearCsrfToken.type, clearCsrfToken);
}
