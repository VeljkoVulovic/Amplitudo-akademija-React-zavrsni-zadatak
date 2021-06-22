import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  TeamOutlined,
  SolutionOutlined,
  CarOutlined,
  UserOutlined,
  LogoutOutlined,
  ReadOutlined,
  ControlOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { Content } from "antd/lib/layout/layout";
import { logout } from "../../services/account";
import { useMutation } from "react-query";
import CarForm from "../forms/CarForm";
import ClientForm from "../forms/ClientForm";
import { useModal } from "../../contexts/ModalContext";
import PropTypes from "prop-types";

const { Header, Sider } = Layout;
const { SubMenu } = Menu;

const Navbar = ({ content }) => {
  const [collapsed, setCollapsed] = useState(true);
  const history = useHistory();
  const { open } = useModal();

  const logoutMutation = useMutation(() => logout(), {
    onSuccess: (response) => {
      localStorage.clear();
      history.push("/login");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const logoutClick = () => {
    logoutMutation.mutate("");
  };

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>
        <Menu mode="horizontal" theme={"dark"}>
          <Menu.Item
            key="logo"
            onClick={() => history.push("/home")}
            className="logo"
          >
            RENT A CAR
          </Menu.Item>
          <SubMenu key="options" icon={<ControlOutlined />} title="Options">
            <Menu.ItemGroup className="siderMenuGroup" title="-- Pages --">
              <Menu.Item
                key="clients"
                icon={<TeamOutlined />}
                title="Clients"
                onClick={() => history.push("/clients")}
              >
                Clients
              </Menu.Item>
              <Menu.Item
                key="cars"
                icon={<CarOutlined />}
                title="Cars"
                onClick={() => history.push("/cars")}
              >
                Cars
              </Menu.Item>
              <Menu.Item
                key="reservations"
                icon={<SolutionOutlined />}
                title="Reservations"
                onClick={() => history.push("/reservations")}
              >
                Reservations
              </Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup title="-- Add --">
              <Menu.Item
                key="option:1"
                icon={<TeamOutlined />}
                onClick={() =>
                  open({
                    title: `Add new car`,
                    content: <ClientForm />,
                  })
                }
              >
                Add new Client
              </Menu.Item>
              <Menu.Item
                key="option:2"
                icon={<CarOutlined />}
                onClick={() =>
                  open({
                    title: `Add new car`,
                    content: <CarForm />,
                  })
                }
              >
                Add new Car
              </Menu.Item>
              <Menu.Item disabled key="option:3" icon={<SolutionOutlined />}>
                Add new Reservation
              </Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup title="-- Choose language --">
              <Menu.Item disabled key="option:4" icon={<ReadOutlined />}>
                MNE
              </Menu.Item>
              <Menu.Item disabled key="option:5" icon={<ReadOutlined />}>
                ENG
              </Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
          <Menu.Item disabled key="user" icon={<UserOutlined />}>
            User:
          </Menu.Item>
          <Menu.Item
            key="logout"
            danger={true}
            icon={<LogoutOutlined />}
            onClick={() => {
              logoutClick();
            }}
          >
            Logout
          </Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}
          breakpoint="lg"
          onBreakpoint={onCollapse}
        >
          <Menu theme="dark" mode="inline">
            <Menu.Item
              key="2"
              icon={<TeamOutlined />}
              title="Clients"
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
        <Content>{content}</Content>
      </Layout>
    </Layout>
  );
};

export default Navbar;

Navbar.propTypes = {
  content: PropTypes.node,
};
