import { City } from './../../model/city';
import { ListResponse, Student } from './../../model/index';
import { dashboardAction, RankingByCity } from './dashboardSlice';
import { all, takeLatest, call, put } from '@redux-saga/core/effects';
import studentApi from 'api/studentApi';
import cityApi from 'api/cityApi';

function* fetchStatistics() {
  const responseList: Array<ListResponse<Student>> = yield all([
    call(studentApi.getAll, { _page: 1, _limit: 1, gender: 'male' }),
    call(studentApi.getAll, { _page: 1, _limit: 1, gender: 'female' }),
    call(studentApi.getAll, { _page: 1, _limit: 1, mark_gte: 8 }),
    call(studentApi.getAll, { _page: 1, _limit: 1, mark_lte: 5 }),
  ]);

  const statisticsList = responseList.map((x) => x.pagination._totalRows);
  const [maleCount, femaleCount, highMarkCount, lowMarkCount] = statisticsList;
  yield put(dashboardAction.setStatistics({ maleCount, femaleCount, highMarkCount, lowMarkCount }));
}

function* fetchHighestMarkStudentList() {
  const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: 'mark',
    _order: 'desc',
  });
  yield put(dashboardAction.setHighestStudentList(data));
}

function* fetchLowestMarkStudentList() {
  const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: 'mark',
    _order: 'asc',
  });
  yield put(dashboardAction.setLowestStudentList(data));
}

function* fetchRankingByCityList() {
  //fetch city list
  const { data: cityList }: ListResponse<City> = yield call(cityApi.getAll);

  //fetch ranking per city
  const callList = cityList.map((x) =>
    call(studentApi.getAll, {
      _page: 1,
      _limit: 5,
      _sort: 'mark',
      _order: 'desc',
      city: x.code,
    })
  );
  const responseList: Array<ListResponse<Student>> = yield all(callList)
  const rankingByCityList: RankingByCity[] = responseList.map((x, idx) => ({
    cityId: cityList[idx].code,
    cityName: cityList[idx].name,
    rankingList: x.data
  }))



  //update state
  yield put(dashboardAction.setRankingCityList(rankingByCityList))
}

function* fetchDashboardData() {
  try {
    yield all([
      call(fetchStatistics),
      call(fetchHighestMarkStudentList),
      call(fetchLowestMarkStudentList),
      call(fetchRankingByCityList),
    ]);

    yield put(dashboardAction.fetchDataSuccess())
  } catch (error) {
    console.log('Failed to fetch dashboard data', error);
    yield put(dashboardAction.fetchDataError());
  }
}

// dashboardSaga se lang nghe moi lan minh dispatch fetchData thi no se thuc thi ham fetchDashboardData
export default function* dashboardSaga() {
  yield takeLatest(dashboardAction.fetchData.type, fetchDashboardData);
}
