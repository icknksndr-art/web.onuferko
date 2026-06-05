import React from 'react';
import { Link } from 'react-router-dom';

const StudentCard = ({ student }) => {
  return (
    <div className="student-card">
      <h3>{student.firstName} {student.lastName}</h3>
      <p>Group: {student.group}</p>
      <p>Age: {student.age}</p>
      <Link to={`/students/${student.id}`}>Details</Link>
    </div>
  );
};

export default StudentCard;