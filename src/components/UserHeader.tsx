import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  currentUserName: string;
  avatarUrl: string;
  onSearch: (keyword: string) => void;
}

const UserHeader: React.FC<Props> = ({ currentUserName, avatarUrl, onSearch }) => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate(); // 🔁 ADD THIS


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
          src={avatarUrl}
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
        <button className="btn btn-primary" onClick={() => navigate('/users/create')}>
          + Add User
        </button>
    </div>
  );
};

export default UserHeader;
