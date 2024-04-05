import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const CoursePage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/courses/') 
      .then((response) => {
        setCourses(response.data.data);
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
        <h1 className='text-3xl my-8'>Courses List</h1>
        
        { <Link to='/courses/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>}
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <table className='w-full border sperate border-spacing-2'>
          <thead>
            <tr>
              <th className='border border-slate-600 rounded-md'>Course ID</th>
              <th className='border border-slate-600 rounded-md'>Name</th>
              <th className='border border-slate-600 rounded-md'>Duration</th>
              <th className='border border-slate-600 rounded-md'>Fees</th>
            
              {<th className='border border-slate-600 rounded-md'>Operations</th>}
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={course._id} className='h-8'>
                <td className='border border-slate 700 rounded-md text-center'>
                  {course.courseId}
                </td>
                <td className='border border-slate 700 rounded-md text-center'>
                  {course.name}
                </td>
                <td className='border border-slate 700 rounded-md text-center'>
                  {course.duration}
                </td>
                <td className='border border-slate 700 rounded-md text-center'>
                  {course.fees}
                </td>
                {<td className='border border-slate 700 rounded-md text-center'>
                  <Link to={`/courses/${course._id}`}>
                    <BsInfoCircle className='text-2xl text-green-800' />
                  </Link>
                  <Link to={`/courses/edit/${course._id}`}>
                    <AiOutlineEdit className='text-2xl text-green-800' />
                  </Link>
                  <Link to={`/courses/delete/${course._id}`}>
                    <MdOutlineDelete className='text-2xl text-red-800' />
                  </Link>
                </td> }
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CoursePage;
