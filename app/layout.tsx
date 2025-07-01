"use client";

import Link from "next/link";
import "./styles.css"; // Import the new CSS file
import { ThemeProvider } from "../components/ThemeContext"; // Import ThemeProvider
import { usePathname } from "next/navigation"; // Import usePathname

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // Get the current path

  return (
    <html lang="zh-Hant">
      <body>
        <ThemeProvider>
          {" "}
          {/* Wrap children with ThemeProvider */}
          <header>
            <h1>React 19 Simple Demo</h1>
            <nav style={{ marginBottom: "1rem" }}>
              <Link
                href="/"
                style={{
                  marginRight: "1rem",
                  color: pathname === "/" ? "#007bff" : "#333",
                }}
              >
                Form hooks / Action
              </Link>
              <Link
                href="/about"
                style={{
                  marginRight: "1rem",
                  color: pathname === "/about" ? "#007bff" : "#333",
                }}
              >
                use
              </Link>
              <Link
                href="/contact"
                style={{ color: pathname === "/contact" ? "#007bff" : "#333" }}
              >
                others
              </Link>
              <Link
                href="/compiler"
                style={{ color: pathname === "/compiler" ? "#007bff" : "#333" }}
              >
                React compiler RC
              </Link>
            </nav>
          </header>
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
