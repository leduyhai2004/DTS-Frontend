import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  avatar: string;
  role: {
    id: number;
    name: string;
  };
  status: string;
  createdAt: number[];
  updatedAt: number[];
}

const formatDate = (arr: number[]): string => {
  return new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]).toLocaleString();
};

const UserDetailPage: React.FC = () => {
  const { userId } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get<User>(`http://localhost:8080/api/users/${userId}`);
        setUser(res.data);
        console.log('Fetched user:', res.data);
      } catch (err) {
        console.error('Error fetching user', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) return <div className="container mt-4">Loading...</div>;
  if (!user) return <div className="container mt-4">User not found</div>;

  return (
    <div className="container mt-4">
      <h2>User Details</h2>
      <div className="card mt-3">
        <div className="card-body">
          <div className="row">
            <div className="col-md-3">
              <img
                src={`http://localhost:8080/api/users/${userId}/image`}
                alt={user.name}
                className="img-thumbnail"
              />
            </div>
            <div className="col-md-9">
              <h4>{user.name}</h4>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>Status:</strong> {user.status}</p>
              <p><strong>Role:</strong> {user.role.name}</p>
              <p><strong>Created At:</strong> {formatDate(user.createdAt)}</p>
              <p><strong>Updated At:</strong> {formatDate(user.updatedAt)}</p>
              <Link to="/" className="btn btn-secondary mt-2">Back to User List</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;
