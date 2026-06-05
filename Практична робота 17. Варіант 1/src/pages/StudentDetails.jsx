import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StudentsContext } from '../context/StudentsContext';

const StudentDetails = () => {
  const { id } = useParams();
  const { students, deleteStudent } = useContext(StudentsContext);
  const navigate = useNavigate();

  const student = students.find(s => s.id === parseInt(id));

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await deleteStudent(parseInt(id));
        alert('Student deleted successfully');
        navigate('/students');
      } catch (error) {
        alert('Failed to delete student');
      }
    }
  };

  if (!student) {
    return <div className="page">Loading student details...</div>;
  }

  return (
    <div className="page student-details">
      <h2>Student Details</h2>
      <div className="details-card">
        <p><strong>ID:</strong> {student.id}</p>
        <p><strong>First Name:</strong> {student.firstName}</p>
        <p><strong>Last Name:</strong> {student.lastName}</p>
        <p><strong>Group:</strong> {student.group}</p>
        <p><strong>Age:</strong> {student.age}</p>
        <button onClick={handleDelete} className="delete-btn">Delete Student</button>
      </div>
    </div>
  );
};

export default StudentDetails;