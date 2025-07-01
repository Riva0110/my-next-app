"use client";

import { useState } from "react";

export default function CounterButton() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    const t0 = performance.now();
    setCount((prevCount) => prevCount + 1);
    const t1 = performance.now();
    console.log("Update took", t1 - t0, "ms");
  };

  return (
    <button
      onClick={handleClick}
      style={{
        padding: "12px 20px",
        fontSize: "18px",
        minWidth: "60px",
        minHeight: "60px",
        borderRadius: "8px",
        backgroundColor: "#6200EE" /* A nice purple */,
        color: "white",
        border: "none",
        margin: "5px",
        cursor: "pointer",
        transition: "background-color 0.3s ease, transform 0.1s ease",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3700B3")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#6200EE")}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {count}
    </button>
  );
}
