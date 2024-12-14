import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { userContext } from "../../Pages/Context/User.Contetx";

export default function ProtectedRoute({ children }) {

  const {token} = useContext(userContext)
 
  if (token) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
