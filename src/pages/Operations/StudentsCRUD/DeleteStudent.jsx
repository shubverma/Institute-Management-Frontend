import React, { useState } from 'react';
import BackButton from '../../../components/BackButton';
import Spinner from '../../../components/spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteStudent = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteStudent = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/students/${id}`) 
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Student Deleted successfully', { variant: 'success' });
        navigate('/'); // Redirect to appropriate page after deletion
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };
  
  return (
    <div>
      <h1 className='text-xl'>Delete Student</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are You Sure You want to delete this student?</h3>

        <button
          className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={handleDeleteStudent}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  )
}

export default DeleteStudent;
