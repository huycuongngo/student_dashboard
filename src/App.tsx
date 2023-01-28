import { NotFound, PrivateRoute } from 'components/Common';
import { AdminLayout } from 'components/Layout';
import LoginPage from 'features/auth/pages/LoginPage';
import { Route, Routes } from 'react-router-dom';

function App() {

  return (
    <div>
      <Routes>
        <Route path='/login' element={<LoginPage />} />

        <Route path='/admin/*' element={<PrivateRoute><AdminLayout /></PrivateRoute> }/>
{/*   
        <Route path='*' element={<NotFound />} /> */}
      </Routes>
    </div>
  );
}

export default App;
