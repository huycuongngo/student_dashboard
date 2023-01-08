import { useAppDispatch } from 'app/hooks';
import { cityActions } from 'features/city/citySlice';
import React, { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import AddEditPage from './pages/AddEditPage';
import ListPage from './pages/ListPage';


export default function Student() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(cityActions.fetchCityList())
  }, [dispatch])

  return (
    <div>
      <Routes>
        <Route path='/' element={<ListPage />} />
        <Route path='/add' element={<AddEditPage />} />
        <Route path='/:studentId' element={<AddEditPage />} />
      </Routes>
    </div>
  );
}
