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
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Create Course</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Course ID</label>
          <input
            type='text'
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Name</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Duration</label>
          <input
            type='text'
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Fees</label>
          <input
            type='number'
            value={fees}
            onChange={(e) => setFees(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveCourse}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateCourse;
