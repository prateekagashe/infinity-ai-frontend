import React, { useState, useRef, useEffect } from "react";
import { Sandpack, useSandpack } from "@codesandbox/sandpack-react";
import { Input, Button, Card, Typography, Spin, message, Flex, Avatar, Tooltip, Upload } from "antd";
import ReactMarkdown from "react-markdown";
import { CopyOutlined, UserOutlined, RobotOutlined, SendOutlined, UploadOutlined, ExpandOutlined } from "@ant-design/icons";
import { SandpackProvider, SandpackLayout, SandpackCodeEditor, SandpackPreview, SandpackConsole } from "@codesandbox/sandpack-react";
import CustomSandpack from "./customeSandBox";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import remarkGfm from "remark-gfm";
import { Typewriter } from "react-simple-typewriter";

const { Text } = Typography;

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [sandpackKey, setSandpackKey] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [hasErrors, setHasErrors] = useState(false);
  // const sandbox = useSandpack()
  const [isExpanded, setIsExpanded] = useState(false);

  const [codeFiles, setCodeFiles] = useState();
  // console.log('err', errorMessage)
  const messagesEndRef = useRef(null);
  const toggleSandbox = () => {
    setIsExpanded((prev) => !prev);
  };
  // const handleSandpackErrors = (sandpack) => {
  //   sandpack.listen((message) => {
  //     if (message.type === "action" && message.action === "console") {
  //       const log = message.log;
  //       if (log && log.type === "error") {
  //         setErrorMessage(log.message);
  //       }
  //     }
  //   });
  // };
  

  // useEffect(() => {
  //   if (sandbox) {
  //     handleSandpackErrors(sandbox);
  //   }
  // }, [sandbox]);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleImageChange = (info) => {
    const file = info.fileList[0]?.originFileObj;
    if (file) {
      setSelectedImage(file);
    }
  };

//   GROQ
//   const extractFilesFromResponse = (responseText) => {
//     const filePattern = /```(jsx|javascript|bash|json|css)?\n(?:\/\/\s*)?(?:src\/)?([\w\/.-]+)\n([\s\S]+?)```/g;
//     let match;
//     const files = {};
  
//     while ((match = filePattern.exec(responseText)) !== null) {
//       const filePath = `/${match[2].trim()}`; // Correct filename extraction
//       const fileContent = match[3].trim(); // Extract content
  
//       if (!filePath.endsWith(".js") && !filePath.endsWith(".json")) {
//         // Skip incorrectly extracted filenames like "import React"
//         continue;
//       }
  
//       files[filePath] = { code: fileContent, active: false };
//     }
  
//     console.log("Extracted Files:", files);
  
//     // Ensure /App.js is active
//     if (files["/App.js"]) {
//       files["/App.js"].active = true;
//     }
  
//     return files;
//   };

//GEMINI
// const extractFilesFromResponse = (responseText) => {
//     const filePattern = /```(jsx|javascript|json|css|bash)?\n(?:\/\/\s*)?(src\/[\w\/.-]+)?\n([\s\S]+?)```/g;
//     let match;
//     const files = {};

//     while ((match = filePattern.exec(responseText)) !== null) {
//         let fileType = match[1] || "";
//         let filePath = match[2] ? `/${match[2].trim()}` : "";
//         let fileContent = match[3].trim();

//         if (!filePath) {
//             if (fileType === "jsx" || fileType === "javascript") {
//                 filePath = "/App.js";
//             } else if (fileType === "json") {
//                 filePath = "/data.json";
//             } else if (fileType === "css") {
//                 filePath = "/styles.css";
//             } else if (fileType === "bash") {
//                 filePath = "/install.sh";
//             } else {
//                 continue;
//             }
//         }

//         files[filePath] = { code: fileContent, active: false };
//     }

//     if (files["/App.js"]) {
//         files["/App.js"].active = true;
//     }

//     console.log("Extracted Files:", files);
//     return files;
// };

// *****************************MAIN OLD_______________**********************
// const extractFilesFromResponse = (responseText) => {
//   const filePattern = /```(jsx|javascript|json|css|bash)?\n([\s\S]*?)```/g;
//   let match;
//   const files = {};

