import Link from "next/link";
import './styles.css'; // Import the new CSS file

// app/layout.tsx
export const metadata = {
  title: "我的網站",
  description: "練習 Next.js App Router",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-Hant">
      <body>
        <header>
          <h1>🧭 我的網站</h1>
          <nav style={{ marginBottom: "1rem" }}>
            <Link href="/" style={{ marginRight: "1rem" }}>
              首頁
            </Link>
            <Link href="/about" style={{ marginRight: "1rem" }}>
              關於
            </Link>
            <Link href="/contact">聯絡</Link>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}