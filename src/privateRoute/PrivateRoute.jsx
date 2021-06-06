import React from "react";
import { Route } from "react-router";
import AuthLayout from "../components/layout/AuthLayout";
import BasicLayout from "../components/layout/BasicLayout";
import ErrorHandling from "../pages/errorHandling/ErrorHandling";

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
            <ErrorHandling
              error={"403"}
              errorMessage={
                "Sorry, you are not authorized to access this page."
              }
            />
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
