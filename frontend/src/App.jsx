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


function App() {
  return (
   <UserProvider>
    <BrowserRouter>
      <Routes>
        {/* Default route for the landing page (Signup) */}
        <Route path='/' element={<Signup />} />
        {/* Other routes */}
        <Route path='/exercise-list' element={<ExerciseList />} />
        <Route path= '/exercise-list/add-exercise' element = {<NewExercises />} />
        <Route path='/register' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/track-workout' element={<TrackWorkout/>} />
      </Routes>
    </BrowserRouter>
    </UserProvider>
  );
}

export default App;
