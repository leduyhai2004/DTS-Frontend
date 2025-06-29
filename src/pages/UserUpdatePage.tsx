import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../config/axiosConfig';

interface Role {
  id: number;
  name: string;
}

interface UserUpdateForm {
  name: string;
  username: string;
  email: string;
  phone: string;
  role_id: number;
}

const UserUpdatePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState<UserUpdateForm>({
    name: '',
    username: '',
    email: '',
    phone: '',
    role_id: 0,
  });
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, rolesRes] = await Promise.all([
          axiosInstance.get(`http://localhost:8080/api/users/${userId}`),
          axiosInstance.get<Role[]>(`http://localhost:8080/api/roles`)
        ]);

        const user = userRes.data;
        setForm({
          name: user.name,
          username: user.username,
          email: user.email,
          phone: user.phone,
          role_id: user.role?.id || 0,
        });

        // fetch avatar image as blob
        try {
          const imgRes = await axiosInstance.get(
            `http://localhost:8080/api/users/${userId}/image`,
            { responseType: 'blob' }
          );
          const url = URL.createObjectURL(imgRes.data);
          setPreview(url);
        } catch (e) {
          console.warn('No avatar to load', e);
        }

        setRoles(rolesRes.data);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'role_id' ? parseInt(value) : value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('request', new Blob([JSON.stringify(form)], { type: 'application/json' }));
    if (imageFile) {
      formData.append('imageFile', imageFile);
    }
    try {
      await axiosInstance.put(
        `http://localhost:8080/api/users/${userId}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      alert('User updated successfully!');
      navigate('/');
    } catch (error) {
      console.error('Update failed:', error);
      alert('Update failed');
    }
  };

  if (loading) return <div className="d-flex justify-content-center mt-5"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>;

  return (
    <div className="container p-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Update User</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="row">
              <div className="col-md-6">
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
                  <label className="form-label">Role</label>
                  <select className="form-select" name="role_id" value={form.role_id} onChange={handleChange} required>
                    <option value="0">-- Select Role --</option>
                    {roles.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Avatar</label>
                  <input type="file" className="form-control" accept="image/*" onChange={handleFileChange} />
                </div>
                {preview && (
                  <div className="mb-3">
                    <img src={preview} alt="Avatar Preview" className="img-thumbnail" />
                  </div>
                )}
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Update User</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserUpdatePage;