//   while ((match = filePattern.exec(responseText)) !== null) {
//       let fileType = match[1] || ""; // Extracted file type (jsx, json, etc.)
//       let fileContent = match[2].trim(); // Extracted file content

//       console.log("Match Found:");
//       console.log("File Type:", fileType);
//       console.log("File Content:", fileContent);

//       let filePath = ""; // Determine file path based on type

//       if (fileType === "jsx" || fileType === "javascript") {
//           filePath = "/App.js";
//       } else if (fileType === "json") {
//           filePath = "/data.json";
//       } else if (fileType === "css") {
//           filePath = "/styles.css";
//       } else if (fileType === "bash") {
//           filePath = "/install.sh";
//       } else {
//           console.warn("Skipping unknown file type:", fileType);
//           continue; // Ignore unrecognized blocks
//       }

//       files[filePath] = { code: fileContent, active: false };
//   }

//   // Make the first extracted file active
//   if (Object.keys(files).length > 0) {
//       files[Object.keys(files)[0]].active = true;
//   }

//   console.log("Extracted Files:", files);
//   return files;
// };

// const extractFilesFromResponse = (responseText) => {
//   const filePattern = /```(jsx|javascript|json|css|bash)?\n([\s\S]*?)```/g;
//   let match;
//   const files = {};
//   let fileIndex = 1; // To handle multiple files of the same type

//   while ((match = filePattern.exec(responseText)) !== null) {
//       console.log('checking for file')
//       let fileType = match[1] || ""; // Extracted file type (jsx, json, etc.)
//       let fileContent = match[2].trim(); // Extracted file content

//       // console.log("Match Found:");
//       // console.log("File Type:", fileType);
//       // console.log("File Content:", fileContent);

//       // Extract filename from code comments if available
//       let filePath = `/file${fileIndex}.${fileType || "txt"}`; // Default generic name

//       const filenameMatch = fileContent.match(/\/\/\s*File:\s*(\S+)/);
//       console.log(filenameMatch,'filenameMatch')
//       if (filenameMatch) {
//           filePath = `/${filenameMatch[1]}`;
//       } else {
//           // Assign filenames based on type if no explicit filename is found
//           if (fileType === "jsx" || fileType === "javascript") {
//               // filePath = `/Component${fileIndex}.js`;
//               filePath = "/App.js";
//           } else if (fileType === "json") {
//               filePath = `/data${fileIndex}.json`;
//           } else if (fileType === "css") {
//               filePath = `/styles${fileIndex}.css`;
//           } else if (fileType === "bash") {
//               filePath = `/install${fileIndex}.sh`;
//           }
//       }

//       // Ensure unique file names for duplicates
//       while (files[filePath]) {
//           fileIndex++;
//           filePath = filePath.replace(/\d+/, fileIndex);
//       }

//       files[filePath] = { code: fileContent, active: false };
//       fileIndex++;
//   }

//   // Make the first extracted file active
//   if (Object.keys(files).length > 0) {
//       files[Object.keys(files)[0]].active = true;
//   }

//   console.log("Extracted Files:", files);
//   return files;
// };

  // ***************************LATEST*********************
// const extractFilesFromResponse = (responseText) => {
//   const filePattern = /```(js|jsx|javascript|json|css|bash)?\n([\s\S]*?)```/g;
//   let match;
//   const files = {};
//   let fileIndex = 1;

//   while ((match = filePattern.exec(responseText)) !== null) {
//       console.log('Checking for file');
//       let fileType = match[1] || "";
//       let fileContent = match[2].trim();

//       // Extract filename from comments (supports both // and /* */ styles)
//       const filenameMatch = fileContent.match(/\/\/\s*(?:File:|src)[:\s]*(\S+)/) || 
//                             fileContent.match(/\/\*\s*(?:File:|src)[:\s]*(\S+)\s*\*\//);
//       console.log(filenameMatch, 'filenameMatch');

//       let filePath = filenameMatch ? filenameMatch[1] : `file${fileIndex}.${fileType || "txt"}`;

