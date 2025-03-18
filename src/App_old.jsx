// import React, { useState, useRef, useEffect } from "react";
// import { Input, Button, Card, Typography, Spin, message, Flex, Avatar, Tooltip, Upload } from "antd";
// import ReactMarkdown from "react-markdown";
// import { CopyOutlined, UserOutlined, RobotOutlined, SendOutlined, UploadOutlined } from "@ant-design/icons";

// import AceEditor from "react-ace";
// import "ace-builds/src-noconflict/mode-javascript";
// import "ace-builds/src-noconflict/mode-python";
// import "ace-builds/src-noconflict/mode-css";
// import "ace-builds/src-noconflict/mode-html";
// import "ace-builds/src-noconflict/mode-json";
// import "ace-builds/src-noconflict/theme-monokai";

// const { Text } = Typography;

// const ChatApp = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleImageChange = (info) => {
//     const file = info.fileList[0]?.originFileObj;
//     if (file) {
//       setSelectedImage(file);
//     }
//   };

//   const sendMessage = async () => {
//     if (!input.trim() && !selectedImage) {
//       message.warning("Please enter a query or select an image.");
//       return;
//     }

//     const userMessage = { role: "user", content: input, image: selectedImage ? URL.createObjectURL(selectedImage) : null };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");
//     setLoading(true);

//     const formData = new FormData();
//     formData.append("query", input);
//     if (selectedImage) {
//       formData.append("image", selectedImage);
//     }

//     try {
//       const response = await fetch("http://127.0.0.1:8000/query", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();
//       if (data.response) {
//         setMessages((prev) => [...prev, { role: "ai", content: data.response }]);
//       } else {
//         message.error("No response received");
//       }
//     } catch (error) {
//       message.error("Failed to fetch response");
//       console.error(error);
//     }

//     setLoading(false);
//     setSelectedImage(null);
//   };

//   const renderMessageContent = (content) => {
//     if (!content) return null;

//     const elements = [];
//     const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
//     let lastIndex = 0;
//     let match;

//     while ((match = codeBlockRegex.exec(content)) !== null) {
//       const [fullMatch, lang = "javascript", code] = match;
//       if (match.index > lastIndex) {
//         elements.push(
//           <ReactMarkdown key={`text-${lastIndex}`}>{content.substring(lastIndex, match.index)}</ReactMarkdown>
//         );
//       }
//       elements.push(
//         <div key={match.index} style={{ position: "relative", margin: "10px 0" }}>
//           <Tooltip title="Copy">
//             <Button
//               icon={<CopyOutlined />}
//               size="small"
//               style={{ position: "absolute", right: 5, top: 5, zIndex: 10 }}
//               onClick={() => navigator.clipboard.writeText(code)}
//             />
//           </Tooltip>
//           <AceEditor
//             mode={lang}
//             theme="monokai"
//             value={code}
//             readOnly
//             fontSize={14}
//             width="100%"
//             wrapEnabled={true}
//             setOptions={{ useWorker: false, showPrintMargin: false }}
//           />
//         </div>
//       );
//       lastIndex = match.index + fullMatch.length;
//     }

//     if (lastIndex < content.length) {
//       elements.push(<ReactMarkdown key={`text-${lastIndex}`}>{content.substring(lastIndex)}</ReactMarkdown>);
//     }

//     return elements;
//   };

//   return (
//     <Flex vertical justify="center" style={{ marginTop: 20 }}>
//       <Card style={{ width: 900, padding: "20px" }}>
//         <div style={{ maxHeight: 500, overflowY: "auto", marginBottom: 10, padding: "10px" }}>
//           {messages.map((msg, index) => (
//             <Flex key={index} align="start" style={{ marginBottom: 10, justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
//               {msg.role === "ai" && <Avatar icon={<RobotOutlined />} style={{ marginRight: 10 }} />}
//               <Card size="small" style={{ background: msg.role === "user" ? "rgb(237 245 248)" : "#f6f6f6", maxWidth: "70%" }}>
//                 <Text strong>{msg.role === "user" ? "You:" : "AI:"}</Text>
//                 {msg.image && <img src={msg.image} alt="Uploaded" style={{ width: 100, height: 100, borderRadius: 5, marginTop: 5 }} />}
//                 {msg.role === "ai" ? renderMessageContent(msg.content) : <ReactMarkdown>{msg.content}</ReactMarkdown>}
//               </Card>
//               {msg.role === "user" && <Avatar icon={<UserOutlined />} style={{ marginLeft: 10, background: '#f58220' }} />}
//             </Flex>
//           ))}
//           {loading && <Spin />}
//           <div ref={messagesEndRef} />
//         </div>

//         <Flex justify="space-between" align="center" style={{ marginBottom: 10 }}>
//           <Upload beforeUpload={() => false} onChange={handleImageChange} showUploadList={false} accept="image/*">
//             <Button icon={<UploadOutlined />}>Upload Image</Button>
//           </Upload>

//           {selectedImage && (
//             <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//               <img src={URL.createObjectURL(selectedImage)} alt="Selected" style={{ width: 50, height: 50, borderRadius: 5 }} />
//               <Button type="link" danger onClick={() => setSelectedImage(null)}>Remove</Button>
//             </div>
//           )}
//         </Flex>

//         <Input value={input} onChange={(e) => setInput(e.target.value)} onPressEnter={sendMessage} placeholder="Type your message..." addonAfter={<SendOutlined onClick={sendMessage} />} />
//       </Card>
//     </Flex>
//   );
// };

// export default ChatApp;
