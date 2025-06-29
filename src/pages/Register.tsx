// Register.tsx
import React, { useState } from 'react';
import axiosInstance from '../config/axiosConfig';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register: React.FC = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosInstance.post('http://localhost:8080/api/auth/register', form);
      alert('Registration successful!');
      navigate('/login');
    } catch (error) {
      alert('Registration failed!');
      console.error(error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '420px' }}>
        <div className="text-center mb-4">
          <h3 className="fw-bold">Create Account</h3>
          <p className="text-muted small">Join us and start your journey 🚀</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-person-fill"></i></span>
              <input
                name="username"
                id="username"
                className="form-control"
                onChange={handleChange}
                placeholder="Enter username"
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-envelope-fill"></i></span>
              <input
                name="email"
                id="email"
                type="email"
                className="form-control"
                onChange={handleChange}
                placeholder="Enter email"
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-lock-fill"></i></span>
              <input
                name="password"
                id="password"
                type="password"
                className="form-control"
                onChange={handleChange}
                placeholder="Enter password"
              />
            </div>
          </div>

          <div className="d-grid">
            <button className="btn btn-success" type="submit">
              <i className="bi bi-person-plus-fill me-2"></i>Register
            </button>
          </div>
        </form>
        <div className="text-center mt-3">
          <small>
            Already have an account? <a href="/login" className="text-decoration-none">Login</a>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Register;
