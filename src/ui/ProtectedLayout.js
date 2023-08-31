
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { getToken } from "../Services/apiLogin";

export const ProtectedLayout = ({ children }) => {
    const navigate = useNavigate();
    useEffect(() => {
      if (!getToken()) {
        navigate("/login");
      }else {
        navigate("/conversation", { replace: true }); // Redirect to conversation page if authenticated
      }
    }, []);
  
    return (
      <>
    {children}
      </>
    );
  };
