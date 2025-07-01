"use client";

import { useState, ReactNode, useRef, useEffect } from "react";

interface TooltipProps {
  children: ReactNode;
}

export default function Tooltip({ children }: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null); // Ref for the tooltip container

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    // Add event listener when tooltip is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      // Clean up event listener when tooltip is closed
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Clean up event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]); // Re-run effect when isOpen changes

  return (
    <>
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999, // Slightly lower than tooltip
          }}
          onClick={() => setIsOpen(false)} // Close tooltip when overlay is clicked
        />
      )}
      <div
        ref={tooltipRef}
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
              width: "1400px",
              height: "calc(100vh - 100px)" /* Add a max-height */,
              overflowY: "auto" /* Enable vertical scrolling */,
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            {children}
          </div>
        )}
      </div>
    </>
  );
}
