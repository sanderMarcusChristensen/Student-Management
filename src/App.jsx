import "./App.css";
import React, { useState, useEffect } from 'react';
import PersonFrom from './components/PersonFrom';
import StudentList from './Components/StudentList';
import { fetchData } from './utils/fecthData';

const App = () => {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);

  // Fetch data for students and classes once when the component mounts
  useEffect(() => {
    fetchData('http://localhost:3000/students', setStudents, 'GET');
    fetchData('http://localhost:3000/classes', setClasses, 'GET');
  }, []);  // Empty dependency array means this effect runs once on mount

  return (
    <>
      <h1>Student Management</h1>
      <StudentList students={students} classes={classes} setStudents={setStudents} />
      <PersonFrom setStudents={setStudents} classes={classes} />
    </>
  );
};

export default App;
