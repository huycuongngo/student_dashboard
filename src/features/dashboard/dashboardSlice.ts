import { RootState } from './../../app/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Student } from '../../model/index';

export interface DashboardStatistics {
  maleCount: number;
  femaleCount: number;
  highMarkCount: number;  
  lowMarkCount: number;
}

export interface RankingByCity {
  cityId: string;
  cityName: string;
  rankingList: Student[];
}

export interface DashboardState {
  loading: boolean;
  statistics: DashboardStatistics;
  highestStudentList: Student[];
  lowestStudentList: Student[];
  rankingByCityList: RankingByCity[]
}

const initialState: DashboardState = {
  loading: false,
  statistics: {
    maleCount: 0,
    femaleCount: 0,
    highMarkCount: 0,
    lowMarkCount: 0,
  },
  highestStudentList: [],
  lowestStudentList: [],
  rankingByCityList: [],
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    // show loading when fetching data
    fetchData(state) {
      state.loading = true
    },
    fetchDataSuccess(state) {
      state.loading = false
    },
    fetchDataError(state) {
      state.loading = false
    },
    setStatistics(state, action: PayloadAction<DashboardStatistics>) {
      state.statistics = action.payload
    },
    setHighestStudentList(state, action: PayloadAction<Student[]>) {
      state.highestStudentList = action.payload
    },
    setLowestStudentList(state, action: PayloadAction<Student[]>) {
      state.lowestStudentList = action.payload
    },
    setRankingCityList(state, action: PayloadAction<RankingByCity[]>) {
      state.rankingByCityList = action.payload 
    },
  }
})

//export actions
export const dashboardAction = dashboardSlice.actions

//export selectors
export const selectDashboardLoading = (state: RootState) => state.dashboard.loading
export const selectDashboardStatistics = (state: RootState) => state.dashboard.statistics
export const selectHighestMarkStudentList = (state: RootState) => state.dashboard.highestStudentList;
export const selectLowestMarkStudentList = (state: RootState) => state.dashboard.lowestStudentList
export const selectRankingByCityList = (state: RootState) => state.dashboard.rankingByCityList;

//export reducers
const dashboardReducer = dashboardSlice.reducer;
export default dashboardReducer;
