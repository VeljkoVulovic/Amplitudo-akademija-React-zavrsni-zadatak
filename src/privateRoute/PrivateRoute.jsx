import React from "react";
import { Route } from "react-router";
import AuthLayout from "../components/layout/AuthLayout";
import BasicLayout from "../components/layout/BasicLayout";
import Forbidden from "../pages/forbidden/Forbidden";

const PrivateRoute = ({ component: Component, isPrivate, ...rest }) => {
  const Layout = isPrivate ? AuthLayout : BasicLayout;

  return (
    <Route
      {...rest}
      component={() => {
        return isPrivate ? (
          localStorage.getItem("jwt-token") ? (
            <Layout>
              <Component {...rest} />
            </Layout>
          ) : (
            <Forbidden />
          )
        ) : (
          <Layout>
            <Component {...rest} />
          </Layout>
        );
      }}
    />
  );
};

export default PrivateRoute;
