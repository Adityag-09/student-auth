import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://student-auth-8xkp.onrender.com/api/auth';

// Set token in headers
export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('authToken', token);
  } else {
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('authToken');
  }
};

// Get token from localStorage
export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Initialize token if it exists
const token = getAuthToken();
if (token) {
  setAuthToken(token);
}

// Register Student
export const registerStudent = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    if (response.data.success) {
      setAuthToken(response.data.token);
    }
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Registration failed'
    };
  }
};

// Login Student
export const loginStudent = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
    if (response.data.success) {
      setAuthToken(response.data.token);
    }
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Login failed'
    };
  }
};

// Get current student
export const getCurrentStudent = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/me`);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch student data'
    };
  }
};

// Update Password
export const updatePassword = async (oldPassword, newPassword, confirmPassword) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/update-password`, {
      oldPassword,
      newPassword,
      confirmPassword
    });
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to update password'
    };
  }
};

// Update Course
export const updateCourse = async (course) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/update-course`, { course });
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to update course'
    };
  }
};

// Logout
export const logout = () => {
  setAuthToken(null);
};
