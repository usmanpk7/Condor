import React from 'react';
import '../CSS/Spinner.css'; // Import the CSS file for the spinner

const Spinner = () => {
  return (
    <div className="spinner-overlay">
      <div className="spinner"></div>
    </div>
  );
};

export default Spinner;
