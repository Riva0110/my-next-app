"use client";

import { Suspense, use } from "react";
import Tooltip from "../../components/Tooltip";
import { ThemeContext } from "../../components/ThemeContext"; // Corrected import for ThemeContext
import AboutPageNotes from "@/components/notes/AboutPageNotes";

// Simulate an asynchronous data fetch
async function fetchDataInternal() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("I'm data. I'm data.");
    }, 2000); // Simulate 2-second delay
  });
}

function AboutContent() {
  // Use useMemo to create a stable promise for the use hook
  const dataPromise = fetchDataInternal();
  const data = use(dataPromise);

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <p>{data}</p>
    </div>
  );
}

export default function AboutPage() {
  // Use the `use` hook to consume ThemeContext
  const theme = use(ThemeContext);

  return (
    <main>
      <h2>use</h2>
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
      <br />
      <br />
      button&apos;s color is from ThemeContext: {theme.buttonColor}
      <br />
      <br />
      ------
      <br />
      <strong>
        below's data is fetched using the <code>use</code> hook in a Client
        Component.
      </strong>
      <Suspense fallback={<p>Loading about data...</p>}>
        <AboutContent />
      </Suspense>
      <Tooltip>
        <AboutPageNotes />
      </Tooltip>
    </main>
  );
}
