import React, { useContext } from 'react';
import { StudentsContext } from '../context/StudentsContext';

const Home = () => {
  const { students } = useContext(StudentsContext);

  return (
    <div className="page home">
      <h2>Welcome to Student CRM</h2>
      <p>
        This application helps you manage student records. You can view a list of students,
        see detailed information, add new students, and delete existing ones.
      </p>
      <p>Current number of students in the system: <strong>{students.length}</strong></p>
      <p>Use the navigation menu to explore the features.</p>
    </div>
  );
};

export default Home;