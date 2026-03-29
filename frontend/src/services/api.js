import axios from 'axios'

const api = axios.create({
  // Removed trailing slash here
  baseURL: 'http://localhost:8081/api/students',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAllStudents = async () => {
  try {
    // Changed '/' to '' to avoid the trailing slash issue
    const response = await api.get('');
    return response.data;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
};

export const createStudent = async (studentData) => {
  try {
    // Changed '/' to ''
    const response = await api.post('', studentData);
    return response.data;
  } catch (error) {
    console.error('Error creating student:', error);
    throw error;
  }
};

export const updateStudent = async (id, studentData) => {
  try {
    const response = await api.put(`/${id}`, studentData);
    return response.data;
  } catch (error) {
    console.error('Error updating student:', error);
    throw error;
  }
};

export const deleteStudent = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting student:', error);
    throw error;
  }
};