"use client";

import Tooltip from "./Tooltip";

interface AboutClientProps {
  initialData: string;
}

export default function AboutClient({ initialData }: AboutClientProps) {
  return (
    <>
      <div>
        <h3>About Page Content</h3>
        <p>{initialData}</p>
      </div>
      <Tooltip>
        <h4>技術筆記:</h4>
        <p>
          <strong>use Hook:</strong> React 19 新增的 Hook，允許你在 Client
          Component 中直接讀取 Promise
          的值，讓非同步資料獲取更像同步操作。它會與 Suspense
          搭配使用來處理加載狀態。
        </p>
        <p>
          <strong>cache Function:</strong> 來自 React 的 `cache`
          函數，用於記憶化資料獲取函數的結果。這可以防止重複的資料獲取，特別是在多個組件或多次渲染嘗試獲取相同資料時。
        </p>
        <p>
          <strong>Server Components (with async/await):</strong> 在 Next.js
          中，Server Components 可以直接使用 `async/await`
          來獲取資料。這是處理初始資料獲取的推薦方式，因為它在伺服器端完成，減少了客戶端的負擔，並與
          `Suspense` 完美配合。
        </p>
      </Tooltip>
    </>
  );
}
