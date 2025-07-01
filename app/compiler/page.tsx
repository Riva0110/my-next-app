"use client";

import { useState } from "react";
import CounterButton from "../../components/CounterButton"; // Import the new CounterButton component

// CounterList.tsx
export default function CounterList() {
  const [num, setNum] = useState(1000);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <button
        style={{
          width: "160px",
          height: "60px",
          fontSize: "24px",
          marginBottom: "20px",
          borderRadius: "8px",
          backgroundColor: "white",
          cursor: "pointer",
        }}
        onClick={() => {
          const t0 = performance.now();
          setNum((prev) => prev - 1);
          const t1 = performance.now();
          console.log("Update took", t1 - t0, "ms");
        }}
      >
        {num}
      </button>
      <div>
        {Array(1000)
          .fill(0)
          .map((_, index) => (
            <CounterButton key={index} />
          ))}
      </div>
    </div>
  );
}
