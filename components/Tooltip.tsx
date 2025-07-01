"use client";

import { useState, ReactNode } from "react";

interface TooltipProps {
  children: ReactNode;
}

export default function Tooltip({ children }: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        position: "fixed",
        right: "20px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 1000,
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          fontSize: "20px",
          cursor: "pointer",
          boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
        }}
      >
        ?
      </button>
      {isOpen && (
        <div
          className="tooltip-content"
          style={{
            backgroundColor: "white",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "15px",
            marginTop: "10px",
            width: "1500px",
            maxHeight: "800px" /* Add a max-height */,
            overflowY: "auto" /* Enable vertical scrolling */,
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
