// src/components/SuccessPage.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SuccessPage.css'; // We'll create this CSS file later

const SuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { submittedData } = location.state || {}; // Get data passed via navigate

  if (!submittedData) {
    // Redirect to form if no data is present (e.g., direct navigation to /success)
    navigate('/');
    return null;
  }

  return (
    <div className="success-container">
      <h2>Registration Successful!</h2>
      <p>Thank you for registering. Here are the details you provided:</p>
      <div className="details-card">
        {Object.entries(submittedData).map(([key, value]) => (
          <div className="detail-item" key={key}>
            <strong>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}: </strong>
            {key === 'password' ? '********' : value}
          </div>
        ))}
      </div>
      <button onClick={() => navigate('/')} className="back-button">
        Go Back to Form
      </button>
    </div>
  );
};

export default SuccessPage;