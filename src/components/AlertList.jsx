// src/components/GeneratedComponent.jsx
import React, { useState } from "react";
import { Card, Button, Typography, Space, Divider } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Text } = Typography;

const GeneratedComponent = () => {
  const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1617224492875-51e9869c09aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvbGQlMjBicmV3fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"); // Placeholder image URL

  return (
    <div style={{
      maxWidth: "400px",
      margin: "20px auto",
      backgroundColor: "#fff",
      borderRadius: "10px",
      overflow: "hidden",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
    }}>
      {/* Header */}
      <div style={{ padding: "16px", borderBottom: "1px solid #f0f0f0" }}>
        <Space align="center">
          <ArrowLeftOutlined />
          <Typography.Title level={5} style={{ margin: 0 }}>Alerts</Typography.Title>
        </Space>
      </div>

      {/* Image */}
      <img
        src={imageUrl}
        alt="Cold Brew"
        style={{ width: "100%", display: "block" }}
      />

      {/* Content */}
      <div style={{ padding: "16px" }}>
        <Typography.Title level={5}>High demand for cold drinks 🥤</Typography.Title>
        <Text>Increase price of Cold Brew Coffee from $3.50 to $3.95 for the next 6 hours?</Text>

        {/* Buttons */}
        <Space style={{ marginTop: "16px" }}>
          <Button style={{ borderColor: "#d9d9d9", color: "rgba(0, 0, 0, 0.85)" }}>Reject</Button>
          <Button type="primary" style={{
            background: "linear-gradient(to right, #9254de, #eb2f96)",
            borderColor: "#9254de"
          }}>Approve</Button>
        </Space>

        {/* Modify Link */}
        <div style={{ marginTop: "16px", textAlign: "center" }}>
          <a href="#">Modify</a>
        </div>

        {/* Pagination Dots */}
        <div style={{ marginTop: "16px", textAlign: "center" }}>
          <span style={{
            display: "inline-block",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: "#9254de",
            margin: "0 4px"
          }} />
          <span style={{
            display: "inline-block",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: "#d9d9d9",
            margin: "0 4px"
          }} />
          <span style={{
            display: "inline-block",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: "#d9d9d9",
            margin: "0 4px"
          }} />
        </div>
      </div>
    </div>
  );
};

export default GeneratedComponent;