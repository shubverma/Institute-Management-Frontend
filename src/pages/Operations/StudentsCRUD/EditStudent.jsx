import React, { useState, useEffect } from 'react';
import BackButton from '../../../components/BackButton';
import Spinner from '../../../components/spinner';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditStudent = () => {
  const [student, setStudent] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // Fetch student data by ID
    setLoading(true);
    axios.get(`http://localhost:5555/students/${id}`)
      .then(response => {
        setStudent(response.data.student);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching student:', error);
        setLoading(false);
      });
    
    // Fetch courses data from the backend
    axios.get('http://localhost:5555/courses')
      .then(response => {
        setCourses(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
      });
  }, [id]);

  const handleSaveStudent = () => {
    setLoading(true);
    axios
      .put(`http://localhost:5555/students/${id}`, student)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Student Updated successfully', { variant: 'success' });
        navigate('/'); 
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error updating student', { variant: 'error' });
        console.log(error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'doB') {
      const parsedDate = new Date(value);
      const formattedDate = parsedDate.toISOString().split('T')[0];
      setStudent(prevStudent => ({
        ...prevStudent,
        [name]: formattedDate
      }));
    } else {
      setStudent(prevStudent => ({
        ...prevStudent,
        [name]: value
      }));
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (!student || courses.length === 0) {
    return <div>Loading...</div>; 
  }

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Student</h1>
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Student ID</label>
          <input
            type='text'
            name='studentId'
            value={student.studentId}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Student Name</label>
          <input
            type='text'
            name='studentName'
            value={student.studentName}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Father's Name</label>
          <input
            type='text'
            name='fatherName'
            value={student.fatherName}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Mother's Name</label>
          <input
            type='text'
            name='motherName'
            value={student.motherName}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Date of Birth</label>
          <input
            type='date'
            name='doB'
            value={student.doB}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Phone</label>
          <input
            type='number'
            name='phone'
            value={student.phone}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Address</label>
          <input
            type='text'
            name='address'
            value={student.address}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Course</label>
          <select
            name='course'
            value={student.course}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          >
            {courses.map(course => (
              <option key={course._id} value={course._id}>{course.name}</option>
            ))}
          </select>
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveStudent}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditStudent;
