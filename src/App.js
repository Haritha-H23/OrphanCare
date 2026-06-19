import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginPage from './Login/LoginPage';
import RegisterPage from './Register/RegisterPage';
import Home from './Home/Home';
import AdminDashboard from './Admin/AdminDashboard';
import ChildrenPage from './pages/ChildrenPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/children" element={<ChildrenPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;