import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getCurrentStudent,
  updatePassword,
  updateCourse,
  logout as logoutAPI
} from '../api/authApi';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('profile');

  // Password update form
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Course update form
  const [courseForm, setCourseForm] = useState({
    course: ''
  });

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    setLoading(true);
    const result = await getCurrentStudent();
    setLoading(false);

    if (result.success) {
      setStudent(result.student);
      setCourseForm({ course: result.student.course });
    } else {
      setError(result.message);
      setTimeout(() => navigate('/login'), 2000);
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm({
      ...passwordForm,
      [name]: value
    });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!passwordForm.oldPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setError('Please fill all password fields');
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    const result = await updatePassword(
      passwordForm.oldPassword,
      passwordForm.newPassword,
      passwordForm.confirmPassword
    );

    if (result.success) {
      setMessage('Password updated successfully');
      setPasswordForm({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setTimeout(() => setMessage(''), 3000);
    } else {
      setError(result.message);
    }
  };

  const handleCourseChange = (e) => {
    const { value } = e.target;
    setCourseForm({ course: value });
  };

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!courseForm.course) {
      setError('Please select a course');
      return;
    }

    const result = await updateCourse(courseForm.course);

    if (result.success) {
      setStudent(result.student);
      setMessage('Course updated successfully');
      setTimeout(() => setMessage(''), 3000);
    } else {
      setError(result.message);
    }
  };

  const handleLogout = () => {
    logoutAPI();
    navigate('/login');
  };

  if (loading) {
    return <div className="dashboard-container"><p>Loading...</p></div>;
  }

  if (!student) {
    return <div className="dashboard-container"><p>Failed to load student data</p></div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {student.name}!</h1>
        <button className="btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}

      <div className="dashboard-content">
        <div className="tabs">
          <button
            className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button
            className={`tab-btn ${activeTab === 'password' ? 'active' : ''}`}
            onClick={() => setActiveTab('password')}
          >
            Change Password
          </button>
          <button
            className={`tab-btn ${activeTab === 'course' ? 'active' : ''}`}
            onClick={() => setActiveTab('course')}
          >
            Change Course
          </button>
        </div>

        <div className="tab-content">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="profile-section">
              <h2>Student Profile</h2>
              <div className="profile-info">
                <div className="info-group">
                  <label>Full Name:</label>
                  <p>{student.name}</p>
                </div>
                <div className="info-group">
                  <label>Email:</label>
                  <p>{student.email}</p>
                </div>
                <div className="info-group">
                  <label>Current Course:</label>
                  <p>{student.course}</p>
                </div>
                <div className="info-group">
                  <label>Member Since:</label>
                  <p>{new Date(student.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          )}

          {/* Password Tab */}
          {activeTab === 'password' && (
            <div className="form-section">
              <h2>Update Password</h2>
              <form onSubmit={handlePasswordSubmit}>
                <div className="form-group">
                  <label>Current Password</label>
                  <input
                    type="password"
                    name="oldPassword"
                    value={passwordForm.oldPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter current password"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter new password (min 6 characters)"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder="Confirm new password"
                    required
                  />
                </div>

                <button type="submit" className="btn">
                  Update Password
                </button>
              </form>
            </div>
          )}

          {/* Course Tab */}
          {activeTab === 'course' && (
            <div className="form-section">
              <h2>Change Course</h2>
              <form onSubmit={handleCourseSubmit}>
                <div className="form-group">
                  <label>Select a Course</label>
                  <select value={courseForm.course} onChange={handleCourseChange}>
                    <option value="">-- Select Course --</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Civil">Civil</option>
                  </select>
                </div>

                <button type="submit" className="btn">
                  Update Course
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
