import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from ".";

interface Props {
  children:  JSX.Element;
}

export default function RequireAuth({ children }: Props) {
  const auth = useContext(AuthContext);
  let location = useLocation();

  if (!auth.loading && !auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}