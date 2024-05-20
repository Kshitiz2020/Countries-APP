import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (user) return navigate("/countries");

  return <div>{children}</div>;
}
