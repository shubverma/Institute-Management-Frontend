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
    <div>
      <h1 className='text-xl text-center mb-2'>Create Fee Submission</h1>
      <div className='shadow-lg flex flex-col text-sm border rounded-2xl w-full max-w-lg p-6 mx-auto bg-white'>
        <div className='my-1'>
          <label className='block mb-1 text-gray-600'>Student</label>
          <select
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className='border border-gray-300 px-2 py-1 w-full rounded'
          >
            <option value=''>Select a student</option>
            {Array.isArray(students) && students.map(student => (
              <option key={student._id} value={student._id}>{student.studentId}</option>
            ))}
          </select>
        </div>
        <div className='my-1'>
          <label className='block mb-1 text-gray-600'>Submitted Fees</label>
          <input
            type='number'
            value={submittedFees}
            onChange={(e) => setSubmittedFees(e.target.value)}
            className='border border-gray-300 px-2 py-1 w-full rounded'
          />
        </div>
        <div className='my-1'>
          <label className='block mb-1 text-gray-600'>Submission Date</label>
          <input
            type='date'
            value={submissionDate}
            onChange={(e) => setSubmissionDate(e.target.value)}
            className='border border-gray-300 px-2 py-1 w-full rounded'
          />
        </div>
        <button className='bg-sky-500 hover:bg-sky-600 text-white py-1 px-2 rounded self-start text-sm mt-2' onClick={handleSaveFeeSubmission}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateFeeSubmission;
