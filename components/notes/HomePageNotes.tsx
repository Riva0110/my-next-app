import React from "react";

export default function HomePageNotes() {
  return (
    <>
      <h2>技術筆記：React 19 表單三寶</h2>

      <article>
        <h3>
          🧩 <code>useActionState</code>
        </h3>
        <p>
          用來管理 <strong>表單提交的狀態與邏輯</strong>，可取代舊版的{" "}
          <code>useFormState</code>。 它會回傳：
        </p>
        <ul>
          <li>
            <code>state</code>：儲存 action 回傳的資料（如錯誤訊息、成功結果）
          </li>
          <li>
            <code>formAction</code>：要綁定在{" "}
            <code>&lt;form action=...&gt;</code> 上的函式
          </li>
          <li>
            <code>isPending</code>：是否正在提交，可用於顯示 loading 狀態
          </li>
        </ul>
      </article>

      <article>
        <h3>
          🚦 <code>useFormStatus</code>
        </h3>
        <p>
          用於 <strong>取得目前所在表單的提交狀態</strong>
          （例如是否正在送出）。適合用在表單內的子元件，例如「提交按鈕」：
        </p>
        <ul>
          <li>
            <code>pending</code>：是否處於送出中
          </li>
          <li>
            常用於按鈕 <code>disabled</code> 狀態或顯示 loading spinner
          </li>
          <li>可讓按鈕元件與整體表單邏輯解耦</li>
        </ul>
      </article>

      <article>
        <h3>
          ⚡ <code>useOptimistic</code>
        </h3>
        <p>
          用於實現 <strong>樂觀 UI 更新</strong>
          ，在資料還沒送出成功前，預先在畫面上更新資料，提升回饋速度與使用者體驗。
        </p>
        <ul>
          <li>回傳預測狀態（Optimistic State）與 setter 函式</li>
          <li>常用於留言、推文、清單更新等場景</li>
          <li>
            搭配 <code>useActionState</code> 可同步處理成功與失敗狀況
          </li>
        </ul>
      </article>

      <p>
        <strong>常見組合：</strong>
      </p>
      <ul>
        <li>
          <code>useActionState</code> 處理提交邏輯
        </li>
        <li>
          <code>useFormStatus</code> 控制按鈕狀態
        </li>
        <li>
          <code>useOptimistic</code> 優化使用者體感
        </li>
      </ul>
    </>
  );
}
