// Login.tsx
import React, { useState } from 'react';
import axiosInstance from '../config/axiosConfig';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post('http://localhost:8080/api/auth/login', form);
      const { token } = res.data;
      localStorage.setItem('token', token);
      alert('Login successful!');
      navigate('/');
    } catch (error) {
      alert('Login failed!');
      console.error(error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="text-center mb-4">
          <i className="bi bi-person-circle" style={{ fontSize: '3rem', color: '#0d6efd' }}></i>
          <h3 className="mt-2">Welcome Back ADMIN</h3>
          <p className="text-muted">Please login to your account</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              name="username"
              className="form-control"
              placeholder="Enter your username"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              placeholder="Enter your password"
              onChange={handleChange}
              required
            />
          </div>
          <button className="btn btn-primary w-100" type="submit">
            <i className="bi bi-box-arrow-in-right me-2"></i>Login
          </button>
        </form>
        <div className="mt-3 text-center">
          <small className="text-muted">Don't have an account? <a href="/register">Sign up</a></small>
        </div>
      </div>
    </div>
  );
};

export default Login;
