import { ListResponse } from './../../model/common';
import  studentApi  from 'api/studentApi';
import { PayloadAction } from '@reduxjs/toolkit';
import { studentActions } from './studentSlice';
import { takeLatest, call, put, debounce } from '@redux-saga/core/effects';
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

function* handleSearchDebouce(action: PayloadAction<ListParams>) {
  // console.log("student search debouce", action.payload)
  yield put(studentActions.setFilter(action.payload))
}


export default function* studentSaga() {
  //watch action
  yield takeLatest(studentActions.fetchStudentList, fetchStudentList)

  yield debounce(500, studentActions.setFilterWithDebouce.type, handleSearchDebouce);
}
