import React from "react";
import { useHistory } from "react-router";
import { Result, Button } from "antd";
import { HomeOutlined } from "@ant-design/icons";

const ErrorHandling = ({ error, errorMessage }) => {
  const history = useHistory();
  return (
    <div className="centerDiv">
      <Result
        status={error}
        title={"Error " + error}
        subTitle={errorMessage}
        extra={
          <Button
            style={{ width: "150px", marginTop: "15px" }}
            icon={<HomeOutlined className="site-form-item-icon" />}
            type="primary"
            onClick={() => history.push("/login")}
          >
            Back Home
          </Button>
        }
      />
    </div>
  );
};

export default ErrorHandling;
