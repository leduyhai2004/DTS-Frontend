import UserTable from './components/UserTable'
import { Routes, Route } from 'react-router-dom';
import UserDetailPage from './pages/UserDetailPage';
import UserUpdatePage from './pages/UserUpdatePage';
import UserCreate from './pages/UserCreate';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<UserTable />} />
      <Route path="/users/:userId" element={<UserDetailPage />} />
        <Route path="/users/:userId/edit" element={<UserUpdatePage />} />
        <Route path="/users/create" element={<UserCreate />} />

    </Routes>
  );
};

export default App
