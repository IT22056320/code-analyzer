import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Nav, Button, Dropdown } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import ToastContext from '../context/ToastContext';
import { ThemeContext } from '../context/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa'; // Import icons for light and dark modes
import logo from '../assets/logo.png';

const Navbar = ({ title = "LogicLens" }) => {
  const { user, setUser } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);
  const { isDarkMode, toggleDarkMode, backgroundColor } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
    toast.success("Logged Out");
    navigate("/login", { replace: true });
  };

  // Determine border color for dark mode and light mode
  const moreDropdownBorderColor = isDarkMode ? '#343a40' : '#5B99C2';

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor, color: 'white', padding: '10px 20px' }} // Add padding for better layout
    >
      <div className="container-fluid">
        <div className="navbar-brand d-flex align-items-center">
          <img src={logo} alt="Logo" style={{ width: '30px', height: '30px', marginRight: '10px' }} />
          <Link to="/home-page" className="navbar-brand" style={{ color: 'white', fontWeight: 'bold', fontSize: '20px' }}>
            {title}
          </Link>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarDark"
          aria-controls="navbarDark"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarDark">
          <ul className="navbar-nav ms-auto d-flex align-items-center">
            {user ? (
              <>
                <li className="nav-item">
                  <Nav.Link as={Link} to="/home-page" style={{ margin: '0 10px', color: 'white' }}>
                    Home
                  </Nav.Link>
                </li>
                <li className="nav-item">
                  <Nav.Link as={Link} to="/" style={{ margin: '0 10px', color: 'white' }}>
                    Analyzer
                  </Nav.Link>
                </li>
                <li className="nav-item">
                  <Nav.Link as={Link} to="/code-analyzer" style={{ color: 'white' }}>
                    AI Model
                  </Nav.Link>
                </li>
                <li className="nav-item">
                  <Nav.Link as={Link} to="/project-management" style={{ margin: '0 10px', color: 'white' }}>
                    Projects
                  </Nav.Link>
                </li>

                {/* Dropdown for History and Resources */}
                <li className="nav-item">
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="outline-secondary"
                      id="dropdown-basic"
                      style={{
                        marginLeft: '10px',
                        color: 'white',
                        borderColor: moreDropdownBorderColor, // Change border color based on theme
                        padding: '5px 10px',
                      }}
                    >
                      More
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item as={Link} to="/history-page">
                        History
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/resources">
                        Resources
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>

                <li className="nav-item">
                  <Nav.Link as={Link} to="/about-us" style={{ color: 'white' }}>
                    About Us
                  </Nav.Link>
                </li>

                {/* Dark Mode Toggle with Icon */}
                <li className="nav-item">
                  <Button
                    variant="outline-secondary"
                    onClick={toggleDarkMode}
                    style={{
                      marginLeft: '10px',
                      color: 'white',
                      borderColor: 'white',
                      padding: '5px 10px',
                    }}
                  >
                    {isDarkMode ? <FaSun /> : <FaMoon />}
                  </Button>
                </li>

                {/* Logout Button */}
                <li className="nav-item">
                  <Button
                    variant="danger"
                    onClick={handleLogout}
                    style={{
                      marginLeft: '10px',
                      padding: '5px 15px',
                    }}
                  >
                    Logout
                  </Button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Nav.Link as={Link} to="/login" style={{ margin: '0 10px', color: 'white' }}>Login</Nav.Link>
                </li>
                <li className="nav-item">
                  <Nav.Link as={Link} to="/register" style={{ margin: '0 10px', color: 'white' }}>Register</Nav.Link>
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
