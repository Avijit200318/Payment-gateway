import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home';
import CancelPayment from './pages/CancelPayment';
import SuccessPayment from './pages/SuccessPayment';

export default function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/cancel' element={<CancelPayment />} />
        <Route path='/success' element={<SuccessPayment />} />
      </Routes>
    </BrowserRouter>
  );
}
