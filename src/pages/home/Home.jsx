import React from "react";
import { Result } from "antd";
import { SmileOutlined } from "@ant-design/icons";

const Home = () => {
  return (
    <div>
      <div className="styleDiv centerDiv">
        <Result icon={<SmileOutlined />} title="Welcome aboard!"></Result>
      </div>
    </div>
  );
};

export default Home;
