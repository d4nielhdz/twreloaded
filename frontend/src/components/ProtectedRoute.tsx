import React from "react";
import { Navigate } from "react-router-dom";
import useFirebaseUser from "../hooks/useFirebaseUser";

type ProtectedRouteProps = {
  children: JSX.Element;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useFirebaseUser();
  if (!user.user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
