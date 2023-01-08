import { ListResponse } from './../../model';
import { cityActions } from './citySlice';
import { all, call, put, takeLatest } from '@redux-saga/core/effects';
import cityApi from 'api/cityApi';
import { City } from 'model';

function* fetchCityList() {
  try {
    const response: ListResponse<City> = yield call(cityApi.getAll)
    yield put(cityActions.fetchCityListSuccess(response))
  } catch (error) {
    yield put(cityActions.fetchCityListFail());
  }
}



export default function* citySaga() {
  yield takeLatest(cityActions.fetchCityList.type, fetchCityList)
}