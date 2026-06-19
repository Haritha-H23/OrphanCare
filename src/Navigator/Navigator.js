import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from '../Login/LoginPage'
import RegisterPage from '../Register/RegisterPage'
import HomePage from '../Home/HomePage'
import ChildrenPage from '../pages/ChildrenPage';
import DonationHistoryPage from '../pages/DonationHistoryPage';
import ManageChildrenPage from '../pages/ManageChildrenPage';
import RequirementsPage from '../pages/RequirementsPage';
import AdminRoute from '../routes/AdminRoute'
import ManageRequirementsPage from '../pages/ManageRequirementsPage';
import AdminDashboard from '../pages/AdminDashboard'


const Navigator = () => {
  return (
    <div>
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<LoginPage/>}></Route>
            <Route path='/register' element={<RegisterPage/>}></Route>
            <Route path="/donation-history" element={<DonationHistoryPage />} />
            <Route path='/Home' element={<HomePage/>}></Route>
            <Route path="/children" element={<ChildrenPage />} />
            <Route path="/requirements" element={<RequirementsPage />} />
            <Route
  path="/admin/children"
  element={
    <AdminRoute>
      <ManageChildrenPage />
    </AdminRoute>
  }
/>
<Route
  path="/admin/requirements"
  element={
    <AdminRoute>
      <ManageRequirementsPage />
    </AdminRoute>
  }
/>
<Route
  path="/admin-dashboard"
  element={
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  }
/>
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default Navigator