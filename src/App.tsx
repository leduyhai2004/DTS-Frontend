import UserTable from './components/UserTable'
import { Routes, Route } from 'react-router-dom';
import UserDetailPage from './pages/UserDetailPage';
import UserUpdatePage from './pages/UserUpdatePage';
import UserCreate from './pages/UserCreate';
import Login from './pages/Login';
import Register from './pages/Register';
import Forbidden403 from './pages/Forbidden403';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<UserTable />} />
      <Route path="/users/:userId" element={<UserDetailPage />} />
        <Route path="/users/:userId/edit" element={<UserUpdatePage />} />
        <Route path="/users/create" element={<UserCreate />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/403" element={<Forbidden403 />} />

    </Routes>
  );
};

export default App
