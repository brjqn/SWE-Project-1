import React, { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Account.css'; // Use your original styling
import axios from 'axios';
import { UserContext } from './UserContext'; // Import UserContext

const Account = () => {
  const { currentUser } = useContext(UserContext); // Access the logged-in user's email
  const [userData, setUserData] = useState({ name: '' }); // State for user data (removed email)
  const [message, setMessage] = useState('');

  // Separate state for email update form
  const [emailUpdateData, setEmailUpdateData] = useState({ currentEmail: '', newEmail: '', password: '' });

  // Separate state for password update form
  const [passwordUpdateData, setPasswordUpdateData] = useState({ currentEmail: '', oldPassword: '', newPassword: '' });

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/profile`, {
          params: {
            email: currentUser,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setMessage(error.response?.data?.message || 'Failed to fetch user profile.');
      }
    };
    if (currentUser) {
      fetchProfile();
    }
  }, [currentUser]);

  const handleEmailUpdate = async () => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/user/email`, {
        currentEmail: emailUpdateData.currentEmail,
        newEmail: emailUpdateData.newEmail,
        password: emailUpdateData.password,
      });
      setMessage(response.data.message);

      // If the email update is successful and the currentEmail matches currentUser, update currentUser
      if (emailUpdateData.currentEmail === currentUser) {
        // Update currentUser and userData if email change is successful
        setUserData({ ...userData, email: emailUpdateData.newEmail });
      }

      // Clear the form
      setEmailUpdateData({ currentEmail: '', newEmail: '', password: '' });
    } catch (error) {
      console.error('Error updating email:', error);
      setMessage(error.response?.data?.message || 'Failed to update email.');
    }
  };

  const handlePasswordUpdate = async () => {
    try {
      const response = await axios.put('/api/user/password', {
        currentEmail: passwordUpdateData.currentEmail,
        oldPassword: passwordUpdateData.oldPassword,
        newPassword: passwordUpdateData.newPassword,
      });
      setMessage(response.data.message);

      // Clear the form
      setPasswordUpdateData({ currentEmail: '', oldPassword: '', newPassword: '' });
    } catch (error) {
      console.error('Error updating password:', error);
      setMessage(error.response?.data?.message || 'Failed to update password.');
    }
  };

  return (
    <div className="account-container">
      <h1 className="text-center mb-4">{userData.name || 'Account Settings'}</h1>
      {/* Removed the email display */}
      <hr className="separator" />

      <div className="form-container">
        <h3>Update Email</h3>
        <div className="form-group">
          <label htmlFor="currentEmail">Current Email</label>
          <input
            type="email"
            id="currentEmail"
            className="form-control"
            value={emailUpdateData.currentEmail}
            onChange={(e) => setEmailUpdateData({ ...emailUpdateData, currentEmail: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="newEmail">New Email</label>
          <input
            type="email"
            id="newEmail"
            className="form-control"
            value={emailUpdateData.newEmail}
            onChange={(e) => setEmailUpdateData({ ...emailUpdateData, newEmail: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="emailPassword">Password</label>
          <input
            type="password"
            id="emailPassword"
            className="form-control"
            value={emailUpdateData.password}
            onChange={(e) => setEmailUpdateData({ ...emailUpdateData, password: e.target.value })}
          />
        </div>
        <button className="btn btn-success mt-3" onClick={handleEmailUpdate}>
          Update Email
        </button>

        <h3 className="mt-4">Update Password</h3>
        <div className="form-group">
          <label htmlFor="currentEmailPassword">Current Email</label>
          <input
            type="email"
            id="currentEmailPassword"
            className="form-control"
            value={passwordUpdateData.currentEmail}
            onChange={(e) => setPasswordUpdateData({ ...passwordUpdateData, currentEmail: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="oldPassword">Old Password</label>
          <input
            type="password"
            id="oldPassword"
            className="form-control"
            value={passwordUpdateData.oldPassword}
            onChange={(e) => setPasswordUpdateData({ ...passwordUpdateData, oldPassword: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            className="form-control"
            value={passwordUpdateData.newPassword}
            onChange={(e) => setPasswordUpdateData({ ...passwordUpdateData, newPassword: e.target.value })}
          />
        </div>
        <button className="btn btn-success mt-3" onClick={handlePasswordUpdate}>
          Update Password
        </button>

        {message && <p className="mt-3 message">{message}</p>}
      </div>
    </div>
  );
};

export default Account;