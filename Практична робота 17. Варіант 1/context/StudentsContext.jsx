import React, { createContext, useReducer, useEffect } from 'react';

const API_URL = 'http://localhost:3001/students';

// Actions
const SET_STUDENTS = 'SET_STUDENTS';
const ADD_STUDENT = 'ADD_STUDENT';
const DELETE_STUDENT = 'DELETE_STUDENT';

const studentsReducer = (state, action) => {
  switch (action.type) {
    case SET_STUDENTS:
      return action.payload;
    case ADD_STUDENT:
      return [...state, action.payload];
    case DELETE_STUDENT:
      return state.filter(student => student.id !== action.payload);
    default:
      return state;
  }
};

export const StudentsContext = createContext();

export const StudentsProvider = ({ children }) => {
  const [students, dispatch] = useReducer(studentsReducer, []);

  // Load students from API on mount
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => dispatch({ type: SET_STUDENTS, payload: data }))
      .catch(err => console.error('Failed to load students:', err));
  }, []);

  const addStudent = async (newStudent) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStudent),
      });
      const savedStudent = await response.json();
      dispatch({ type: ADD_STUDENT, payload: savedStudent });
      return savedStudent;
    } catch (error) {
      console.error('Add student failed:', error);
      throw error;
    }
  };

  const deleteStudent = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      dispatch({ type: DELETE_STUDENT, payload: id });
    } catch (error) {
      console.error('Delete student failed:', error);
      throw error;
    }
  };

  const value = {
    students,
    addStudent,
    deleteStudent,
  };

  return (
    <StudentsContext.Provider value={value}>
      {children}
    </StudentsContext.Provider>
  );
};