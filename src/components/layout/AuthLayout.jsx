import React from "react";
import Navbar from "../navbar/Navbar";

const AuthLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default AuthLayout;