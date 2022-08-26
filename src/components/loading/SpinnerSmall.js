import React from "react";

export default function SpinnerSmall() {
  return (
    <div className="spinner-container">
      <div 
        className="loading-spinner"
        style={{
          width: "20px",
          height: "20px",
          border: "10px solid #f3f3f3",
          borderTop: "10px solid #383636",
          borderRadius: "50%",
          animation: "spinner 1.5s linear infinite"
        }}
      >
      </div>
    </div>
  );
}