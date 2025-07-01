"use client";

import { useState } from "react";
import CounterButton from "../../components/CounterButton"; // Import the new CounterButton component
import CompilerPageNotes from "@/components/notes/CompilerPageNotes";
import Tooltip from "@/components/Tooltip";

// CounterList.tsx
export default function CounterList() {
  const [num, setNum] = useState(1000);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <a
        href="https://playground.react.dev/#N4Igzg9grgTgxgUxALhAgHgBwjALgAgBMEAzAQygBsCSoA7OXASwjvwFkBPAQU0wAoAlPmAAdNvhgJcsNgB5CTAG4A+ABIJKlCPgDqOSoTkB6RaoDc4gL7iQVoA"
        target="_blank"
        style={{
          fontSize: "24px",
          marginBottom: "20px",
          textDecoration: "none",
          color: "blue",
        }}
      >
        playground
      </a>
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
      <Tooltip>
        <CompilerPageNotes />
      </Tooltip>
    </div>
  );
}
