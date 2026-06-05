import React from 'react';
import StudentCard from './StudentCard';

const StudentList = ({ students }) => {
  if (!students.length) {
    return <p>No students found.</p>;
  }

  return (
    <div className="student-list">
      {students.map(student => (
        <StudentCard key={student.id} student={student} />
      ))}
    </div>
  );
};

export default StudentList;