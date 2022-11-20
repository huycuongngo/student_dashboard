import { PayloadAction } from '@reduxjs/toolkit';
import { takeEvery } from '@redux-saga/core/effects';
import { increment } from './counterSlice';

export function* log(action: PayloadAction) {
  console.log('log', action);
}

export default function* counterSaga() {
  console.log('hello counterSaga');

  // tôi muốn lắng nghe tất cả các action
  // mình có thể chỉ định một action cụ thể đã khai báo trong slice rồi
  yield takeEvery(increment().type, log);
}
