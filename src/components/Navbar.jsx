import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import ToastContext from '../context/ToastContext';
import logo from '../assets/logo.png'

const Navbar = ({ title = "Code Analyzer" }) => {
  const {user,setUser} = useContext(AuthContext);
  const {toast} = useContext(ToastContext);
  const navigate = useNavigate();
  return (
    <>
     
      <nav className="navbar navbar-expand-lg" data-bs-theme="dark" style={{backgroundColor: '#5B99C2'}}>
        <div className="container-fluid">
          <img src={logo} alt="Logo" style={{ width: '30px', height: '30px', marginRight: '10px' }} />
          <Link to="/" className="navbar-brand">{title}</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarDark" aria-controls="navbarDark" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarDark">
            <ul className="navbar-nav ms-auto">
          {user ? <> <li>
              <Button variant="primary" onClick={()=>{
                setUser(null);
                localStorage.clear();
                toast.success("Logged Out");
                navigate("/login",{replace:true});

              }} type="submit"
              style={{ borderRadius: '15px' }}>
                   Logout
               </Button>
               </li>
               </>:
               <>
               <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
               </>
               }
              
            </ul>
          </div>
        </div>
      </nav>

    </>
  );
};

export default Navbar;