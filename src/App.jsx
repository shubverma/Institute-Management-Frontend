import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import StudentPage from "./pages/StudentPage";
import CoursePage from "./pages/CoursePage";
import FeeSubmissionPage from "./pages/FeeSubmissionPage";
import ShowStudent from "./pages/Operations/StudentsCRUD/ShowStudent";
import ShowCourse from "./pages/Operations/CourseCRUD/ShowCourse";
import CreateStudent from "./pages/Operations/StudentsCRUD/CreateStudent";
import CreateCourse from "./pages/Operations/CourseCRUD/CreateCourse";
import CreateFeeSubmission from "./pages/Operations/FeeSubmissionCR/CreateFee";
import EditStudent from "./pages/Operations/StudentsCRUD/EditStudent";
import EditCourse from "./pages/Operations/CourseCRUD/EditCourse";
import DeleteStudent from "./pages/Operations/StudentsCRUD/DeleteStudent";
import DeleteCourse from "./pages/Operations/CourseCRUD/DeleteCourse";
import DeleteFee from "./pages/Operations/FeeSubmissionCR/DeleteFee";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/students" element={<StudentPage />} />
        <Route path="/students/create" element={<CreateStudent />} />
        <Route path="/students/edit/:id" element={<EditStudent />} />
        <Route path="/students/delete/:id" element={<DeleteStudent />} />
        <Route path="/students/:id" element={<ShowStudent />} />
        <Route path="/courses" element={<CoursePage />} />
        <Route path="/courses/create" element={<CreateCourse />} />
        <Route path="/courses/:id" element={<ShowCourse />} />
        <Route path="/courses/edit/:id" element={<EditCourse />} />
        <Route path="/courses/delete/:id" element={<DeleteCourse />} />
        <Route path="/feeSubmissions" element={<FeeSubmissionPage />} />
        <Route
          path="/feeSubmissions/create"
          element={<CreateFeeSubmission />}
        />
        <Route path="/feeSubmissions/delete/:id" element={<DeleteFee />} />
      </Route>
    </Routes>
  );
};

export default App;
