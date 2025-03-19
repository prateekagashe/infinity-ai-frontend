// App.js
import React from "react";
import { Layout } from "antd";
import Navbar from "./components/navbar";
import ChatApp from './components/chatApp';
// import ChatApp from './components/chatCompare';
// import ChatApp from './components/stackBlitz';
const { Content } = Layout;

const App = () => {
  return (
    <Layout>
      <Navbar />
      <Content style={{ padding: "20px" }}>

        <ChatApp/>
      </Content>
    </Layout>
  );
};

export default App;