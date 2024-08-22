/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import LoadingSpinner from "../components/LoadingSpinner";

const PrivateRouter = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
        <LoadingSpinner />
    )
  }

  if (user) {
    return <>{children}</>;
  }

  return (
    <Navigate
      to="/signup"
      state={{ from: location }}
      replace
    />
  );
};

export default PrivateRouter;
