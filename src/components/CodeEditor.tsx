import React from "react";
import Editor from "@monaco-editor/react"

interface CodeEditorProps {
    theme?: string,
    onChange: (value: any, event: any) => void,
    code: string,
}

const CodeEditor: React.FC<CodeEditorProps> = ({theme, onChange, code}) => {
    return (
        <Editor 
            width="100%"
            height="100%"
            theme={theme ? theme : 'light'}
            language='javascript'
            options={{
                showUnused: false,
                folding: false,
                lineNumbersMinChars: 3,
                fontSize: 16,
                automaticLayout: true,
                scrollBeyondLastLine: false,
                tabSize: 3
            }}
            onChange={onChange}
            value={code}
        />
    );
}

export default CodeEditor;