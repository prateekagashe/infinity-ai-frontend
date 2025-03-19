// import React, { useEffect } from "react";
// import { SandpackProvider, SandpackLayout, SandpackCodeEditor, SandpackPreview, SandpackConsole, useSandpack } from "@codesandbox/sandpack-react";
// // import "@codesandbox/sandpack-react/dist/index.css";


// export const SandpackWrapper = ({ codeFiles, sandpackKey, setErrorMessage, sendMessage }) => {
//     return (
//       <SandpackProvider key={sandpackKey} template="react" theme="light" files={codeFiles}
//         customSetup={{
//           dependencies: {
//             "antd": "^5.0.0",
//             "react-markdown": "^9.0.0",
//             "@ant-design/icons": "^5.0.0",
//             "ace-builds": "^1.0.0",
//             "react-ace": "^9.5.0"
//           }
//         }}
//         // theme={githubLight} 
//         // template="react" 
//         options={{
//           showLineNumbers: true, // Enable line numbers
//           showNavigator: true,   // Show file navigator
//           editorHeight: 400,     // Set height
//           resizablePanels: true, // Allow resizing editor & preview
//         }}
//       >
//         <SandpackLayout>
//           <SandpackCodeEditor showTabs showLineNumbers style={{ height: 300 }} />
//           <SandpackPreview />
//           <SandpackConsole />
//           <SandpackErrorListener setErrorMessage={setErrorMessage} sendMessage={sendMessage} />

//         </SandpackLayout>
//       </SandpackProvider>
//     );
//   };
  

  
//   const SandpackErrorListener = ({ setErrorMessage, sendMessage }) => {
//     const { listen } = useSandpack();
  
//     useEffect(() => {
//       const unsubscribe = listen((message) => {
//         console.log("Sandpack Message:", message); // Debugging logs
  
//         if (message.type === "console" && message.log?.length > 0) {
//           // Find "error" logs
//           const errorLogs = message.log
//             .filter((log) => log.method === "error")
//             .map((log) => log.data.join("\n")) // Join multiple error lines
  
//           if (errorLogs.length > 0) {
//             setErrorMessage(errorLogs.join("\n\n")); // Store all errors
//             // sendMessage(true)
//           }
//         }
//       });
  
//       return () => unsubscribe(); // Cleanup listener
//     }, [listen, setErrorMessage, sendMessage]);
  
//     return null;
//   };

import React, { useEffect, useState } from "react";
import { SandpackProvider, SandpackLayout, SandpackCodeEditor, SandpackPreview } from "@codesandbox/sandpack-react";
import { Hook, Unhook, Console } from "console-feed";

const CustomSandpack = ({ codeFiles, sandpackKey }) => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const hookedConsole = (log) => setLogs((currLogs) => [...currLogs, log]);
    Hook(window.console, hookedConsole, false);
    return () => Unhook(window.console);
  }, []);

  return (
    <SandpackProvider
      template="react"
      key={sandpackKey}
      files={codeFiles}
      customSetup={{
                  dependencies: {
                    "react-markdown": "^9.0.0",
                    "ace-builds": "^1.0.0",
                    "react-ace": "^9.5.0",
                    "antd": "^5.24.3",
                    "react": "^19.0.0",
                    "react-dom": "^19.0.0",
                    "@ant-design/icons": "^5.6.1",

                  }
                }}
                options={{
                            showLineNumbers: true, // Enable line numbers
                            showNavigator: true,   // Show file navigator
                            editorHeight: 500,     // Set height
                            resizablePanels: true, // Allow resizing editor & preview
                          }}    >
      <SandpackLayout>
        <SandpackCodeEditor />
        <SandpackPreview />
      </SandpackLayout>

      {/* Console Logs */}
      <div style={{ background: "#1e1e1e", color: "white", padding: "10px", height: "200px", overflowY: "auto" }}>
        <Console logs={logs} variant="dark" />
      </div>
    </SandpackProvider>
  );
};

export default CustomSandpack;

  
  