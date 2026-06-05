import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { StudentsContext } from '../context/StudentsContext';
import StudentForm from '../components/StudentForm';

const AddStudent = () => {
  const { addStudent } = useContext(StudentsContext);
  const navigate = useNavigate();

  const handleAddStudent = async (studentData) => {
    try {
      await addStudent(studentData);
      alert('Student added successfully!');
      navigate('/students');
    } catch (error) {
      alert('Failed to add student. Please try again.');
    }
  };

  return (
    <div className="page add-student-page">
      <h2>Add New Student</h2>
      <StudentForm onSubmit={handleAddStudent} />
    </div>
  );
};

export default AddStudent;