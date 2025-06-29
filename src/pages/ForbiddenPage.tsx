import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ForbiddenPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back to previous page
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="text-center">
        <div className="error-template">
          <h1 className="display-1 fw-bold text-danger">403</h1>
          <h2 className="fs-3">
            <i className="bi bi-exclamation-triangle text-warning"></i>
            Access Denied
          </h2>
          <div className="error-details mb-4">
            <p className="fs-5 text-muted">
              Bạn không có quyền truy cập vào chức năng này.
            </p>
            <p className="text-muted">
              You don't have permission to access this resource. Please contact your administrator if you believe this is an error.
            </p>
          </div>
          <div className="error-actions d-flex flex-column flex-md-row gap-2 justify-content-center">
            <button 
              className="btn btn-primary"
              onClick={handleGoBack}
            >
              <i className="bi bi-arrow-left me-2"></i>
              Go Back
            </button>
            <button 
              className="btn btn-success"
              onClick={handleGoHome}
            >
              <i className="bi bi-house me-2"></i>
              Go to Homepage
            </button>
            <button 
              className="btn btn-outline-danger"
              onClick={handleLogout}
            >
              <i className="bi bi-box-arrow-right me-2"></i>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForbiddenPage;
