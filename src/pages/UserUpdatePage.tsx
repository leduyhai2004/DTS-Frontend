import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Role {
  id: number;
  name: string;
  description: string;
}

interface UserUpdateForm {
  name: string;
  username: string;
  email: string;
  phone: string;
  avatar: string;
  role_id: number;
}

const UserUpdatePage: React.FC = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState<UserUpdateForm>({
    name: '',
    username: '',
    email: '',
    phone: '',
    avatar: '',
    role_id: 0,
  });

  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndRoles = async () => {
      try {
        const [userRes, rolesRes] = await Promise.all([
          axios.get(`http://localhost:8080/api/users/${userId}`),
          axios.get<Role[]>(`http://localhost:8080/api/roles`)
        ]);

        const user = userRes.data;
        setForm({
          name: user.name,
          username: user.username,
          email: user.email,
          phone: user.phone,
          avatar: user.avatar,
          role_id: user.role?.id || 0 // Assuming user.role is present
        });

        setRoles(rolesRes.data);
      } catch (error) {
        console.error('Error loading user or roles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndRoles();
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'role_id' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:8080/api/users/${userId}`, form);
      console.log('Update response:', res.data);
      alert('User updated successfully!');
      navigate(`/users/${userId}`);
    } catch (error) {
      console.error('Update failed:', error);
      alert('Update failed');
    }
  };

  if (loading) return <div className="container mt-4">Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>Update User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Username</label>
          <input type="text" className="form-control" name="username" value={form.username} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input type="text" className="form-control" name="phone" value={form.phone} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Avatar URL</label>
          <input type="text" className="form-control" name="avatar" value={form.avatar} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Role</label>
          <select className="form-select" name="role_id" value={form.role_id} onChange={handleChange} required>
            <option value="">-- Select Role --</option>
            {roles.map(role => (
              <option key={role.id} value={role.id}>{role.name}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Update User</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate(-1)}>Cancel</button>
      </form>
    </div>
  );
};

export default UserUpdatePage;
