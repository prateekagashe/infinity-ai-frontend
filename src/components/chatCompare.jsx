import React, { useState } from "react";
import { Upload, Button, Layout, Typography, message, Spin } from "antd";
import { UploadOutlined, CodeOutlined } from "@ant-design/icons";
import axios from "axios";

const { Header, Content } = Layout;
const { Title } = Typography;

const App = () => {
  const [file, setFile] = useState(null);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

//   const handleUpload = (info) => {
//     console.log("Uploaded file:", info);
//     if (info.file && info.file.originFileObj) {
//       setFile(info.file.originFileObj);
//     } else {
//       message.error("Failed to upload file");
//     }
//   };

  const handleUpload = (info) => {
    const file = info.fileList[0]?.originFileObj;
    if (file) {
        setFile(file);
    }
  };

  const handleGenerateCode = async () => {
    console.log('file' , file)
    if (!file) {
    //   message.error("Please upload an image first!");
    console.log('error')
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    
    try {
      const response = await axios.post("http://localhost:8002/generate-code", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setCode(response.data.code);
    } catch (error) {
        console.log('error', error)
      message.error("Error generating code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh", padding: "20px" }}>
      <Header style={{ background: "#1890ff", textAlign: "center", padding: "10px" }}>
        <Title style={{ color: "#fff" }}>AI-Powered UI to Code Generator</Title>
      </Header>
      <Content style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
        <Upload beforeUpload={() => false} onChange={handleUpload} showUploadList={false}>
          <Button icon={<UploadOutlined />}>Upload Design Image</Button>
        </Upload>
        <Button type="primary" icon={<CodeOutlined />} onClick={handleGenerateCode} style={{ marginTop: "20px" }}>
          Generate Code
        </Button>
        {loading && <Spin size="large" style={{ marginTop: "20px" }} />}
        {code && (
          <pre style={{ marginTop: "20px", padding: "10px", background: "#f5f5f5", width: "80%", overflow: "auto" }}>
            {code}
          </pre>
        )}
      </Content>
    </Layout>
  );
};

export default App;


