import React from "react";
import { useHistory } from "react-router";
import { Result, Button } from "antd";
import { LoginOutlined } from "@ant-design/icons";

const Forbidden = () => {
  const history = useHistory();
  return (
    <div className="centerDiv styleDiv">
      <Result
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Button
            style={{ width: "150px", marginTop: "15px" }}
            shape="round"
            icon={<LoginOutlined className="site-form-item-icon" />}
            type="primary"
            onClick={() => history.push("/login")}
          >
            Back to login
          </Button>
        }
      />
    </div>
  );
};

export default Forbidden;
