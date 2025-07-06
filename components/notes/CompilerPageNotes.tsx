import React from "react";

export default function CompilerPageNotes() {
  return (
    <>
      <section>
        <h2>技術筆記：React Compiler（RC）</h2>

        <article>
          <h3>⚙️ React Compiler 是什麼？</h3>
          <p>
            <strong>React Compiler（RC）</strong> 是 React 團隊於 React 19
            引入的實驗性功能，目標是「
            <strong>
              將 React 元件編譯為效能更高的程式碼
            </strong>」，自動處理 <em>memoization</em>（記憶化）、
            <em>re-render 優化</em>
            ，讓開發者專注於撰寫邏輯，而不需手動使用 <code>useMemo</code>、
            <code>memo</code> 等優化工具。
          </p>
        </article>

        <article>
          <h3>🚀 使用 RC 前後差異</h3>
          <table border={1} cellPadding={6} cellSpacing={0}>
            <thead>
              <tr>
                <th>項目</th>
                <th>未使用 React Compiler</th>
                <th>使用 React Compiler</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>重新渲染控制</td>
                <td>
                  需手動加 <code>React.memo</code> / <code>useMemo</code>
                </td>
                <td>自動追蹤依賴與避免不必要渲染</td>
              </tr>
              <tr>
                <td>props 比較</td>
                <td>手動撰寫比較函式</td>
                <td>編譯時自動生成</td>
              </tr>
              <tr>
                <td>巢狀子元件</td>
                <td>每次父層 re-render 都會建立新函式</td>
                <td>RC 會靜態提取並記憶化</td>
              </tr>
              <tr>
                <td>開發者心智負擔</td>
                <td>需要理解多個 hook 與優化策略</td>
                <td>可以更專注在邏輯與可讀性</td>
              </tr>
            </tbody>
          </table>
        </article>

        <article>
          <h3>📦 如何啟用 React Compiler</h3>
          <ul>
            <li>
              需使用 <strong>React 19</strong> 並搭配特定 bundler（例如{" "}
              <code>Next.js 14+</code> App Router）
            </li>
            <li>
              需要安裝 Babel Plugin：
              <pre>
                <code>npm install --save-dev babel-plugin-react-compiler</code>
              </pre>
            </li>
            <li>
              修改 <code>babel.config.js</code> 或 <code>.babelrc</code>：
              <pre>
                <code>{`{
  "plugins": ["babel-plugin-react-compiler"]
}`}</code>
              </pre>
            </li>
            <li>未來版本會整合至 React 官方工具鏈，減少手動設定</li>
          </ul>
        </article>

        <article>
          <h3>📌 使用條件與限制</h3>
          <ul>
            <li>
              目前僅支援 <strong>client component</strong>
            </li>
            <li>
              不能使用 dynamic props 影響 component identity，例如 function
              props 改名
            </li>
            <li>
              要寫成 <strong>純函數元件（pure components）</strong>
              ，不能有副作用或全域依賴
            </li>
            <li>
              適用於非動畫/非 transition heavy 的場景，目前 animation
              整合仍在研究中
            </li>
          </ul>
        </article>

        <article>
          <h3>🎯 RC 帶來的優化範例</h3>
          <p>以下為 React Compiler 自動優化的範例：</p>
          <pre>
            <code>{`function TodoList({ todos }) {
  return todos.map(todo => <TodoItem key={todo.id} todo={todo} />);
}`}</code>
          </pre>
          <p>過去你可能需要手動加上：</p>
          <ul>
            <li>
              <code>React.memo(TodoItem)</code>
            </li>
            <li>
              或透過 <code>useCallback</code> 傳入 stable props
            </li>
          </ul>
          <p>
            有了 RC，React 編譯器會自動幫你分析 <code>todo</code>{" "}
            的穩定性與重新渲染需求。
          </p>
        </article>
      </section>
    </>
  );
}
