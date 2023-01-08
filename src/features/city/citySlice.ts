import { RootState } from './../../app/store';
import { ListResponse } from './../../model/common';
import { City } from 'model';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CityState {
  loading: boolean;
  list: City[];
}

const initialState: CityState = {
  loading: false,
  list: [],
};

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    fetchCityList(state) {
      state.loading = true;
    },
    fetchCityListSuccess(state, action: PayloadAction<ListResponse<City>>) {
      state.loading = false;
      state.list = action.payload.data;
    },
    fetchCityListFail(state) {
      state.loading = false;
    },
  },
});

// Actions
export const cityActions = citySlice.actions;

// Selector
export const selectCityList = (state: RootState) => state.city.list;
export const selectCityMap = createSelector(selectCityList, (cityList) =>
  cityList.reduce((map: {[key: string]: City}, city) => {
    map[city.code] = city
    return map;
  }, {})
)
export const selectCityOption = createSelector(selectCityList, (cityList) => 
  cityList.map((city) => ({
    label: city.name,
    value: city.code,
  }))
)

// Reducers
const cityReducer = citySlice.reducer;
export default cityReducer;
