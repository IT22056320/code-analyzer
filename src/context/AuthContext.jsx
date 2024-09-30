import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ToastContext from "./ToastContext";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const { toast } = useContext(ToastContext);  
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  // Check if the user is logged in
  const checkUserLoggedIn = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/me`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
      if (!result.error) {
        setUser(result);
        // Redirect if user navigates to login or register page
        if (location.pathname === "/login" || location.pathname === "/register") {
          navigate("/", { replace: true });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Login request
  const loginUser = async (credentials) => {
    try {
      const res = await fetch('http://localhost:4000/api/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...credentials }),
      });
      const result = await res.json();
      if (!result.error) {
        localStorage.setItem("token", result.token);
        setUser(result.user);
        toast.success(`Logged in as ${result.user.name}`);
        navigate("/project-management", { replace: true });
      } else {
        toast.error(result.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Registration request
  const registerUser = async (credentials) => {
    try {
      const res = await fetch('http://localhost:4000/api/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...credentials }),
      });
      const result = await res.json();
      if (!result.error) {
        toast.success("User registered successfully!");
        navigate("/login", { replace: true });
      } else {
        toast.error(result.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Logout request
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    navigate("/login", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ loginUser, registerUser, user, setUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
