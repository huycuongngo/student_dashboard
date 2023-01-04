import * as React from 'react';
import { Routes, Route } from "react-router-dom";
import AddEditPage from './pages/AddEditPage';
import ListPage from './pages/ListPage';


export default function Student() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<ListPage />} />
        <Route path='/add' element={<AddEditPage />} />
        <Route path='/add/:studentId' element={<AddEditPage />} />
      </Routes>
    </div>
  );
}