//       // Ensure unique file names for duplicates
//       let originalFilePath = filePath;
//       let count = 1;
//       while (files[filePath]) {
//           const extIndex = originalFilePath.lastIndexOf(".");
//           filePath = extIndex !== -1 
//               ? `${originalFilePath.slice(0, extIndex)}_${count}${originalFilePath.slice(extIndex)}`
//               : `${originalFilePath}_${count}`;
//           count++;
//       }

//       files[filePath] = { code: fileContent, active: false };
//       fileIndex++;
//   }

//   // Make the first extracted file active
//   if (files["/src/App.js"]) {
//     files["/src/App.js"].active = true;
//   }
  

//   console.log("Extracted Files:", files);
//   return files;
// };



const extractFilesFromResponse = (responseText) => {
  const filePattern = /```(js|jsx|javascript|json|css|bash)?\n([\s\S]*?)```/g;
  let match;
  const files = {};
  let fileIndex = 1;

  while ((match = filePattern.exec(responseText)) !== null) {
      let fileType = match[1] || "js"; // Default to JS
      let fileContent = match[2].trim();

      // Extract filename from comments (supports both // and /* */ styles)
      const filenameMatch = fileContent.match(/\/\/\s*(?:File:|src)[:\s]*(\S+)/) ||
          fileContent.match(/\/\*\s*(?:File:|src)[:\s]*(\S+)\s*\*\//);

      let filePath = filenameMatch
          ? `${filenameMatch[1]}`
          : `/src/file${fileIndex}.${fileType}`;

      // If no filename in comment, use the code block language identifier.
      if (!filenameMatch) {
          if (fileType === "js" || fileType === "jsx" || fileType === "javascript") {
              filePath = `/src/file${fileIndex}.js`;
          } else if (fileType === "css") {
              filePath = `/src/file${fileIndex}.css`;
          } else if (fileType === "json") {
              filePath = `/src/file${fileIndex}.json`;
          } else if (fileType === 'bash') {
              filePath = `/src/file${fileIndex}.sh`;
          }
      }

      // Ensure unique filenames in case of duplicates
      let originalFilePath = filePath;
      let count = 1;
      while (files[filePath]) {
          const extIndex = originalFilePath.lastIndexOf(".");
          filePath =
              extIndex !== -1
                  ? `${originalFilePath.slice(0, extIndex)}_${count}${originalFilePath.slice(extIndex)}`
                  : `${originalFilePath}_${count}`;
          count++;
      }

      files[filePath] = { code: fileContent, active: false };
      fileIndex++;
  }

  // Ensure "/src/App.js" is set as the active file for execution
  if (files["/src/App.js"]) {
      files["/src/App.js"].active = true;
  }

  console.log("Extracted Files:", files);
  return files;
};


// const extractFilesFromResponse = (responseText) => {
//   const filePattern = /```(jsx|javascript|json|css|bash)?\n([\s\S]*?)```/g;
//   let match;
//   const files = {};

//   while ((match = filePattern.exec(responseText)) !== null) {
//       let fileType = match[1] || ""; // Extracted file type (jsx, json, etc.)
//       let fileContent = match[2].trim(); // Extracted file content

//       console.log("Match Found:");
//       console.log("File Type:", fileType);
//       console.log("File Content:", fileContent);

//       let filePath = ""; // Determine file path based on type

//       if (fileType === "jsx" || fileType === "javascript") {
//           filePath = "/App.jsx";
//       } else if (fileType === "json") {
//           filePath = "/data.json";
//       } else if (fileType === "css") {
//           filePath = "/styles.css";
//       } else if (fileType === "bash") {
//           filePath = "/install.sh";
//       } else {
//           console.warn("Skipping unknown file type:", fileType);
//           continue; // Ignore unrecognized blocks
//       }

//       files[filePath] = { code: fileContent, active: false };
//   }

//   // Make the first extracted file active
//   if (Object.keys(files).length > 0) {
//       files[Object.keys(files)[0]].active = true;
//   }

//   console.log("Extracted Files:", files);
//   return files;
// };
  
  const sendMessage = async (errorFlag=false) => {
    console.log('errorFlag', errorFlag)
    if (!input.trim() && !selectedImage) {
      message.warning("Please enter a query or select an image.");
      return;
    }
    let userMessage = { role: "user", content: input, image: selectedImage ? URL.createObjectURL(selectedImage) : null };

    if(errorFlag) {
      message.warning("It seems there is some issue in the code generated, retriggering the model.");
      userMessage.content = `The code snippet generated is not working correctly.  
Here’s the code:  

```[codeFiles]```

And here is the error message I’m getting:  

```[errorMessage]```


Please:  
1. Identify the issue causing the error.  
2. Fix the code while preserving its intended functionality.  
3. Explain what was wrong and how you fixed it.  
4. Optimize the code if necessary.  
`;
    }


      
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const formData = new FormData();
    formData.append("query", input);
    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    try {
      const response = await fetch("http://127.0.0.1:8081/query" /*"https://codegen-demo-be.azurewebsites.net/query"*/, {
        method: "POST",
        body: formData,
      });
      console.log('response', response)
      const data = await response.json();
      if (data.response) {
        setMessages((prev) => [...prev, { role: "ai", content: data.response }]);

        // Ensure Sandpack updates with new code files
        if (data.response) {
            setCodeFiles(extractFilesFromResponse(data.response));
            setSandpackKey((prev) => prev + 1);

        }
      } else {
        message.error("No response received");
      }
    } catch (error) {
      message.error("Failed to fetch response");
      console.error(error);
    }

    setLoading(false);
    setSelectedImage(null);
  };

  const renderMessageContent = (content) => {
    if (!content) return null;

    const elements = [];
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
        const [fullMatch, lang = "javascript", extractedCode] = match;

        // Add plain text before code blocks
        if (match.index > lastIndex) {
            elements.push(
                <ReactMarkdown key={`text-${lastIndex}`} remarkPlugins={[remarkGfm]}>
                    {content.substring(lastIndex, match.index)}
                </ReactMarkdown>
            );
        }

        // Add extracted code block
        elements.push(
            <div key={match.index} style={{ position: "relative", margin: "10px 0" }}>
                <Tooltip title="Copy">
                    <Button
                        icon={<CopyOutlined />}
                        size="small"
                        style={{ position: "absolute", right: 5, top: 5, zIndex: 10 }}
                        onClick={() => navigator.clipboard.writeText(extractedCode)}
                    />
                </Tooltip>
                <AceEditor
                    mode={lang || "javascript"}
                    theme="monokai"
                    value={extractedCode}
                    readOnly
                    fontSize={14}
                    width="100%"
                    wrapEnabled={true}
                    setOptions={{ useWorker: false, showPrintMargin: false }}
                />
            </div>
        );

        lastIndex = match.index + fullMatch.length;
    }

    // Add remaining text after the last code block
    if (lastIndex < content.length) {
        elements.push(
            <ReactMarkdown key={`text-${lastIndex}`} remarkPlugins={[remarkGfm]}>
                {content.substring(lastIndex)}
            </ReactMarkdown>
        );
    }

    return elements;
};


  // const renderMessageContent = (content) => {
  //   if (!content) return null;

  //   const elements = [];
  //   const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  //   let lastIndex = 0;
  //   let match;

  //   while ((match = codeBlockRegex.exec(content)) !== null) {
  //     const [fullMatch, lang = "javascript", extractedCode] = match;
  //     if (match.index > lastIndex) {
  //       elements.push(
  //         <ReactMarkdown key={`text-${lastIndex}`}>{content.substring(lastIndex, match.index)}</ReactMarkdown>
  //       );
  //     }

  //     elements.push(
  //       <div key={match.index} style={{ position: "relative", margin: "10px 0" }}>
  //         <Tooltip title="Copy">
  //           <Button
  //             icon={<CopyOutlined />}
  //             size="small"
  //             style={{ position: "absolute", right: 5, top: 5, zIndex: 10 }}
  //             onClick={() => navigator.clipboard.writeText(extractedCode)}
  //           />
  //         </Tooltip>
  //         <AceEditor
  //           mode={lang}
  //           theme="monokai"
  //           value={extractedCode}
  //           readOnly
  //           fontSize={14}
  //           width="100%"
  //           wrapEnabled={true}
  //           setOptions={{ useWorker: false, showPrintMargin: false }}
  //         />
  //       </div>
  //     );

  //     lastIndex = match.index + fullMatch.length;
  //   }

  //   if (lastIndex < content.length) {
  //     elements.push(<ReactMarkdown key={`text-${lastIndex}`}>{content.substring(lastIndex)}</ReactMarkdown>);
  //   }

  //   return elements;
  // };

  return (
    <Flex gap={4} justify="space-between" style={{ marginTop: 20 }}>
      {!isExpanded && (

      <Card 
      // style={{ width: 700, padding: "20px" }}
      title="Code Generator : AI for UI"
      style={{ 
        // width: 300, 
        minHeight: 450, 
        padding:20,
        display: "flex", 
        flexDirection: "column", 
        width: codeFiles ? '60%' : '100%', 
      }}

      actions={[  <Input value={input} onChange={(e) => setInput(e.target.value)} onPressEnter={() => sendMessage(false)} placeholder="Type your message..." addonAfter={
        <Flex gap={9}>
        <Upload beforeUpload={() => false} onChange={handleImageChange} showUploadList={false} accept="image/*">
        <UploadOutlined style={{cursor: 'pointer'}}/>
      </Upload>
       <SendOutlined onClick={() => sendMessage(false)} />
       </Flex>
       } />
        ]}
      >
        <div style={{ maxHeight: 500, overflowY: "auto", marginBottom: 10, padding: "10px" }}>
          {messages.length === 0 &&  

       <Flex justify="center">    <Text align="center" style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
      <Typewriter
        words={["🚀 AI to UI: Code Smarter, Build Faster!"]}
        loop={false}
        cursor
        cursorStyle="_"
        typeSpeed={60}
        deleteSpeed={40}
        delaySpeed={1500}
      />
    </Text>   </Flex>    }
          {messages.map((msg, index) => (
            <Flex key={index} align="start" style={{ marginBottom: 10, justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
              {msg.role === "ai" && <Avatar icon={<RobotOutlined />} style={{ marginRight: 10 }} />}
              <Card size="small" style={{ background: msg.role === "user" ? "rgb(237 245 248)" : "#f6f6f6", maxWidth: "70%", width: 450 }}>
                <Text strong>{msg.role === "user" ? "You:" : "AI:"}</Text>
                {msg.role === "ai" ? renderMessageContent(msg.content) : <ReactMarkdown>{msg.content}</ReactMarkdown>}
              </Card>
              {msg.role === "user" && <Avatar icon={<UserOutlined />} style={{ marginLeft: 10, background: "#f58220" }} />}
            </Flex>
          ))}
          {loading && <Spin />}
          <div ref={messagesEndRef} />
        </div>

        <Flex justify="space-between" align="center" style={{ marginBottom: 10 }}>
         

          {selectedImage && (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img src={URL.createObjectURL(selectedImage)} alt="Selected" style={{ width: 50, height: 50, borderRadius: 5 }} />
              <Button type="link" danger onClick={() => setSelectedImage(null)}>Remove</Button>
            </div>
          )}
        </Flex>

      
      </Card>
)}
      {/* {codeFiles && */}

     
        <Card title={  
          <Flex justify="space-between" align="center">
            <Text>Code Execution Sandbox</Text>
            <Tooltip title={isExpanded ? "Collapse" : "Expand"}>
              <Button icon={<ExpandOutlined />} onClick={toggleSandbox} />
            </Tooltip>
          </Flex>} style={{ width: isExpanded ? '100%' : '40%', padding: "20px", transition: "width 0.3s ease" }}>
          
          <CustomSandpack codeFiles={codeFiles} sandpackKey={sandpackKey} sendMessage={sendMessage} setErrorMessage={setErrorMessage} />
          {/* {errorMessage && <div style={{ color: "red", marginTop: "10px" , overflow: 'auto'}}>⚠️ <strong>Runtime Error:</strong> {errorMessage}</div>} */}
        </Card>

      

     

    </Flex>
  );
};

export default ChatApp;
