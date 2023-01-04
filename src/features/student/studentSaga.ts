import { ListResponse } from './../../model/common';
import  studentApi  from 'api/studentApi';
import { PayloadAction } from '@reduxjs/toolkit';
import { studentActions } from './studentSlice';
import { takeLatest, call, put } from '@redux-saga/core/effects';
import { ListParams, Student } from 'model';

function* fetchStudentList(action: PayloadAction<ListParams>) {  
  try {
    // gọi api
    const response: ListResponse<Student> = yield call(studentApi.getAll, action.payload)

    // dispatch action lên saga
    yield put(studentActions.fetchStudentListSuccess(response))
  } catch (error) {
    console.log('failed to fetch student list', error)
    yield put(studentActions.fetchStudentListFailed())
  }
}


export default function* studentSaga() {
  //watch action
  yield takeLatest(studentActions.fetchStudentList, fetchStudentList)

}
