định nghĩa kiểu dữ liệu trong folder model
gắn api cho city
gắn api cho student

getAll student includes _page, _limit, _sort, _order

làm react router dom
/login => feature

/admin: layout chung

dashboard => feature

neu user chua login thi ko cho vo admin,
neu user logined thi luu accesstoken vo localStorage
va check localStorage xem neu co accesstoken thi logined, neu ko co thi chua login

// next, design layout using material ui 


// next, we code logic for login button
authSage watch actions
- if logged in, watch logout 
- else watch login

- loop: action login, action logout, watch login again

action login: (assume always being success)
- call api login, api login responses user data and access_token
- set access_token to localstorage
- redirect to admin page

action logout:
- clear access_token in localstorage
- redirect to login page


// next, find the signal for if login or logout
logout phải xóa localStorage trước khi bắt đầu 1 chu kỳ mới


//next, different ways to navigate in redux saga: callbacks, connected-react-router

// next, show loading, error trên component UI
dicuss
RTK + Thunk: provide a way to await an async action right on component
----> handle loading/error on component easily

RTK + Saga: doesn't have a way to do so
--> what to do?

my suggestions:
+ LOADING can based on the redux store
+ ERROR eliminate the usage as much as you can

Consideration:
+ Trigger error toast from saga
+ Consider to call API directly on component instead of going through saga

chỉ show loading khi nó đang đăng nhập


// next, design Admin page layout

// next, Active menu với react router dom NavLink
2 routings    /admin/dashboard   và     /admin/student


//next, lesson 23: introduce handle dashboard
tận dụng saga effect để tối ưu công việc

//next, lesson 24: set up slice for dashboad
dashboard only need one action. This is fetching data to display

//next, lesson 25: set up dashboard saga

//next, lesson 26: design UI Dashboard layout statistics

//next, lesson 27: design range table dashboadrd
trong widget nó sẽ chứa các table studentRankingList

//next, lesson 28: giới thiệu tính năng student management
feature student: 
ROUTING
- /admin/students: listing
- /admin/students/add: add new student
- /admin/students/edit/:id : update student 
- /admin/student/delete/:id : delete student

Page listing mình sẽ làm 
- Search by name
- Filter by city
- Sort by name, mark
- Pagination
phân tích student slice state: 
-loading 
-list
- fillter (page: 1, limit: 10, ....)
-pagination


Page add/edit mình sẽ sử dụng
- react hook form v7 + Yup(dùng để validation)


//next, lesson 29: cài đặt slice và saga cho feature student

//next, lesson 30: design layout cho student list
cần 1 title, và cần 1 bảng danh sách học sinh

//next, lesson 31: làm pagination cho student list
lấy filter hiện tại, khi bấm số trang thay đổi thì phải đi cập nhật lại filter, và khi filter thay đổi thì phải đi lấy lại studentList

//next, lesson 32: format cột gender và mark dựa vào material ui

//next, lesson 33: lấy tên thành phố hiển thị lên column city
đi lấy dữ liệu và lưu lên trên redux

//next, lesson 34: chức năng search student by name
khi filter thay đổi thì báo lên parent: listStudent
redux saga có hỗ trợ debouce

//next, lesson 35: city filter
thay đổi city ở component con thì báo cho parent
nếu API làm thay đổi số lượng item trong table thì phải reset page = 1

//next, lesson 36: sort student and clear filter
khi gọi API cần truyền 2 giá trị: sort và order

//next, lesson 37: delete student
call api 1 delete student
call api 2 fetchStudentList again

//next, lesson 38: add/edit student
mặc dù đường dẫn có thể bị trùng, và ta dựa vào biến trên đường dẫn để xác định mode add or edit

//next, lesson 39: tổ chức form module hiệu quả lý thuyết
React Hook Form (Formilk, Redux form), validate Yup

//next, lesson 40: react hook form library lý thuyết

//next, lesson 41: tạo form đầu tiên có các text field

//next, lesson 42: tạo form có radio group

//next, lesson 43: tạo form có selected group

//next, lesson 44: validate using yup

//next, lesson 45: submit form có loading và error

/next, lesson 46: show thông báo react-toastify


