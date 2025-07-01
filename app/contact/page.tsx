// app/contact/page.tsx
export default function ContactPage() {
  return (
    <>
      <title>Riva</title>
      <meta
        property="og:description"
        content="The library for web and native user interfaces"
        data-next-head=""
      ></meta>
      <h2>React 19 其他更新</h2>
      <h3>ref as a prop </h3>
      <h4>
        在 React 19 中，ref 可以直接作為 prop 傳遞給組件，而不需要使用
        <code>forwardRef</code>。這使得組件可以更簡單地接收 ref。
      </h4>
      <pre>
        <code>
          {`function MyInput({ placeholder, ref }) {
  return <input placeholder={placeholder} ref={ref} />
}

<MyInput ref={ref} />`}
        </code>
      </pre>
      <h3>Diffs for hydration errors</h3>
      <h4>
        improved error reporting for hydration errors in <code>react-dom</code>.
      </h4>
      <pre>
        <code>
          {`Warning: Text content did not match. Server: “Server” Client: “Client”
  at span
  at App
Warning: An error occurred during hydration. The server HTML was replaced with client content in <div>.
Warning: Text content did not match. Server: “Server” Client: “Client”
  at span
  at App
Warning: An error occurred during hydration. The server HTML was replaced with client content in <div>.
Uncaught Error: Text content does not match server-rendered HTML.
  at checkForUnmatchedText`}
        </code>
      </pre>
      <pre>
        <code>
          {`Uncaught Error: Hydration failed because the server rendered HTML didn’t match the client. As a result this tree will be regenerated on the client. This can happen if an SSR-ed Client Component used:

- A server/client branch if (typeof window !== 'undefined').
- Variable input such as Date.now() or Math.random() which changes each time it’s called.
- Date formatting in a user’s locale which doesn’t match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.

It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.

https://react.dev/link/hydration-mismatch 

  <App>
    <span>
+    Client
-    Server

  at throwOnHydrationMismatch
  …`}
        </code>
      </pre>
      <h3>{`<Context> as a provider`}</h3>
      <h4>{`In React 19, you can render <Context> as a provider instead of <Context.Provider>:`}</h4>
      <pre>
        <code>
          {`const ThemeContext = createContext('');

function App({children}) {
  return (
    <ThemeContext value="dark">
      {children}
    </ThemeContext>
  );  
}`}
        </code>
      </pre>
      <h3>Cleanup functions for refs</h3>
      <h4>
        We now support returning a cleanup function from ref callbacks, When the
        component unmounts, React will call the cleanup function returned from
        the ref callback.
        <br />
        <br />
        Previously, React would call ref functions with null when unmounting the
        component. If your ref returns a cleanup function, React will now skip
        this step. In future versions, we will deprecate calling refs with null
        when unmounting components.
      </h4>
      <pre>
        <code>
          {`<input
  ref={(ref) => {
    // ref created

    // NEW: return a cleanup function to reset
    // the ref when element is removed from DOM.
    return () => {
      // ref cleanup
    };
  }}
/>
`}
        </code>
      </pre>
      <h3>Support for Document Metadata</h3>
      <h4>
        {`In HTML, document metadata tags like <title>, <link>, and <meta> are reserved for placement in the <head> section of the document.`}
        In React 19, we’re adding support for rendering document metadata tags
        in components natively:
      </h4>
      <pre>
        <code>
          {`function BlogPost({post}) {
  return (
    <article>
      <h1>{post.title}</h1>
      <title>{post.title}</title>
      <meta name="author" content="Josh" />
      <link rel="author" href="https://twitter.com/joshcstory/" />
      <meta name="keywords" content={post.keywords} />
      <p>
        Eee equals em-see-squared...
      </p>
    </article>
  );
}`}
        </code>
      </pre>
      More ......{" "}
      <a
        href="https://react.dev/blog/2024/12/05/react-19#improvements-in-react-19"
        target="_blank"
      >
        #improvements-in-react-19
      </a>
    </>
  );
}
