import React from "react";
import { Outlet } from 'react-router-dom'
import AdminHeader from '../header/AdminHeader'


function AdminLayout() {
  return (
    <>
      <AdminHeader />
      
      <Outlet />

    </>
  );
}

export default AdminLayout;
