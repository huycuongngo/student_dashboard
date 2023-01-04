import { PayloadAction } from '@reduxjs/toolkit';
import { takeEvery, delay, takeLatest, put, call } from '@redux-saga/core/effects';
import { increment, incrementSaga, incrementSagaSuccess } from './counterSlice';
import { fetchCount } from './counterAPI';

// export function* log(action: PayloadAction) {
//   console.log('log', action);
// }
function* test() {
  // hàm fetchCount này trả về 1 promise
  yield fetchCount(2)

  // hàm call trả về 1 effect object
  yield call(fetchCount, 2)
}

function* handleIncrementSaga(action: PayloadAction<number>) {
  console.log("waiting 2s");
  yield delay(2000);
  console.log("waiting done, dispatch actions")
  yield put(incrementSagaSuccess(action.payload))
}

export default function* counterSaga() {
  console.log('hello counterSaga');

  // tôi muốn lắng nghe tất cả các action
  // mình có thể chỉ định một action cụ thể đã khai báo trong slice rồi
  yield takeEvery(incrementSaga.toString(), handleIncrementSaga);
  // yield takeLatest(incrementSaga.toString(), handleIncrementSaga);
}
