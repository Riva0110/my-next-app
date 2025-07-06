import React from "react";

export default function AboutPageNotes() {
  return (
    <>
      <h2>
        技術筆記：React 19 中的 <code>use()</code> Hook
      </h2>

      <article>
        <h3>
          🧩 <code>use()</code> 的用途與特性
        </h3>
        <p>
          <code>use()</code> 是 React 19 引入的新函式（非
          hook），允許你在元件中直接「等待」一個 Promise 或 Context 值，常搭配{" "}
          <code>Suspense</code> 使用。
        </p>
        <ul>
          <li>
            可在 <strong>Server Component</strong> 中用來{" "}
            <strong>同步 await 資料</strong>（可取代 <code>await</code>）
          </li>
          <li>
            可在 <strong>Client Component</strong> 中搭配{" "}
            <code>&lt;Suspense&gt;</code> 用來處理資料加載
          </li>
          <li>
            可讀取 Promise（如 fetch）、也可直接讀取 Context（React 19
            的新功能）
          </li>
        </ul>
      </article>

      <article>
        <h3>
          🧠 <code>useMemo()</code>：確保 Promise 穩定
        </h3>
        <p>
          在 Client Component 中，為了避免 Promise
          在每次渲染時重新創建，導致組件永遠處於 loading 狀態，應使用{" "}
          <code>useMemo()</code> 將 Promise 記憶化：
        </p>
        <pre>
          <code>{`const dataPromise = useMemo(() => fetchData(), []);`}</code>
        </pre>
        <p>
          然後搭配 <code>use(dataPromise)</code> 取得結果，確保 Suspense
          正常運作。
        </p>
      </article>

      <article>
        <h3>
          📦 <code>use()</code> 搭配 Context（React 19 新增）
        </h3>
        <p>
          React 19 支援在元件中直接使用 <code>use(Context)</code> 取得 context
          值，不必透過 <code>useContext()</code>。
        </p>
        <p>優點：</p>
        <ul>
          <li>語法更簡潔，尤其在條件式邏輯中更靈活</li>
          <li>
            搭配 <code>Suspense</code> 可自動處理 context 的非同步 loading
          </li>
        </ul>
      </article>

      <article>
        <h3>
          📊 <code>use()</code> vs <code>useContext()</code> 差異比較
        </h3>
        <table border={1} cellPadding={6} cellSpacing={0}>
          <thead>
            <tr>
              <th>功能比較</th>
              <th>
                <code>use()</code>
              </th>
              <th>
                <code>useContext()</code>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>可讀取的內容</td>
              <td>✅ Promise / Context</td>
              <td>❌ 僅限 Context</td>
            </tr>
            <tr>
              <td>使用位置彈性</td>
              <td>✅ 可在條件語句中呼叫</td>
              <td>❌ 必須在組件頂層呼叫</td>
            </tr>
            <tr>
              <td>Suspense 整合</td>
              <td>✅ 可暫停渲染等待結果</td>
              <td>❌ 不支援暫停</td>
            </tr>
            <tr>
              <td>用於 async loading</td>
              <td>✅ 支援</td>
              <td>❌ 不支援</td>
            </tr>
          </tbody>
        </table>
      </article>

      <article>
        <h3>⚠️ 注意事項</h3>
        <ul>
          <li>
            <code>use()</code> 不是 hook，不能在普通函式中使用，只能用在 React
            元件或自定義 hook 裡
          </li>
          <li>
            Client Component 使用 <code>use()</code> 必須搭配{" "}
            <code>&lt;Suspense&gt;</code>，否則會 throw error
          </li>
          <li>
            如果使用的是非穩定 Promise（每次 render 都重新創建），會導致無限
            loading
          </li>
        </ul>
      </article>
    </>
  );
}
