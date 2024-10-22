import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css'; // Custom CSS for styling the dashboard
import { useNavigate } from 'react-router-dom'; // To navigate on click

function Dashboard() {
  const navigate = useNavigate();

  // Function to handle navigation for different sections
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="sidebar text-white p-3 d-flex flex-column justify-content-between">
        <div>
          <button 
            className="dashboard-option text-center sidebar-button" 
            onClick={() => handleNavigation('/dashboard')}
          >
            Dashboard
          </button>
          <button 
            className="account-option text-center sidebar-button" 
            onClick={() => handleNavigation('/account')}
          >
            Account
          </button>
        </div>
        
        <button 
          className="signout-option text-center sidebar-button" 
          onClick={() => handleNavigation('/')}
        >
          Sign Out
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content flex-grow-1 p-4">
        <h1 className="text-center mb-4">Dashboard</h1>

        {/* Thin grey line separator */}
        <hr className="separator" />

        <div className="row justify-content-center">
          {/* Track Workout Card */}
          <div className="col-md-5 mb-4">
            <div 
              className="card h-100 clickable-card"
              onClick={() => handleNavigation('/track-workout')} // Handle click event
              style={{ cursor: 'pointer' }}
            >
              <div className="card-body text-center">
                <h3>Track Workout</h3>
                <p>Record your workout progress.</p>
              </div>
            </div>
          </div>

          {/* Graph Progress Card */}
          <div className="col-md-5 mb-4">
            <div 
              className="card h-100 clickable-card"
              onClick={() => handleNavigation('/graph-progress')} // Handle click event
              style={{ cursor: 'pointer' }}
            >
              <div className="card-body text-center">
                <h3>Graph Progress</h3>
                <p>Visualize your workout trends over time.</p>
              </div>
            </div>
          </div>

          {/* Exercise List Card */}
          <div className="col-md-5 mb-4">
            <div 
              className="card h-100 clickable-card"
              onClick={() => handleNavigation('/exercise-list')} // Handle click event
              style={{ cursor: 'pointer' }}
            >
              <div className="card-body text-center">
                <h3>Exercise List</h3>
                <p>Browse exercises.</p>
              </div>
            </div>
          </div>

          {/* Milestones Card */}
          <div className="col-md-5 mb-4">
            <div 
              className="card h-100 clickable-card"
              onClick={() => handleNavigation('/milestones')} // Handle click event
              style={{ cursor: 'pointer' }}
            >
              <div className="card-body text-center">
                <h3>Milestones</h3>
                <p>Track and celebrate your fitness milestones.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
