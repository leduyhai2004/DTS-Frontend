import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../config/axiosConfig';

interface Props {
  currentUserName: string;
  avatarUrl: string;
  onSearch: (keyword: string) => void;
}

const UserHeader: React.FC<Props> = ({ currentUserName, onSearch }) => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate(); // 🔁 ADD THIS

  const handleLogout = async () => {
    try {
      await axiosInstance.post('http://localhost:8080/api/auth/logout');
      // Clear the token from localStorage
      localStorage.removeItem('token');
      // Navigate to login page
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if logout API fails, clear token and redirect
      localStorage.removeItem('token');
      navigate('/login');
    }
  };


  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearch(keyword.trim());
    }
  };

  return (
    <div className="d-flex justify-content-between align-items-center p-3 bg-light border-bottom mb-3">
      <div className="d-flex align-items-center">
        <img
          src={`http://localhost:8080/api/users/1/image`}
          alt="User Avatar"
          width={40}
          height={40}
          className="rounded-circle me-2"
        />
        <h5 className="mb-0">Hello, {currentUserName}</h5>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="d-flex">
        <input
          type="text"
          className="form-control"
          placeholder="Search users..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </form>
      
      <div className="d-flex gap-2">
        <button className="btn btn-primary" onClick={() => navigate('/users/create')}>
          + Add User
        </button>
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserHeader;
