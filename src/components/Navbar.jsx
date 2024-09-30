import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Nav, Button } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import ToastContext from '../context/ToastContext';
import logo from '../assets/logo.png';

const Navbar = ({ title = "LogicLens" }) => {
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
    <nav className="navbar navbar-expand-lg" data-bs-theme="dark" style={{ backgroundColor: '#5B99C2' }}>
      <div className="container-fluid">
        <img src={logo} alt="Logo" style={{ width: '30px', height: '30px', marginRight: '10px' }} />
        <Link to="/home-page" className="navbar-brand">{title}</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarDark" aria-controls="navbarDark" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarDark">
          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                <li className="nav-item">
                  <Nav.Link as={Link} to="/home-page" style={{ marginLeft: '10px',color:'black' }}>
                    Home
                  </Nav.Link>
                </li>
                <li className="nav-item">
                  <Nav.Link as={Link} to="/" style={{ marginLeft: '10px',color:'black' }}>
                    Code Analyzer
                  </Nav.Link>
                </li>
                <li className="nav-item">
                  <Nav.Link as={Link} to="/code-analyzer" style={{ marginLeft: '10px',color:'black' }}>
                    AI Model
                  </Nav.Link>
                </li>
                <li className="nav-item">
                  <Nav.Link as={Link} to="/project-management" style={{ marginLeft: '10px',color:'black' }}>
                    Project Management
                  </Nav.Link>
                </li>
                <li className="nav-item">
                  <Nav.Link as={Link} to="/resources" style={{ marginLeft: '10px',color:'black' }}>
                    Resources
                  </Nav.Link>
                </li>
                <li className="nav-item">
                  <Nav.Link as={Link} to="/about-us" style={{ marginLeft: '10px',color:'black' }}>
                    About Us
                  </Nav.Link>
                </li>
                <li className="nav-item">
                  <Button
                    variant="primary"
                    onClick={handleLogout}
                    style={{ marginLeft: '10px', borderRadius: '15px' }}
                  >
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
