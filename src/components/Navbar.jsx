import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Nav, Button } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import ToastContext from '../context/ToastContext';

const Navbar = ({ title = "Code Analyzer" }) => {
  const { user, setUser } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
    toast.success("Logged Out");
    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">{title}</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarDark" aria-controls="navbarDark" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarDark">
          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                <li className="nav-item">
                  <Nav.Link as={Link} to="/code-analyzer" style={{ marginLeft: '10px' }}>AI Model</Nav.Link>
                </li>
                <li className="nav-item">
                  <Button variant="primary" onClick={handleLogout} style={{ marginLeft: '10px' }}>
                    Logout
                  </Button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                </li>
                <li className="nav-item">
                  <Nav.Link as={Link} to="/register">Register</Nav.Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
