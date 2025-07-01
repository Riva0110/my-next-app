"use client";

import { Suspense, use, useMemo } from "react";
import Tooltip from "../../components/Tooltip";
import { ThemeContext } from "../../components/ThemeContext"; // Corrected import for ThemeContext
import AboutPageNotes from "@/components/notes/AboutPageNotes";

// Simulate an asynchronous data fetch
async function fetchDataInternal() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Data fetched using React 19 use hook in Client Component!");
    }, 2000); // Simulate 2-second delay
  });
}

function AboutContent() {
  // Use useMemo to create a stable promise for the use hook
  const dataPromise = useMemo(() => fetchDataInternal(), []);
  const data = use(dataPromise);

  // Use the `use` hook to consume ThemeContext
  const theme = use(ThemeContext);

  return (
    <div>
      <p>{data}</p>
      <button
        style={{
          backgroundColor: theme.buttonColor,
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Purple Button
      </button>
    </div>
  );
}

export default function AboutPage() {
  return (
    <main>
      <h2>use</h2>
      <Suspense fallback={<div>Loading about data...</div>}>
        <AboutContent />
      </Suspense>
      <Tooltip>
        <AboutPageNotes />
      </Tooltip>
    </main>
  );
}
