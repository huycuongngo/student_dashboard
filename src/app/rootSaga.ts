import counterSaga from "features/counter/counterSaga";
import { all } from "@redux-saga/core/effects";
import { authSaga } from "features/auth/authSaga";
import dashboardSaga from "features/dashboard/dashboardSaga";
import studentSaga from "features/student/studentSaga";


// khi store đc khởi tạo lên thì nó sẽ chạy root saga
// root saga nó sẽ kích hoạt chạy 1 loạt các saga con
export default function* rootSaga() {
  console.log("root saga");
  yield all([
    counterSaga(),
    authSaga(),
    dashboardSaga(),
    studentSaga(),
  ]);
}
