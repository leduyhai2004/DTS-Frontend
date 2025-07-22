import React, { useEffect, useState } from 'react';
import axiosInstance from '../config/axiosConfig';
import type { PagedResponse, User } from '../types/User';
import { useNavigate } from 'react-router-dom';
import UserHeader from './UserHeader';

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [pageNo, setPageNo] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);

  const currentUser = {
    name: 'Admin User',
    avatar: '/admin-avatar.jpg'
  };

  const handleSearch = async (keyword: string) => {
    if (!keyword.trim()) {
      fetchUsers(0); // Load full user list again
      return;
    }

    try {
      const res = await axiosInstance.get<PagedResponse>(
        `http://localhost:8080/api/users/search?keyword=${keyword}`
      );
      setUsers(res.data.content);              // ✅ correct field
      setPageNo(res.data.number);              // for consistency
      setTotalPages(res.data.totalPages);      // support multi-page result
    } catch (err) {
      console.error('Search failed:', err);
      alert('Failed to search users');
    }
  };




  const navigate = useNavigate();

  const pageSize = 10;

  const fetchUsers = async (page: number) => {
    try {
      const res = await axiosInstance.get<PagedResponse>(
        `http://localhost:8080/api/users?pageNo=${page}&pageSize=${pageSize}`
      );
      setUsers(res.data.content);
      setPageNo(res.data.number);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Failed to fetch users', err);
    }
  };

  useEffect(() => {
    fetchUsers(pageNo);
  }, [pageNo]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPageNo(newPage);
    }
  };

  const handleDetail = (id: number) => {
    navigate(`/users/${id}`);
    console.log(`Detail for user ID: ${id}`);
  }
  const handleUpdate = (id: number) => {
    navigate(`/users/${id}/edit`);
    console.log(`Update for user ID: ${id}`);
  }
  const handleToggleStatus = async (user: User) => {
    try {
      if (user.status === 'ACTIVE') {
        const confirm = window.confirm('Are you sure you want to inactivate this user?');
        if (!confirm) return;

        await axiosInstance.delete(`http://localhost:8080/api/users/${user.id}`);
      } else {
        await axiosInstance.put(`http://localhost:8080/api/users/${user.id}/active`);
      }

      // Refresh the user list for current page
      fetchUsers(pageNo);
    } catch (error) {
      console.error('Error toggling user status:', error);
      alert('Failed to change user status');
    }
  };


  return (

    <div className="container mt-4">
      <UserHeader
        currentUserName={currentUser.name}
        avatarUrl={currentUser.avatar}
        onSearch={handleSearch}
      />

      <h3>User List</h3>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>#</th>
            <th>Avatar</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={user.id}>
              <td>{pageNo * pageSize + idx + 1}</td>
              <td><img src={`${user.userAvatarUrl}`} alt={user.name} width="40" height="40" /></td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.status}</td>
              <td>
                <button
                  className="btn btn-info btn-sm me-2"
                  onClick={() => handleDetail(user.id)}
                >
                  Detail
                </button>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleUpdate(user.id)}
                >
                  Update
                </button>
                <button
                  className={`btn btn-sm ${user.status === 'ACTIVE' ? 'btn-danger' : 'btn-success'}`}
                  onClick={() => handleToggleStatus(user)}
                >
                  {user.status === 'ACTIVE' ? 'Inactive' : 'Active'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <nav>
        <ul className="pagination">
          <li className={`page-item ${pageNo === 0 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(pageNo - 1)}>Previous</button>
          </li>
          {[...Array(totalPages)].map((_, i) => (
            <li key={i} className={`page-item ${i === pageNo ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(i)}>{i + 1}</button>
            </li>
          ))}
          <li className={`page-item ${pageNo === totalPages - 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(pageNo + 1)}>Next</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default UserTable;
