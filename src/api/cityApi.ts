import { City } from 'model';
import { ListResponse } from './../model/common';
import axiosClient from './axiosClient';

const cityApi = {
  // kết quả trả về của hàm getAll() là 1 promise, dữ liệu trả về từ Promise có kiểu ListResponse
  getAll(): Promise<ListResponse<City>> {
    const url = '/cities';
    return axiosClient.get(url, {
      params: {
        _page: 1,
        _limit: 10,
      },
    });
  },
};

export default cityApi;
