import { useEffect, useRef, useState } from "react";
import CodeMirror from "codemirror";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/addon/edit/closebrackets";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/python/python";

function Editor() {
  const editorRef = useRef(null);
  const cmInstance = useRef(null);
  const languageRef = useRef("python");

  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState({
    javascript: "// JavaScript code here\nconsole.log('Hello JS');",
    python: "# Python code here\nprint('Hello Python')",
  });

  useEffect(() => {
    languageRef.current = language;
  }, [language]);

  useEffect(() => {
    if(cmInstance.current) return;
    cmInstance.current = CodeMirror(editorRef.current, {
      value: code[language],
      mode: language,
      theme: "dracula",
      lineNumbers: true,
      autoCloseBrackets: true,
    });

    cmInstance.current.on("change", (editor) => {
      const currentLang = languageRef.current;

      setCode((prev) => ({
        ...prev,
        [currentLang]: editor.getValue(),
      }));
    });
  }, []);

  useEffect(() => {
    if (!cmInstance.current) return;

    cmInstance.current.setOption("mode", language);
    cmInstance.current.setValue(code[language]);
  }, [language]);

  return (
    <div className="editor-container">
      <select
        className="language-select"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
      </select>

      <div className="editor-area" ref={editorRef} /> 
    </div>
  );
}

export default Editor;
