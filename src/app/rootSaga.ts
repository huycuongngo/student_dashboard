import counterSaga from "features/counter/counterSaga";
import { all } from "@redux-saga/core/effects";


// mỗi feature là 1 saga, ví dụ counter có counter saga
// mỗi saga là 1 generator function
function* helloSaga() {
  console.log("hello saga")
}



// khi store đc khởi tạo lên thì nó sẽ chạy root saga
// root saga nó sẽ kích hoạt chạy 1 loạt các saga con
export default function* rootSaga() {
  console.log("root saga");
  yield all([helloSaga(), counterSaga()]);
}

// khi mình dispatch 1 action từ component lên redux store thì nó 
// phải qua các middleware trc rồi mới vào dispatcher