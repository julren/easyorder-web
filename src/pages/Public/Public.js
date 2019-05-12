import React from "react";
import { BrowserRouter } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";

const Public = props => {
  return (
    <BrowserRouter>
      <PublicRoutes />
    </BrowserRouter>
  );
};

export default Public;
