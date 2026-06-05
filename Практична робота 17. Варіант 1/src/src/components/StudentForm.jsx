import React, { useState } from 'react';

const StudentForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    firstName: initialData.firstName || '',
    lastName: initialData.lastName || '',
    group: initialData.group || '',
    age: initialData.age || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.group || !formData.age) {
      alert('Please fill all fields');
      return;
    }
    onSubmit({ ...formData, age: Number(formData.age) });
    setFormData({ firstName: '', lastName: '', group: '', age: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="student-form">
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="group"
        placeholder="Group (e.g. ІПЗ-21)"
        value={formData.group}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={formData.age}
        onChange={handleChange}
        required
      />
      <button type="submit">Save Student</button>
    </form>
  );
};

export default StudentForm;