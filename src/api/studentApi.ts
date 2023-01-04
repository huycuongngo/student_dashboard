import { Student } from 'model';
import { ListParams, ListResponse } from './../model/common';
import axiosClient from './axiosClient';

const studentApi = {
  getAll(params: ListParams): Promise<ListResponse<Student>> {
    const url = '/students';
    return axiosClient.get(url, { params });
  },
  getStudentById(id: String): Promise<Student> {
    const url = `/students/${id}`;
    return axiosClient.get(url);
  },
  addNewStudent(payload: Student): Promise<Student> {
    const url = '/students';
    return axiosClient.post(url, { payload });
  },
  updateStudent(id: String, payload: Student): Promise<Student> {
    const url = `/students/${id}`;
    return axiosClient.patch(url, { payload });
  },
  deleteStudent(id: String): Promise<any> {
    const url = `/students/${id}`;
    return axiosClient.delete(url);
  },
};

export default studentApi;
