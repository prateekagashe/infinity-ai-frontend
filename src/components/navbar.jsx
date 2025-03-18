import React from "react";
import { Layout, Flex, Typography } from "antd";
import logo from "../assets/Logos.svg";

const { Header } = Layout;
const { Text } = Typography

const Navbar = () => {
  return (
    <Header style={{ display: "flex", alignItems: "center", background: "linear-gradient(to right, black, lightgrey)", padding: "0 20px", boxShadow: "0 2px 8px #f0f1f2" }}>
        <Flex justify="flex start" gap = {10} align="center">
            <img src={logo} alt="Logo" style={{ height: '2rem' }} />
            <Text style={{color: "white", fontSize:'0.6rem'}}>|</Text>
            <Text style={{color: "white", fontSize:'1.2rem'}}>Digital Engineering</Text>
        </Flex>
    </Header>
  );
};

export default Navbar;

