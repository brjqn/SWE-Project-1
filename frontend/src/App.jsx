import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Signup';
import ExerciseList from './ExerciseList';
import NewExercises from "./AddExercise";
import Login from './Login';
import Dashboard from './Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TrackWorkout from './TrackWorkout';
import {UserProvider} from './UserContext';
import ProtectedRoute from "./ProtectedRoute";
import Account from './Account'; 
import ViewAndEditGoals from './ViewAndEditGoals';
import Progress from './Progress'
import GraphOfProgress from './GraphOfProgress';
import AddProgress from './AddProgress';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path='/register' element={<Signup />} />
          <Route path='/login' element={<Login />} />

          {/* Protected Routes */}
          <Route 
            path='/dashboard' 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/exercise-list' 
            element={
              <ProtectedRoute>
                <ExerciseList />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/exercise-list/add-exercise' 
            element={
              <ProtectedRoute>
                <NewExercises />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/track-workout' 
            element={
              <ProtectedRoute>
                <TrackWorkout />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/account' 
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/view-and-edit-goals' 
            element={
              <ProtectedRoute>
                <ViewAndEditGoals />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/progress' 
            element={
              <ProtectedRoute>
                <Progress />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/graph-of-progress/:goalId' 
            element={
              <ProtectedRoute>
                <GraphOfProgress />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/add-progress/:goalId' 
            element={
              <ProtectedRoute>
                <AddProgress />
              </ProtectedRoute>
            } 
          />
          {/* Default Route */}
          <Route path='/' element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
