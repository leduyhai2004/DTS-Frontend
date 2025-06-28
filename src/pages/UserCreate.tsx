import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserCreate: React.FC = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    phone: '',
    avatar: '',
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    setImageFile(file); // ✅ Save file to send via FormData
    setPreview(URL.createObjectURL(file));
  }
};


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const formData = new FormData();
  console.log('Form JSON:', user);
    console.log('Image file:', imageFile);
    console.log('Preview URL:', preview);

  // Send JSON as string, not as Blob
  if (imageFile) {
    formData.append('imageFile', imageFile);
  }
    formData.append(
    'request',
    new Blob([JSON.stringify(user)], { type: 'application/json' })
  );
    // formData.append('request', JSON.stringify(user));


  try {
    const res = await axios.post('http://localhost:8080/api/users',formData);
    console.log('Create user response:', res.data);
    alert('User created successfully!');
    navigate('/');
  } catch (err) {
    console.error('Create user failed', err);
    alert('Failed to create user');
  }
};


  return (
    <div className="container mt-4">
      <h3>Create User</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label>Name</label>
          <input placeholder='Enter name' value={user.name} className="form-control" name="name" onChange={handleChange} />
        </div>
        <div className="mb-2">
          <label>Username</label>
          <input placeholder='Enter username' value={user.username} className="form-control" name="username" onChange={handleChange} />
        </div>
        <div className="mb-2">
          <label>Email</label>
          <input placeholder='Enter email' value={user.email} className="form-control" name="email" type="email" onChange={handleChange} />
        </div>
        <div className="mb-2">
          <label>Password</label>
          <input placeholder='Enter password' value={user.password} className="form-control" name="password" type="password" onChange={handleChange} />
        </div>
        <div className="mb-2">
          <label>Phone</label>
          <input placeholder='Enter phone' value={user.phone} className="form-control" name="phone" onChange={handleChange} />
        </div>
        <div className="mb-2">
          <label>Avatar (Image)</label>
          <input className="form-control" type="file" accept="image/*" onChange={handleFileChange} />
        </div>

        {preview && (
          <div className="mb-2">
            <img src={preview} alt="Preview" width={100} height={100} className="rounded" />
          </div>
        )}

        <button type="submit" className="btn btn-success">Create</button>
      </form>
    </div>
  );
};

export default UserCreate;
