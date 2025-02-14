import React, { useEffect, useState } from "react";
import "prismjs";
import "prismjs/components/prism-javascript"; 
import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import Editor from "react-simple-code-editor";
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import "highlight.js/styles/github-dark.css"
import axios from "axios";
import "./App.css";


const App = () => {
  const [code, setCode] = useState(""); 

  const [review, setReview] = useState(``)

  useEffect(() => {
    prism.highlightAll();
  }, []); 

  async function reviewCode() {
    const response = await axios.post('http://localhost:3000/ai/get-review', { code });
    console.log(response.data);
    setReview(response.data);
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 18,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%",
              }}
            />
          </div>
          <div
            onClick={reviewCode}
           className="review">
            Review
          </div>
        </div>
        <div className="right">
            <Markdown
              rehypePlugins={ [rehypeHighlight] }
            >{review}</Markdown>
        </div>
      </main>
    </>
  );
};

export default App;
