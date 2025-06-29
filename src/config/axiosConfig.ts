// axiosConfig.ts
import axios from 'axios';

const instance = axios.create();

instance.interceptors.request.use(
  (config) => {
    // Skip adding token for login and register endpoints
    const isAuthEndpoint = config.url?.includes('/login') || config.url?.includes('/register');
    
    if (!isAuthEndpoint) {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle 403 errors
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      // Check if the response contains the specific access denied message
      const errorData = error.response.data;
      if (errorData?.error === "Access Denied" || errorData?.message?.includes("không có quyền truy cập")) {
        // Redirect to 403 forbidden page
        window.location.href = '/403';
        return Promise.reject(error);
      }
    }
    
    // For other errors, just reject the promise
    return Promise.reject(error);
  }
);

export default instance;