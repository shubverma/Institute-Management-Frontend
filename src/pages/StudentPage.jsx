import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const StudentPage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/students/')
      .then((response) => {
        setStudents(response.data.data);
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
        <h1 className='text-3xl my-8'>Students List</h1>
        <Link to='/students/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <table className='w-full border sperate border-spacing-2'>
          <thead>
            <tr>
              <th className='border border-slate-600 rounded-md'>No</th>
              <th className='border border-slate-600 rounded-md'>Name</th>
              <th className='border border-slate-600 rounded-md max-w-md:hidden'>
                Date of Birth
              </th>
              <th className='border border-slate-600 rounded-md'>Course</th>
              <th className='border border-slate-600 rounded-md'>Operations</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student._id} className='h-8'>
                <td className='border border-slate 700 rounded-md text-center'>
                  {student.studentId}
                </td>
                <td className='border border-slate 700 rounded-md text-center'>
                  {student.studentName}
                </td>
                <td className='border border-slate 700 rounded-md text-center max-w-md:hidden'>
                  {new Date(student.doB).toLocaleDateString()}
                </td>
                <td className='border border-slate 700 rounded-md text-center'>
                  {student.course ? student.course.name : 'Unknown'}
                </td>
                <td className='border border-slate 700 rounded-md text-center'>
                  <div className='border-slate-700 rounded-md text-center'>
                    <Link to={`/students/${student._id}`}>
                      <BsInfoCircle className='text-2xl text-green-800' />
                    </Link>
                    <Link to={`/students/edit/${student._id}`}>
                      <AiOutlineEdit className='text-2xl text-green-800' />
                    </Link>
                    <Link to={`/students/delete/${student._id}`}>
                      <MdOutlineDelete className='text-2xl text-red-800' />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentPage;
