import { delay, call, put, fork, take, takeEvery, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { LoginPayload, authAction, LogoutPayload } from './authSlice';

function* handleLogin(payload: LoginPayload) {
  try {
    // console.log('handle login', payload)
    yield delay(1000);
    localStorage.setItem('access_token', 'abc');
    //sau khi đăng nhập thành công, mình sẽ dispatch 1 action
    yield put(
      authAction.loginSuccess({
        id: 1,
        name: 'cuong',
      })
    );
    payload.onSuccess()
  } catch (error:any) {
    yield put(authAction.loginFailed(error.message))
  }
}

function* handleLogout(payload: LogoutPayload) {
  yield delay(500)
  // console.log('handle logout')
  localStorage.removeItem('access_token')
  // redirect to login page
  payload.onSuccess()
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'))
    if (!isLoggedIn) {
      // chờ user dispatch 1 actions login
      const action: PayloadAction<LoginPayload> = yield take(authAction.login.type);

      //khi xử lý xong dòng fork thì coi như xong, có dispatch action login cũng ko có tác dụng
      yield fork(handleLogin, action.payload);
    }

    // chờ user dispatch 1 actions login
    const action: PayloadAction<LogoutPayload> = yield take(authAction.logout.type);
    yield call(handleLogout, action.payload);
  }
}

export function* authSaga() {
  yield fork(watchLoginFlow)
}
