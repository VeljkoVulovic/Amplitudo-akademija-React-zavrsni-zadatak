import React, { useState } from "react";
import { Layout, Menu, Image } from "antd";
import {
  TeamOutlined,
  SolutionOutlined,
  CarOutlined,
  PlusSquareOutlined,
  UserOutlined,
  LogoutOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import background from "../../images/full_background.png";
import logo from "../../images/sixt_car_rental.jpg";
import { useHistory } from "react-router-dom";
import { Content } from "antd/lib/layout/layout";

const { Header, Sider } = Layout;
const { SubMenu } = Menu;

const Navbar = ({ content }) => {
  const [collapsed, setCollapsed] = useState(true);
  const history = useHistory();

  const onCollapse = (collapsed) => {
    setCollapsed((prevState) => !prevState);
  };

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "black" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={() => onCollapse()}>
        <Menu theme="dark" mode="inline">
          <Menu.Item
            style={{ backgroundColor: "#000f1d" }}
            key="1"
            icon={
              <Image
                preview={false}
                style={{
                  width: "60px",
                  height: "30px",
                  marginTop: "12px",
                  marginLeft: "-18px",
                  marginRight: "10px",
                }}
                src={logo}
              />
            }
            onClick={() => history.push("/home")}
          ></Menu.Item>
          <Menu.Item
            key="2"
            icon={<TeamOutlined />}
            title="Clients"
            style={{ marginTop: "20px" }}
            onClick={() => history.push("/clients")}
          >
            Clients
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={<CarOutlined />}
            title="Cars"
            onClick={() => history.push("/cars")}
          >
            Cars
          </Menu.Item>
          <Menu.Item
            key="4"
            icon={<SolutionOutlined />}
            title="Reservations"
            onClick={() => history.push("/reservations")}
          >
            Reservations
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ backgroundImage: `url(${background})` }}>
        <Header style={{ paddingRight: "0px", marginRight: "5px" }}>
          <Menu
            mode="horizontal"
            theme={"dark"}
            style={{ float: "right", margin: "0" }}
          >
            <SubMenu key="options" icon={<PlusSquareOutlined />} title="Add">
              <Menu.Item key="option:1" icon={<TeamOutlined />}>
                Add new Client
              </Menu.Item>
              <Menu.Item key="option:2" icon={<CarOutlined />}>
                Add new Car
              </Menu.Item>
              <Menu.Item key="option:3" icon={<SolutionOutlined />}>
                Add new Reservation
              </Menu.Item>
              <Menu.ItemGroup title="- Choose language -">
                <Menu.Item key="option:4" icon={<ReadOutlined />}>
                  MNE
                </Menu.Item>
                <Menu.Item key="option:5" icon={<ReadOutlined />}>
                  ENG
                </Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>
            <Menu.Item key="user" icon={<UserOutlined />}>
              User: Name
            </Menu.Item>
            <Menu.Item
              key="logout"
              danger={true}
              icon={<LogoutOutlined />}
              onClick={() => {
                localStorage.clear();
                history.push("/login");
              }}
            >
              Logout
            </Menu.Item>
          </Menu>
        </Header>
        <Content>{content}</Content>
      </Layout>
    </Layout>
  );
};

export default Navbar;
