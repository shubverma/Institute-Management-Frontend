import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Import the CSS file for styling

const HomePage = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Home Page</h1>
      <div className="button-container">
        <Link to='/students' className="button">Go to Student Page</Link>
        <Link to='/courses' className="button">Go to Course Page</Link>
        <Link to='/feeSubmissions' className="button">Go to FeeSubmission Page</Link>
      </div>
    </div>
  );
};

export default HomePage;