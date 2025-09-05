import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../components/admin/AdminLayout';
import AdminDashboard from '../pages/admin/AdminDashboard';
import UsersTable from '../pages/admin/UsersTable';
import OwnersTable from '../pages/admin/OwnersTable';
import CoachesTable from '../pages/admin/CoachesTable';
import InvoicesTable from '../pages/admin/InvoicesTable';

const AdminRoutes = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/users" element={<UsersTable />} />
        <Route path="/owners" element={<OwnersTable />} />
        <Route path="/coaches" element={<CoachesTable />} />
        <Route path="/invoices" element={<InvoicesTable />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;