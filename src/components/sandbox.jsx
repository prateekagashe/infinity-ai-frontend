import React, { useEffect } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  useSandpack,
} from "@codesandbox/sandpack-react";

export const SandpackWrapper = ({ codeFiles, sandpackKey, setErrorMessage, sendMessage }) => {
  return (
    <SandpackProvider
      key={sandpackKey}
      template="react"
      theme="dark"
      files={codeFiles}
      customSetup={{
        dependencies: {
          "antd": "^5.0.0",
          "react-markdown": "^9.0.0",
          "@ant-design/icons": "^5.0.0",
          "ace-builds": "^1.0.0",
          "react-ace": "^9.5.0"
        }
      }}
    >
      <SandpackLayout style={{ height: "500px", border: "1px solid #ddd", borderRadius: "8px" }}>
        {/* Editor */}
        <SandpackCodeEditor showTabs showLineNumbers style={{ height: "300px" }} />

        {/* Preview Pane */}
        <SandpackPreview style={{ flexGrow: 1, minHeight: "250px", backgroundColor: "#f9f9f9" }} />

        {/* Error Listener */}
        <SandpackErrorListener setErrorMessage={setErrorMessage} sendMessage={sendMessage} />
      </SandpackLayout>
    </SandpackProvider>
  );
};

const SandpackErrorListener = ({ setErrorMessage, sendMessage }) => {
  const { listen } = useSandpack();

  useEffect(() => {
    const unsubscribe = listen((message) => {
      console.log("Sandpack Message:", message); // Debugging logs

      if (message.type === "console" && message.log?.length > 0) {
        // Extract "error" messages
        const errorLogs = message.log
          .filter((log) => log.method === "error")
          .map((log) =>
            log.data
              .map((item) => (typeof item === "object" ? JSON.stringify(item, null, 2) : item))
              .join("\n")
          );

        if (errorLogs.length > 0) {
          setErrorMessage(errorLogs.join("\n\n")); // Store all errors
        //   sendMessage(true);
        }
      }
    });

    return () => unsubscribe(); // Cleanup listener
  }, [listen, setErrorMessage, sendMessage]);

  return null;
};
