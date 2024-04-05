import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';

const CreateFeeSubmission = () => {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [submittedFees, setSubmittedFees] = useState('');
  const [submissionDate, setSubmissionDate] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    axios
      .get('http://localhost:5555/students')
      .then((response) => {
        setStudents(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSaveFeeSubmission = () => {
    const data = {
      student: studentId,
      submitted_Fees: parseFloat(submittedFees),
      submission_Date: submissionDate,
    };

    axios
      .post('http://localhost:5555/feeSubmissions', data)
      .then(() => {
        enqueueSnackbar('Fee Submission created successfully', { variant: 'success' });
        clearForm();
      })
      .catch((error) => {
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  const clearForm = () => {
    setStudentId('');
    setSubmittedFees('');
    setSubmissionDate('');
  };

  return (
    <div className='p-4'>
      <h1 className='text-3xl my-4'>Create Fee Submission</h1>
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Student</label>
          <select
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          >
            <option value=''>Select a student</option>
            {Array.isArray(students) && students.map(student => (
              <option key={student._id} value={student._id}>{student.studentId}</option>
            ))}
          </select>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Submitted Fees</label>
          <input
            type='number'
            value={submittedFees}
            onChange={(e) => setSubmittedFees(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Submission Date</label>
          <input
            type='date'
            value={submissionDate}
            onChange={(e) => setSubmissionDate(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveFeeSubmission}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateFeeSubmission;
