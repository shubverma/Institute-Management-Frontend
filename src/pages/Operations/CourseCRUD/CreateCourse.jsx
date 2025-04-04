import React, { useState, useEffect } from 'react';
import BackButton from '../../../components/BackButton';
import Spinner from '../../../components/spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateCourse = () => {
  const [courseId, setCourseId] = useState('');
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [fees, setFees] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveCourse = () => {
    const data = {
      courseId,
      name,
      duration,
      fees,
    };
    setLoading(true);
    axios
      .post('http://localhost:5555/courses', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Course Created successfully', { variant: 'success' });
        navigate('/'); 
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div>
      <h1 className='text-xl text-center mb-2'>Add Course</h1>
      {loading ? <Spinner /> : ''}
      <div className='shadow-lg flex flex-col text-sm border rounded-2xl w-full max-w-lg p-6 mx-auto bg-white'>
        <div className='my-1'>
          <label className='block mb-1 text-gray-600'>Course ID</label>
          <input
            type='text'
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            className='border border-gray-300 px-2 py-1 w-full rounded'
          />
        </div>
        <div className='my-1'>
          <label className='block mb-1 text-gray-600'>Name</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='border border-gray-300 px-2 py-1 w-full rounded'
          />
        </div>
        <div className='my-1'>
          <label className='block mb-1 text-gray-600'>Duration</label>
          <input
            type='text'
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className='border border-gray-300 px-2 py-1 w-full rounded'
          />
        </div>
        <div className='my-1'>
          <label className='block mb-1 text-gray-600'>Fees</label>
          <input
            type='number'
            value={fees}
            onChange={(e) => setFees(e.target.value)}
            className='border border-gray-300 px-2 py-1 w-full rounded'
          />
        </div>
        <button className='bg-sky-500 hover:bg-sky-600 text-white py-1 px-2 rounded self-start text-sm mt-2' 
        onClick={handleSaveCourse}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateCourse;
