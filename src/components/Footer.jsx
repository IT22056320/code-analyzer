import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext"; // Import the ThemeContext

const Footer = () => {
  const { isDarkMode, backgroundColor } = useContext(ThemeContext); // Access backgroundColor and isDarkMode

  return (
    <footer
      className={`text-center py-4 mt-5`}
      style={{ backgroundColor, color: 'white' }} // Ensure white text color
    >
      <div className="container">
        <div className="row">
          <div className="col-md-3 text-left">
            <p>
              At Code Analyzer Pro, we value your feedback and strive to provide the best tools for analyzing your code.
              Let us know how our platform is working for you, and feel free to suggest new features or report any issues.
            </p>
          </div>
          <div className="col-md-3">
            <p>Code Analyzer Pro</p>
            <ul className="list-unstyled">
              <li><Link to="/" style={{ color: 'white' }}>Home</Link></li>
              <li><Link to="/features" style={{ color: 'white' }}>Features</Link></li>
              <li><Link to="/pricing" style={{ color: 'white' }}>Pricing</Link></li>
              <li><Link to="/about" style={{ color: 'white' }}>About Us</Link></li>
              <li><Link to="/contact" style={{ color: 'white' }}>Contact</Link></li>
              <li><Link to="/blog" style={{ color: 'white' }}>Blog</Link></li>
            </ul>
          </div>
          <div className="col-md-3">
            <p>Services</p>
            <ul className="list-unstyled">
              <li><Link to="/code-analysis" style={{ color: 'white' }}>Code Analysis</Link></li>
              <li><Link to="/security-check" style={{ color: 'white' }}>Security Check</Link></li>
              <li><Link to="/performance-review" style={{ color: 'white' }}>Performance Review</Link></li>
              <li><Link to="/custom-reports" style={{ color: 'white' }}>Custom Reports</Link></li>
            </ul>
          </div>
          <div className="col-md-3">
            <p>Contact Us</p>
            <p>+1 (800) 123-4567</p>
            <p>support@codeanalyzerpro.com</p>
            <p>Code Analyzer Pro, 1234 Tech Avenue, Suite 100, San Francisco, CA 94107</p>
          </div>
        </div>
        <p>&copy; {new Date().getFullYear()} Code Analyzer Pro. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
