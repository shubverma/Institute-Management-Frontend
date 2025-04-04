import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { fetchCoursesRequest } from "../store/actions/courseActions";

const CoursePage = () => {
  const dispatch = useDispatch();
  const { courses, loading } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchCoursesRequest());
  }, [dispatch]);

  return (
    <div>
      <div className="flex justify-center items-center gap-x-2 mb-2">
        <h1 className="text-xl">Courses</h1>
        <Link to="/courses/create">
          <MdOutlineAddBox className="text-sky-800 text-xl" />
        </Link>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full border sperate border-spacing-2">
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-md">Course ID</th>
              <th className="border border-slate-600 rounded-md">Name</th>
              <th className="border border-slate-600 rounded-md">Duration</th>
              <th className="border border-slate-600 rounded-md">Fees</th>
              <th className="border border-slate-600 rounded-md">Operations</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={course._id} className="h-8">
                <td className="border border-slate 700 rounded-md text-center">
                  {course.courseId}
                </td>
                <td className="border border-slate 700 rounded-md text-center">
                  {course.name}
                </td>
                <td className="border border-slate 700 rounded-md text-center">
                  {course.duration}
                </td>
                <td className="border border-slate 700 rounded-md text-center">
                  {course.fees}
                </td>
                <td className="border border-slate 700 rounded-md text-center">
                  <div className="flex justify-center items-center gap-x-2 border-slate-700 rounded-md text-center">
                    <Link to={`/courses/${course._id}`}>
                      <BsInfoCircle className="text-l text-green-800" />
                    </Link>
                    <Link to={`/courses/edit/${course._id}`}>
                      <AiOutlineEdit className="text-l text-green-800" />
                    </Link>
                    <Link to={`/courses/delete/${course._id}`}>
                      <MdOutlineDelete className="text-l text-red-800" />
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

export default CoursePage;
