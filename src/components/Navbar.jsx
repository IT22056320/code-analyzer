import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Nav, Button, Dropdown } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import ToastContext from '../context/ToastContext';
import { ThemeContext } from '../context/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';
import logo from '../assets/logo.png';

const Navbar = ({ title = "LogicLens" }) => {
  const { user, setUser } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);
  const { isDarkMode, toggleDarkMode, backgroundColor } = useContext(ThemeContext); // Access backgroundColor
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
    toast.success("Logged Out");
    navigate("/login", { replace: true });
  };

  return (
    <nav
      className={`navbar navbar-expand-lg`}
      style={{ backgroundColor, color: 'white' }} // Ensure white text color
    >
      <div className="container-fluid">
        <img src={logo} alt="Logo" style={{ width: '30px', height: '30px', marginRight: '10px' }} />
        <Link to="/home-page" className="navbar-brand" style={{ color: 'white' }}>{title}</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarDark" aria-controls="navbarDark" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarDark">
          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                <li className="nav-item">
                  <Nav.Link as={Link} to="/home-page" style={{ marginLeft: '10px', color: 'white' }}>
                    Home
                  </Nav.Link>
                </li>
                <li className="nav-item">
                  <Nav.Link as={Link} to="/" style={{ marginLeft: '10px', color: 'white' }}>
                    Code Analyzer
                  </Nav.Link>
                </li>
                <li className="nav-item">
                  <Nav.Link as={Link} to="/code-analyzer" style={{ marginLeft: '10px', color: 'white' }}>
                    AI Model
                  </Nav.Link>
                </li>
                <li className="nav-item">
                  <Nav.Link as={Link} to="/project-management" style={{ marginLeft: '10px', color: 'white' }}>
                    Project Management
                  </Nav.Link>
                </li>
                <li className="nav-item">
                  <Nav.Link as={Link} to="/resources" style={{ marginLeft: '10px', color: 'white' }}>
                    Resources
                  </Nav.Link>
                </li>
                <li className="nav-item">
                  <Nav.Link as={Link} to="/about-us" style={{ marginLeft: '10px', color: 'white' }}>
                    About Us
                  </Nav.Link>
                </li>
                <li className="nav-item">
                  <Dropdown>
                    <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic" style={{ marginLeft: '10px', color: 'white' }}>
                      {isDarkMode ? <FaSun /> : <FaMoon />}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={toggleDarkMode}>
                        {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
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
                  <Nav.Link as={Link} to="/login" style={{ color: 'white' }}>Login</Nav.Link>
                </li>
                <li className="nav-item">
                  <Nav.Link as={Link} to="/register" style={{ color: 'white' }}>Register</Nav.Link>
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
