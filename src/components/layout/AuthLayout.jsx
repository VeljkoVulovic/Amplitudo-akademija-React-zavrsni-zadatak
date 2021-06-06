import React from "react";
import Navbar from "../navbar/Navbar";

const AuthLayout = ({ children }) => {
  return (
    <div>
      <Navbar content={children} />
    </div>
  );
};

export default AuthLayout;
