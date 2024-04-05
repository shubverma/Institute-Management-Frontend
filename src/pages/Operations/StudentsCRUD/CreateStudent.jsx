import React, { useState, useEffect } from 'react';
import BackButton from '../../../components/BackButton';
import Spinner from '../../../components/spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateStudent = () => {
  const [studentId, setStudentId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [doB, setDoB] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [course, setCourse] = useState('');
  const [committedFees, setCommittedFees] = useState(''); // State for committedFees
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // Fetch courses data from the backend
    axios.get('http://localhost:5555/courses')
      .then(response => {
        setCourses(response.data.data); 
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
      });
  }, []);

  const handleSaveStudent = () => {
    const data = {
      studentId,
      studentName,
      fatherName,
      motherName,
      doB,
      phone,
      address,
      course,
      committedFees 
    };
    setLoading(true);
    axios
      .post('http://localhost:5555/students', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Student Created successfully', { variant: 'success' });
        navigate('/'); 
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Create Student</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Student ID</label>
          <input
            type='text'
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Student Name</label>
          <input
            type='text'
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Father's Name</label>
          <input
            type='text'
            value={fatherName}
            onChange={(e) => setFatherName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Mother's Name</label>
          <input
            type='text'
            value={motherName}
            onChange={(e) => setMotherName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Date of Birth</label>
          <input
            type='date'
            value={doB}
            onChange={(e) => setDoB(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Phone</label>
          <input
            type='number'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Address</label>
          <input
            type='text'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Course</label>
          <select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          >
            <option value=''>Select a course</option>
            {/* Use map function only if courses is an array */}
            {Array.isArray(courses) && courses.map(course => (
              <option key={course._id} value={course._id}>{course.name}</option>
            ))}
          </select>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Committed Fees</label>
          <input
            type='number'
            value={committedFees}
            onChange={(e) => setCommittedFees(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveStudent}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateStudent;
