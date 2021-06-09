import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form, Input, Button } from "antd";
import { MailOutlined, LockOutlined, LoginOutlined } from "@ant-design/icons";
import "./Login.css";
import { login } from "../../services/account";

const Login = () => {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    login(data)
      .then(function (response) {
        localStorage.setItem("jwt-token", response?.data["access_token"]);
        history.push("/home");
      })
      .catch(function (error) {
        console.log(error?.response?.data);
        setErrorMessage(error?.response?.data?.error);
      });
  };

  const onError = (errors) => {
    console.log(errors);
  };

  return (
    <div className="loginDiv centerDiv styleDiv">
      <div className="leftLoginDiv styleDiv">
        <h1>Welcome!</h1>
        <Form onSubmit={handleSubmit(onError)} style={{ marginTop: "25px" }}>
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            type="email"
            autoComplete="off"
            placeholder="Email"
            {...register("email", {
              minLength: {
                value: 4,
                message: "Minimum length: 4 characters.",
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter a valid email",
              },
              required: {
                value: true,
                message: "Please input email!",
              },
            })}
            rules={[{ required: true, message: "Please input your email!" }]}
          />
          {errors?.email?.message !== "" ? (
            <span className="errorSpan">{errors?.email?.message}</span>
          ) : (
            <span className="errorSpan"></span>
          )}
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            {...register("password", {
              minLength: {
                value: 4,
                message: "Minimum length: 4 characters.",
              },
              maxLength: {
                value: 12,
                message: "Maximum length: 12 characters.",
              },
              pattern: {
                value: /^[a-zA-Z0-9!#%]+$/g,
                message: "Please enter a valid password",
              },
              required: {
                value: true,
                message: "Please input password!",
              },
            })}
          />
          {errors?.password?.message !== "" ? (
            <span className="errorSpan">{errors?.password?.message}</span>
          ) : (
            <span className="errorSpan"></span>
          )}
          <Button
            style={{ width: "150px", marginTop: "15px" }}
            shape="round"
            icon={<LoginOutlined className="site-form-item-icon" />}
            type="primary"
            onClick={handleSubmit(onSubmit)}
          >
            Log in
          </Button>
        </Form>
        {errorMessage !== "" ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : null}
      </div>

      <div className="rightLoginDiv"></div>
    </div>
  );
};

export default Login;
