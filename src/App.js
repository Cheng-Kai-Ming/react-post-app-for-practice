import React from 'react';
import { Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import ProtectedRoute from './routes/ProtectedRoute';
import Registration from './pages/Registration';
import Login from './pages/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />
      <Route path="/login" element={<div>Login</div>} />
      <Route path="/register" element={<Registration/>} />
      <Route path="/login/" element={<Login/>} />
    </Routes>
  );
}

export default App;
