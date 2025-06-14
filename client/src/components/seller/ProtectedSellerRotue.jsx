import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const ProtectedSellerRoute = () => {
  const { isSeller } = useAppContext();

  if (!isSeller) {
    return <Navigate to="/seller" replace />;
  }

  return <Outlet />;
};

export default ProtectedSellerRoute;
