import React from "react";
import { useHistory } from "react-router";
import { Result, Button } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const ErrorHandling = ({ error, errorMessage }) => {
  const history = useHistory();
  return (
    <div className="centerDiv">
      <Result
        status={error}
        title={"Error " + error}
        subTitle={errorMessage}
        extra={
          <div className="buttons">
            <Button
              icon={<HomeOutlined className="site-form-item-icon" />}
              type="primary"
              onClick={() => history.push("/login")}
            >
              Back Home
            </Button>
          </div>
        }
      />
    </div>
  );
};

export default ErrorHandling;

ErrorHandling.propTypes = {
  error: PropTypes.string,
  errorMessage: PropTypes.string,
};
