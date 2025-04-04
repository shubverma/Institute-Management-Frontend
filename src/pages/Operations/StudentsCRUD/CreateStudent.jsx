import React, { useState, useEffect } from "react";
import BackButton from "../../../components/BackButton";
import Spinner from "../../../components/spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const CreateStudent = () => {
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [doB, setDoB] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [course, setCourse] = useState("");
  const [committedFees, setCommittedFees] = useState(""); // State for committedFees
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // Fetch courses data from the backend
    axios
      .get("http://localhost:5555/courses")
      .then((response) => {
        setCourses(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  const handleSaveStudent = () => {
    const data = {
      studentId,
      studentName,
      fatherName,
      motherName,
      doB,
      phone,
      address,
      course,
      committedFees,
    };
    setLoading(true);
    axios
      .post("http://localhost:5555/students", data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Student Created successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div>
      <h1 className="text-xl text-center mb-2">Add Student</h1>
      {loading ? <Spinner /> : ""}
      <div className="shadow-lg border rounded-2xl w-full max-w-lg p-6 mx-auto bg-white">
        <div className="flex text-sm">
          <div className="flex-1 p-1">
            <div className="mb-4">
              <label className="block mb-1 text-gray-600">Student ID</label>
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="border border-gray-300 px-2 py-1 w-full rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-gray-600">Student Name</label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="border border-gray-300 px-2 py-1 w-full rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-gray-600">Father's Name</label>
              <input
                type="text"
                value={fatherName}
                onChange={(e) => setFatherName(e.target.value)}
                className="border border-gray-300 px-2 py-1 w-full rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-gray-600">Mother's Name</label>
              <input
                type="text"
                value={motherName}
                onChange={(e) => setMotherName(e.target.value)}
                className="border border-gray-300 px-2 py-1 w-full rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-gray-600">Date of Birth</label>
              <input
                type="date"
                value={doB}
                onChange={(e) => setDoB(e.target.value)}
                className="border border-gray-300 px-2 py-1 w-full rounded"
              />
            </div>
          </div>
          <div className="flex-1 p-1">
            <div className="mb-4">
              <label className="block mb-1 text-gray-600">Phone</label>
              <input
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border border-gray-300 px-2 py-1 w-full rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-gray-600">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="border border-gray-300 px-2 py-1 w-full rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-gray-600">Course</label>
              <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="border border-gray-300 px-2 py-1 w-full rounded bg-white"
              >
                <option value="">Select a course</option>
                {Array.isArray(courses) &&
                  courses.map((course) => (
                    <option key={course._id} value={course._id}>
                      {course.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="block mb-1 text-gray-600">Committed Fees</label>
              <input
                type="number"
                value={committedFees}
                onChange={(e) => setCommittedFees(e.target.value)}
                className="border border-gray-300 px-2 py-1 w-full rounded"
              />
            </div>
          </div>
        </div>
        <button
          className="bg-sky-500 hover:bg-sky-600 text-white py-1 px-2 rounded self-start text-sm"
          onClick={handleSaveStudent}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateStudent;
