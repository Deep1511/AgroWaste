import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import DeepContext from '../../context/DeepContext';
import { Sprout, LogIn, UserPlus, LogOut, User, Menu, X, Tractor, Building, ShieldCheck } from 'lucide-react';
import './Navbar.css';

function Navbar() {
  const { loggedinC, LoginC, loggedinF, LoginF, loggedinA, LoginA, user, setUser, showAlert } = useContext(DeepContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    try {
      const stored = localStorage.getItem("userLogin");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, [setUser]);

  const Logout = () => {
    localStorage.removeItem("userLogin");
    localStorage.removeItem("user");
    localStorage.setItem("loginA", 'false');
    localStorage.setItem("loginF", 'false');
    localStorage.setItem("loginC", 'false');
    setUser(null);
    LoginC(null, 'false');
    LoginA('false');
    LoginF('false');
    if (showAlert) showAlert("You have been signed out successfully", "info");
    navigate('/');
  };

  const getUserRole = () => {
    if (loggedinF === 'true') return { label: 'Farmer', icon: <Tractor size={14} /> };
    if (loggedinC === 'true') return { label: 'Buyer', icon: <Building size={14} /> };
    if (loggedinA === 'true') return { label: 'Admin', icon: <ShieldCheck size={14} /> };
    return null;
  };

  const getDashboardPath = () => {
    if (loggedinF === 'true') return '/FarmerHome';
    if (loggedinC === 'true') return '/CompanyHome';
    if (loggedinA === 'true') return '/AdminHome';
    return '/';
  };

  const role = getUserRole();

  return (
    <div className="navbar-wrapper">
      <nav className="modern-navbar">
        {/* Brand */}
        <Link to="/" className="brand-link" onClick={() => setMobileMenuOpen(false)}>
          <div className="brand-icon-wrapper">
            <Sprout size={22} strokeWidth={2.5} />
          </div>
          <div className="brand-text">
            <span className="brand-name">Agro<span>Waste</span></span>
            <span className="brand-badge">Residue Exchange</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <ul className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <li>
            <Link
              to={getDashboardPath()}
              className={`nav-item-link ${location.pathname === getDashboardPath() ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {role ? `${role.label} Dashboard` : 'Home'}
            </Link>
          </li>
          {loggedinF === 'true' && (
            <li>
              <Link
                to="/Service"
                className={`nav-item-link ${location.pathname === '/Service' ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Request Collection
              </Link>
            </li>
          )}
          {(loggedinC === 'true' || loggedinA === 'true') && (
            <li>
              <Link
                to="/Auction"
                className={`nav-item-link ${location.pathname === '/Auction' ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Live Auctions
              </Link>
            </li>
          )}
          <li>
            <a
              href="/#about"
              className="nav-item-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="/#Research"
              className="nav-item-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Impact Survey
            </a>
          </li>
          <li>
            <a
              href="/#contact"
              className="nav-item-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </a>
          </li>
        </ul>

        {/* Right Auth Actions */}
        <div className="nav-actions">
          {user ? (
            <>
              <div className="user-badge-container" onClick={() => navigate('/Profile')} style={{ cursor: 'pointer' }}>
                <div className="user-avatar">
                  {user.name ? user.name.charAt(0).toUpperCase() : <User size={16} />}
                </div>
                <div className="user-details">
                  <span className="user-display-name">{user.name}</span>
                  {role && <span className="user-role-tag">{role.label}</span>}
                </div>
              </div>
              <button
                className="nav-btn nav-btn-logout"
                onClick={Logout}
                title="Sign out of account"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <button
                className="nav-btn nav-btn-login"
                onClick={() => navigate('/OptionLogin')}
              >
                <LogIn size={16} />
                <span>Login</span>
              </button>
              <button
                className="nav-btn nav-btn-register"
                onClick={() => navigate('/OptionSignup')}
              >
                <UserPlus size={16} />
                <span>Register</span>
              </button>
            </>
          )}

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
