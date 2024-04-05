import React, { useState, useEffect } from 'react';
import BackButton from '../../../components/BackButton';
import Spinner from '../../../components/spinner';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditCourse = () => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // Fetch course data by ID
    setLoading(true);
    axios.get(`http://localhost:5555/courses/${id}`)
      .then(response => {
        setCourse(response.data.course);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching course:', error);
        setLoading(false);
      });
  }, [id]);

  const handleSaveCourse = () => {
    setLoading(true);
    axios
      .put(`http://localhost:5555/courses/${id}`, course)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Course Updated successfully', { variant: 'success' });
        navigate('/'); 
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error updating course', { variant: 'error' });
        console.log(error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: value
    }));
  };

  if (loading) {
    return <Spinner />;
  }

  if (!course) {
    return <div>Loading...</div>; 
  }

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Course</h1>
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Course ID</label>
          <input
            type='text'
            name='courseId'
            value={course.courseId}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Name</label>
          <input
            type='text'
            name='name'
            value={course.name}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Duration</label>
          <input
            type='text'
            name='duration'
            value={course.duration}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Fees</label>
          <input
            type='number'
            name='fees'
            value={course.fees}
            onChange={handleChange}
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

export default EditCourse;
