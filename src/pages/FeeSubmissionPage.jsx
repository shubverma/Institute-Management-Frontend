import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const FeeSubmissionPage = () => {
  const [feeSubmissions, setFeeSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/feeSubmissions')
      .then((response) => {
        setFeeSubmissions(response.data);
          setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-4'>
      <div className='flex justify-center items-center gap-x-4'>
        <h1 className='text-3xl my-8'>Fee Submissions List</h1>
        <Link to='/feeSubmissions/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <table className='w-full border sperate border-spacing-2'>
          <thead>
            <tr>
              <th className='border border-slate-600 rounded-md'>Student ID</th>
              <th className='border border-slate-600 rounded-md'>Submitted Fees</th>
              <th className='border border-slate-600 rounded-md'>Submission Date</th>
              <th className='border border-slate-600 rounded-md'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {feeSubmissions.map((submission) => (
              <tr key={submission._id} className='h-8'>
                <td className='border border-slate 700 rounded-md text-center'>
                  {submission.studentId}
                </td>
                <td className='border border-slate 700 rounded-md text-center'>
                  {submission.submitted_Fees}
                </td>
                <td className='border border-slate 700 rounded-md text-center'>
                  {new Date(submission.submission_Date).toLocaleDateString()}
                </td>
                <td className='border border-slate 700 rounded-md text-center'>
                  <Link to={`/feeSubmissions/delete/${submission._id}`}>
                    <MdOutlineDelete className='text-2xl text-red-800' />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FeeSubmissionPage;
