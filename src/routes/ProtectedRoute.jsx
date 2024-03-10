import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const auth = JSON.parse(localStorage.getItem('auth'));
  
  // 檢查是否已登錄，使用 user 變數而不是 auth.account
  return auth && auth.user ? <>{children}</> : <Navigate to="/login/" />;
}

export default ProtectedRoute;

