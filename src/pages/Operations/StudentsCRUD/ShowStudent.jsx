import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../../../components/BackButton';
import Spinner from '../../../components/spinner';

const ShowStudent = () => {
  const [student, setStudent] = useState({});
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/students/${id}`)
      .then((response) => {
        setStudent(response.data.student); 
        setCourse(response.data.course); 
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]); 

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Student Details</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Student ID</span>
            <span>{student.studentId}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Student Name</span>
            <span>{student.studentName}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Father's Name</span>
            <span>{student.fatherName}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Mother's Name</span>
            <span>{student.motherName}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Date of Birth</span>
            <span>{new Date(student.doB).toLocaleDateString()}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Phone</span>
            <span>{student.phone}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Address</span>
            <span>{student.address}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Course</span>
            {student.course && student.course.name ? (
              <span>{student.course.name}</span>
            ) : (
              <span>N/A</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowStudent;
